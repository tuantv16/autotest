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

function normalizeDeviceFlag(flagRaw: unknown): DeviceTier | 'ALL' {
  const v = String(flagRaw ?? '')
    .trim()
    .toLowerCase();

  if (!v || v === 'all') return 'ALL';
  if (v === 'pc' || v === 'desktop') return 'PC';
  if (v === 'tablet' || v === 'tab') return 'Tablet';
  if (v === 'mobile' || v === 'phone') return 'Mobile';

  throw new Error(
    `[snap] Invalid SNAP_DEVICE='${v}'. Allowed: pc|tablet|mobile|all`,
  );
}

function getEnabledSnapshotViewports(): SnapshotViewport[] {
  const flag = normalizeDeviceFlag(process.env.SNAP_DEVICE);
  if (flag === 'ALL') return SNAPSHOT_VIEWPORTS;
  return SNAPSHOT_VIEWPORTS.filter((x) => x.tier === flag);
}

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

  // Option 1 behavior (when SNAP_DEVICE selects a single device):
  // do NOT change viewport/device emulation here; just screenshot what the test currently shows.
  const flag = normalizeDeviceFlag(process.env.SNAP_DEVICE);
  if (flag !== 'ALL') {
    await page.screenshot({ path: filePath, fullPage: false });
    return filePath;
  }

  // Backward compatibility (SNAP_DEVICE=all): emulate each viewport and take fullPage screenshots.
  const context = page.context();

  const originalViewport = page.viewportSize();
  const originalUA = await page.evaluate(() => navigator.userAgent);
  const originalHasTouch = await page.evaluate(() => 'ontouchstart' in window);

  try {
    await page.setViewportSize(vp.viewport);

    const browserName = context.browser()?.browserType().name();
    if (browserName === 'chromium') {
      const cdp = await context.newCDPSession(page);
      await cdp.send('Emulation.setUserAgentOverride', {
        userAgent:
          tier === 'Mobile'
            ? (devices['iPhone 12']?.userAgent ?? originalUA)
            : tier === 'Tablet'
              ? (devices['iPad (gen 7) landscape']?.userAgent ?? originalUA)
              : (devices['Desktop Chrome']?.userAgent ?? originalUA),
      });

      const deviceScaleFactor = vp.deviceScaleFactor ?? 1;
      const mobile = Boolean(vp.isMobile);

      await cdp.send('Emulation.setDeviceMetricsOverride', {
        width: vp.viewport.width,
        height: vp.viewport.height,
        deviceScaleFactor,
        mobile,
      });

      if (tier === 'Mobile' || tier === 'Tablet') {
        await cdp.send('Emulation.setTouchEmulationEnabled', {
          enabled: true,
          maxTouchPoints: 5,
        });
      } else {
        await cdp.send('Emulation.setTouchEmulationEnabled', {
          enabled: originalHasTouch,
          maxTouchPoints: originalHasTouch ? 5 : 0,
        });
      }
    }

    await page.waitForTimeout(250);
    await page.screenshot({ path: filePath, fullPage: true });
  } finally {
    if (originalViewport) {
      await page.setViewportSize(originalViewport);
    }

    const browserName = context.browser()?.browserType().name();
    if (browserName === 'chromium') {
      try {
        const cdp = await context.newCDPSession(page);
        await cdp.send('Emulation.setUserAgentOverride', { userAgent: originalUA });
        await cdp.send('Emulation.clearDeviceMetricsOverride');
        await cdp.send('Emulation.setTouchEmulationEnabled', {
          enabled: originalHasTouch,
          maxTouchPoints: originalHasTouch ? 5 : 0,
        });
      } catch {
        // ignore restore errors
      }
    }
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

  for (const vp of getEnabledSnapshotViewports()) {
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

