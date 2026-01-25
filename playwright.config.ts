import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables so config can decide which device/project to run.
// .env.test is expected at repo root (same folder as playwright.config.ts)
dotenv.config({ path: path.join(__dirname, '.env.test') });

type SnapDevice = 'pc' | 'tablet' | 'mobile' | 'all';

function normalizeSnapDevice(raw: unknown): SnapDevice {
  const v = String(raw ?? '').trim().toLowerCase();
  if (!v) return 'pc';
  if (v === 'all') return 'all';
  if (v === 'pc' || v === 'desktop') return 'pc';
  if (v === 'tablet' || v === 'tab') return 'tablet';
  if (v === 'mobile' || v === 'phone') return 'mobile';
  throw new Error(`[playwright.config] Invalid SNAP_DEVICE='${v}'. Allowed: pc|tablet|mobile|all`);
}

function normalizeHeadless(raw: unknown): boolean {
  const v = String(raw ?? '').trim().toLowerCase();
  if (!v) return true; // Mặc định là headless (không mở trình duyệt)
  if (v === 'true') return true;
  if (v === 'false') return false;
  throw new Error(`[playwright.config] Invalid HEADLESS='${v}'. Allowed: true|false`);
}

const SNAP_DEVICE = normalizeSnapDevice(process.env.SNAP_DEVICE);

const ALL_PROJECTS = [
  {
    name: 'pc',
    use: {
      // PC (maximize) must NOT set deviceScaleFactor when viewport is null.
      viewport: null,
      launchOptions: {
        args: ['--start-maximized'],
      },
    },
  },
  {
    name: 'tablet',
    use: {
      ...devices['iPad (gen 7) landscape'],
      // Keep device viewport; do NOT maximize.
    },
  },
  {
    name: 'mobile',
    use: {
      ...devices['iPhone 12'],
      // Keep device viewport; do NOT maximize.
    },
  },
];

const projects =
  SNAP_DEVICE === 'all'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.name === SNAP_DEVICE);

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: normalizeHeadless(process.env.HEADLESS),
    actionTimeout: 10000,
    trace: 'on-first-retry',
    screenshot: 'off',
  },
  projects,
});
