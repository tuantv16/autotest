/**
 * Base Page Object
 * Common methods for all page objects
 */

import { Page, Locator } from '@playwright/test';

const DEFAULT_MENU_BUTTON_SELECTOR = 'button[aria-haspopup="true"][id="basic-button"], button[aria-haspopup="true"]';

export class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = process.env.BASE_URL || 'http://localhost:5173') {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = ''): Promise<void> {
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path}`;
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Click element with retry
   */
  async clickWithRetry(locator: Locator, retries: number = 3): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await locator.scrollIntoViewIfNeeded();
        await locator.click({ timeout: 5000 });
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.page.waitForTimeout(500);
      }
    }
  }

  /**
   * Fill input with typing simulation
   */
  async fillInput(locator: Locator, value: string, delay: number = 50): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
    await locator.clear();
    await locator.pressSequentially(value, { delay });
    await this.page.waitForTimeout(200);
  }

  /**
   * Check if error dialog is visible
   */
  async isErrorDialogVisible(dialogId: string = 'error-dialog'): Promise<boolean> {
    const dialog = this.page.locator(`#${dialogId}`);
    return await dialog.isVisible({ timeout: 2000 }).catch(() => false);
  }

  /**
   * Dismiss error dialog
   */
  async dismissErrorDialog(dialogId: string = 'error-dialog'): Promise<void> {
    const dialog = this.page.locator(`#${dialogId}`);
    if (await dialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Try clicking OK button
      const okButton = dialog.locator('button').first();
      if (await okButton.isVisible({ timeout: 1000 }).catch(() => false)) {
        await okButton.click().catch(() => {});
        await this.page.waitForTimeout(500);
      }
      
      // Force hide dialog to prevent pointer interception
      await this.page.evaluate((id) => {
        const el = document.querySelector(`#${id}`);
        if (el) {
          (el as HTMLElement).style.display = 'none';
          (el as HTMLElement).style.visibility = 'hidden';
          (el as HTMLElement).style.pointerEvents = 'none';
        }
      }, dialogId).catch(() => {});
      
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Take screenshot
   */
  async screenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ path: fileName, fullPage: true });
  }

  /**
   * Get page content
   */
  async getContent(): Promise<string> {
    return await this.page.content();
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(urlPattern: RegExp, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Open action menu (Material-UI)
   */
  async openActionMenu(actionMenuSelector: string): Promise<void> {
    const menuButton = this.page.locator(actionMenuSelector).first();
    await this.waitForVisible(menuButton);
    await this.clickWithRetry(menuButton);
    await this.page.waitForTimeout(500);
  }

  /**
   * Click menu item by text (for Material-UI List)
   */
  async clickMenuItemByText(menuItemText: string): Promise<void> {
    const menuItem = this.page.locator(`ul.MuiList-root:has-text("${menuItemText}")`).first();
    await this.waitForVisible(menuItem);
    await this.clickWithRetry(menuItem);
    await this.page.waitForTimeout(500);
  }

  /**
   * Click confirm button (確定) - opens action menu and clicks confirm
   */
  async clickConfirm(
    actionMenuSelector: string = 'button.MuiButtonBase-root[aria-haspopup="true"]',
    confirmText: string = '確定'
  ): Promise<void> {
    // await this.openActionMenu(actionMenuSelector);
    await this.clickMenuItemByText(confirmText);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Click clear button (クリア) - opens action menu and clicks clear
   */
  async clickClear(
    actionMenuSelector: string = 'button.MuiButtonBase-root[aria-haspopup="true"]',
    clearText: string = 'クリア'
  ): Promise<void> {
    // await this.openActionMenu(actionMenuSelector);
    await this.clickMenuItemByText(clearText);
    await this.page.waitForTimeout(500);
  }

  /**
   * Wait for text to appear in body
   * @param text - Text to search for in body
   * @param timeout - Timeout in milliseconds (default: 5000)
   * @returns true if text is found, false otherwise
   */
  async waitForTextInBody(text: string, timeout: number = 5000): Promise<boolean> {
    try {
      await this.page.waitForFunction(
        (searchText) => {
          return document.body.innerText.includes(searchText);
        },
        text,
        { timeout }
      );
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click icon menu - opens menu
   * @param menuButtonSelector - Selector for the menu button (default: DEFAULT_MENU_BUTTON_SELECTOR)
   */
  async clickIconMenu(menuButtonSelector: string = DEFAULT_MENU_BUTTON_SELECTOR): Promise<void> {
    const menuButton = this.page.locator(menuButtonSelector);
    await menuButton.click({ timeout: 10000 });
  }

  /**
   * Click icon menu - opens menu and clicks menu item by text
   * @param menuItemText - Text of the menu item to click
   * @param menuButtonSelector - Selector for the menu button (default: DEFAULT_MENU_BUTTON_SELECTOR)
   */
  async clickItemMenu(menuItemText: string, menuButtonSelector: string = DEFAULT_MENU_BUTTON_SELECTOR): Promise<void> {
    const menuButton = this.page.locator(menuButtonSelector);
    await menuButton.click({ timeout: 10000 });
    await this.page.waitForTimeout(500);
    const menuItem = this.page.locator('ul.MuiList-root li').filter({ hasText: menuItemText });
    await menuItem.click({ timeout: 10000 });
  }

  /**
   * Check if menu item is visible
   * @param menuItemText - Text of the menu item to check
   * @returns true if menu item is visible, false otherwise
   */
  async isMenuIconVisible(menuItemText: string): Promise<boolean> {
    const menuItem = this.page.locator('ul.MuiList-root li').filter({ hasText: menuItemText });
    return await menuItem.isVisible({ timeout: 10000 }).catch(() => false);
  }
}
