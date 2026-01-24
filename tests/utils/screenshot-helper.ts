import * as fs from 'fs';
import * as path from 'path';
import { Page, TestInfo } from '@playwright/test';

type SnapKind = 'input' | 'output';

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

function buildScreenshotDir(testInfo: TestInfo): string {
  const testFilePath =
    (testInfo as any).file ||
    testInfo.location?.file ||
    '';

  const { module, screen } = extractModuleScreenFromSpecPath(String(testFilePath));

  const testcase = sanitizeFolderName(testInfo.title);

  return path.join('screenshots', module, screen, testcase);
}

function buildFileName(kind: SnapKind, index?: string | number): string {
  const base = kind === 'input' ? 'input' : 'output';
  if (index === undefined || index === null || index === '') {
    return `${base}.png`;
  }
  return `${base}_${index}.png`;
}

async function snap(
  page: Page,
  testInfo: TestInfo,
  kind: SnapKind,
  index?: string | number,
): Promise<string> {
  const dir = buildScreenshotDir(testInfo);
  ensureDir(dir);

  const fileName = buildFileName(kind, index);
  const filePath = path.join(dir, fileName);

  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
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

