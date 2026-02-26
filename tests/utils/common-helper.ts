/**
 * Common Helper Functions
 * Reusable utility functions for tests
 */

import * as fs from 'fs';
import * as path from 'path';
import { Page, TestInfo } from '@playwright/test';

/**
 * Create directory if it doesn't exist
 */
export function ensureDirectoryExists(dirPath: string): void {
  // Dynamic require to avoid type errors
  const fs = require('fs');
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Take screenshot on test failure
 * Automatically detects log directory from test file path structure
 * @param page - Playwright page object
 * @param testInfo - Test info object
 */
export async function takeScreenshotOnFailure(page: Page, testInfo: TestInfo): Promise<void> {
  if (testInfo.status !== 'failed' && testInfo.status !== 'timedOut') {
    return;
  }

  // Get test file path from testInfo
  // testInfo.location.file format: tests\TY205\WTY20501\wty20501-insert.spec.ts (Windows) 
  // or tests/TY205/WTY20501/wty20501-insert.spec.ts (Unix)
  const testFilePath = testInfo.location?.file || '';
  
  // Extract folder structure from test file path
  // Example: tests/TY205/WTY20501/wty20501-insert.spec.ts -> logs/TY205/WTY20501/
  let logsDir = 'logs';
  if (testFilePath) {
    // Normalize path separators
    const normalizedPath = testFilePath.replace(/\\/g, '/');
    // Remove 'tests/' prefix and filename
    const relativePath = normalizedPath
      .replace(/^tests\//, '')
      .replace(/[^\/]+\.spec\.tsx?$/, '');
    
    if (relativePath && relativePath.length > 0) {
      // Split by / and filter empty strings
      const folders = relativePath.split('/').filter(f => f.trim().length > 0);
      if (folders.length > 0) {
        logsDir = path.join('logs', ...folders);
      }
    }
  }

  // Generate filename from test case name
  const testName = testInfo.title
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase()
    .substring(0, 100); // Limit length

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  
  // Create directory if it doesn't exist
  ensureDirectoryExists(logsDir);
  
  // Screenshot path
  const screenshotPath = path.join(logsDir, `${testName}-${timestamp}.png`);

  // Take screenshot
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`[TEST] Screenshot saved: ${screenshotPath}`);
}

export class CommonHelper {
  /**
   * Load test data from JSON file
   * Supports subfolder paths (e.g., 'TY205/wty20501' or 'wty20501')
   */
  static loadTestData(fileName: string): any {
    const filePath = path.join(__dirname, '../fixtures', `${fileName}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  /**
   * Load test data from TypeScript module (supports dynamic env variables)
   * Supports subfolder paths (e.g., 'TY205/wty20501' or 'wty20501')
   * Use this for test data that needs environment variables like DEFAULT_PORTRAIT
   * 
   * @example
   * const testData = CommonHelper.loadTestDataTS('TY201/wty20101').wty20101.TC_01;
   */
  static loadTestDataTS(fileName: string): any {
    const tsPath = path.join(__dirname, '../fixtures', `${fileName}.ts`);
    if (!fs.existsSync(tsPath)) {
      throw new Error(`TypeScript test data file not found: ${tsPath}`);
    }
    // Use require to load TypeScript module (already compiled by ts-node)
    const module = require(tsPath);
    return module;
  }
}
