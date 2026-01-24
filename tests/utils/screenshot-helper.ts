import * as fs from 'fs';
import * as path from 'path';
import { Page, TestInfo, devices } from '@playwright/test';

type SnapKind = 'input' | 'output';
type DeviceTier = 'PC' | 'Tablet' | 'Mobile';

type SnapshotViewport = {
  tier: DeviceTier;
  name: string;
  viewport: { width: number; height: number };
  deviceScaleFactor?: number;
  isMobile?: boolean;
  hasTouch?: boolean;
};

const SNAPSHOT_VIEWPORTS: SnapshotViewport[] = [
  {
    tier: 'PC',
    name: 'Desktop',
    viewport: { width: 1366, height: 768 },
  },
  {
    tier: 'Tablet',
    name: 'iPad (landscape)',
    viewport: devices['iPad (gen 7) landscape']?.viewport ?? { width: 1080, height: 810 },
    deviceScaleFactor: devices['iPad (gen 7) landscape']?.deviceScaleFactor,
    isMobile: devices['iPad (gen 7) landscape']?.isMobile,
    hasTouch: devices['iPad (gen 7) landscape']?.hasTouch,
  },
  {
    tier: 'Mobile',
    name: 'iPhone 12',
    viewport: devices['iPhone 12']?.viewport ?? { width: 390, height: 844 },
    deviceScaleFactor: devices['iPhone 12']?.deviceScaleFactor,
    isMobile: devices['iPhone 12']?.isMobile,
    hasTouch: devices['iPhone 12']?.hasTouch,
  },
];

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function sanitizeFolderName(name: string): string {
  return name
    .trim()
    .replace(/[\\/]/g, '_')
    .replace(/[:*?"<>|]/g, '')
    .replace(/\s+/g, '_');
}

function extractModuleScreenFromSpecPath(testFilePath: string): { module: string; screen: string } {
  const normalized = (testFilePath || '').replace(/\\/g, '/');
  const marker = 'tests/modules/';
  const idx = normalized.indexOf(marker);

  if (idx === -1) {
    throw new Error(
      `[snap] Cannot infer <MODULE>/<SCREEN> because spec path does not contain '${marker}'. Got: ${testFilePath}`,
    );
  }

  const rest = normalized.slice(idx + marker.length);
  const parts = rest.split('/').filter(Boolean);

  const module = parts[0];
  const screen = parts[1];

  if (!module || !screen) {
    throw new Error(`[snap] Cannot infer <MODULE>/<SCREEN> from spec path: ${testFilePath}`);
  }

  return { module, screen };
}

function buildScreenshotDir(testInfo: TestInfo, tier: DeviceTier): string {
  const testFilePath = (testInfo as any).file || testInfo.location?.file || '';

  const { module, screen } = extractModuleScreenFromSpecPath(String(testFilePath));

  const testcase = sanitizeFolderName(testInfo.title);

  return path.join('screenshots', module, screen, testcase, tier);
}

function buildFileName(kind: SnapKind, index?: string | number): string {
  const base = kind === 'input' ? 'input' : 'output';
  if (index === undefined || index === null || index === '') {
    return `${base}.png`;
  }
  return `${base}_${index}.png`;
}

async function snapForViewport(
  page: Page,
  testInfo: TestInfo,
  kind: SnapKind,
  tier: DeviceTier,
  vp: SnapshotViewport,
  index?: string | number,
): Promise<string> {
  const dir = buildScreenshotDir(testInfo, tier);
  ensureDir(dir);

  const fileName = buildFileName(kind, index);
  const filePath = path.join(dir, fileName);

  // For PC, use the existing page to save time and context
  if (tier === 'PC') {
    const originalViewport = page.viewportSize();
    try {
      await page.setViewportSize(vp.viewport);
      await page.screenshot({ path: filePath, fullPage: true });
    } finally {
      if (originalViewport) {
        await page.setViewportSize(originalViewport);
      }
    }
    return filePath;
  }

  // For Tablet/Mobile, create a new page with the correct device profile
  const context = page.context();
  const browser = context.browser();
  if (!browser) {
    // Fallback to original behavior if browser is not available
    console.warn('[snap] Browser context not available. Taking screenshot on current page.');
    await page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }

  const baseUrl = page.url();

  const storageState = await context.storageState();

  const newContext = await browser.newContext({
    viewport: vp.viewport,
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    // Important: mobile/tablet should have their own UA to trigger responsive breakpoints
    userAgent:
      tier === 'Mobile'
        ? (devices['iPhone 12']?.userAgent ?? undefined)
        : (devices['iPad (gen 7) landscape']?.userAgent ?? undefined),
    storageState,
  });

  const defaultCipher = process.env.DEFAULT_CIPHER || 'LOCAL_DEV_DUMMY_KEY';
  await newContext.addInitScript((cipher) => {
    localStorage.setItem('cipher', cipher);
  }, defaultCipher);

  const newPage = await newContext.newPage();
  try {
    await newPage.goto(baseUrl, { waitUntil: 'networkidle' });
    await newPage.waitForTimeout(250);
    await newPage.screenshot({ path: filePath, fullPage: true });
  } finally {
    await newPage.close().catch(() => {});
    await newContext.close().catch(() => {});
  }

  return filePath;
}

async function snap(
  page: Page,
  testInfo: TestInfo,
  kind: SnapKind,
  index?: string | number,
): Promise<string> {
  const outputs: string[] = [];

  for (const vp of SNAPSHOT_VIEWPORTS) {
    outputs.push(await snapForViewport(page, testInfo, kind, vp.tier, vp, index));
  }

  return outputs[0];
}

export async function snapInput(
  page: Page,
  testInfo: TestInfo,
  index?: string | number,
): Promise<string> {
  return snap(page, testInfo, 'input', index);
}

export async function snapExpect(
  page: Page,
  testInfo: TestInfo,
  index?: string | number,
): Promise<string> {
  return snap(page, testInfo, 'output', index);
}

