/**
 * WTY30302 Store Inventory Inquiry Page Object
 * Page Object for 店別在庫照会 screen
 */

import { Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class TY30302Page extends BasePage {
  // Selectors
  protected readonly selectors = {
    headingTitle: '.text-heading-h4:has-text("マルチPOP出力指示一覧"), .text-heading-h3:has-text("マルチPOP出力指示一覧")',
    backButton: 'button:has(svg)',
    deleteButton: 'li[role="menuitem"]:has-text("削除")',
    editButton: 'li[role="menuitem"]:has-text("修正")',
    popListTable: 'div[role="presentation"] div[role="grid"]',
    tableHeaders: '.multi-row-header-cell',
    tableDataCells: '.multi-row-cell-item',
    tableRowsData: 'div[col-id="mkKata"]',
    tableRow: (rowIndex: number) => `div[role="presentation"] div[role="row"][row-index="${rowIndex}"]`,
    selectedRow: (rowIndex: number) => `div[role="presentation"] div[role="row"][row-index="${rowIndex}"]:has-class("ag-row-selected")`,
    selectedRows: 'div[role="row"].ag-row-selected',
    muiButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    columnNo: '.multi-row-header-cell:has-text("No")',
    columnKataban: '.multi-row-header-cell:has-text("型番")',
    columnSize: '.multi-row-header-cell:has-text("サイズ")',
    columnMaisu: '.multi-row-header-cell:has-text("枚数")',
    columnMultiComment: '.multi-row-header-cell:has-text("マルチコメント")',
    columnSaleName: '.multi-row-header-cell:has-text("セール名")',
    confirmationDialog: '#wty30302-error-dialog ._modal_1fy9j_13',
    confirmationMessage: '#wty30302-error-dialog ._modal_1fy9j_13 ._contents_1fy9j_38',
    confirmButton: 'button:has-text("OK")',
    cancelButton: 'button:has-text("キャンセル")',
  }

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to WTY30302 Store Inventory Inquiry screen
   */
  async navigate(pilotKey: string = 'prod'): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY30302MultiPopOutputInstructionList?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Check if heading title "マルチPOP印刷指示一覧" is visible
   */
  async isHeadingTitleVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.headingTitle);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  async clickMuiButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.muiButton);
    await locator.click({ timeout: 10000 });
  }

  /**
   * Check if Delete button (削除) is visible
   */
  async isDeleteButtonVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.deleteButton);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if Edit button (修正) is visible
   */
  async isEditButtonVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.editButton);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if POP list table is visible
   */
  async isPopListTableVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.popListTable);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }


  /**
   * Click Delete button (削除)
   */
  async clickDeleteButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.deleteButton);
    await locator.click();
  }

  /**
   * Click Edit button (修正)
   */
  async clickEditButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.editButton);
    await locator.click();
  }

  /**
   * Check if column "No" exists in table
   */
  async isColumnNoVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.columnNo);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if column "型番" exists in table
   */
  async isColumnKatabanVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.columnKataban);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if column "サイズ" exists in table
   */
  async isColumnSizeVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.columnSize);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if column "枚数" exists in table
   */
  async isColumnMaisuVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.columnMaisu);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if column "マルチコメント" exists in table
   */
  async isColumnMultiCommentVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.columnMultiComment);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if column "セール名" exists in table
   */
  async isColumnSaleNameVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.columnSaleName);
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if Back button (戻る) is visible
   */
  async isBackButtonVisible(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.backButton).first();
    return await locator.isVisible({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if Back button (戻る) is enabled
   */
  async isBackButtonEnabled(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.backButton).first();
    return await locator.isEnabled({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if Delete button (削除) is enabled
   */
  async isDeleteButtonEnabled(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.deleteButton);
    return await locator.isEnabled({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Check if Edit button (修正) is enabled
   */
  async isEditButtonEnabled(): Promise<boolean> {
    const locator = this.page.locator(this.selectors.editButton);
    return await locator.isEnabled({ timeout: 10000 }).catch(() => false);
  }

  /**
   * Click Back button (戻る)
   */
  async clickBackButton(): Promise<void> {
    const locator = this.page.locator(this.selectors.backButton).first();
    await locator.click();
  }

  /**
   * Scroll table to load all rows or to a specific scroll position
   * @param scrollTo - Scroll distance in pixels. If not provided, scroll through entire table
   */
  async scrollTableToLoadAllRows(scrollTo?: number): Promise<void> {
    const tableContainer = this.page.locator(this.selectors.popListTable);

    await tableContainer.evaluate((el) => {
        const scrollable = el.querySelector('.ag-body-viewport') || el;
        scrollable.scrollTop = Math.floor(scrollable.scrollHeight / 2);
    });
    
    // Wait for virtual rows to render
    await this.page.waitForTimeout(500);
  }

  /**
   * Get column index by its name
   * @param columnName 
   * @returns 
   */
  async getColumnIndexByName(columnName: string): Promise<number> {
    const headers = this.page.locator(this.selectors.tableHeaders);
    const count = await headers.count();

    let i = 1 // Skip column 'No.'
    for (i; i < count; i++) {
      const headerText = await headers.nth(i).innerText();
      if (headerText.trim() === columnName) {
        return i - 1; // Adjust for zero-based index and skipping 'No.' column
      }
    }
    throw new Error(`Column with name "${columnName}" not found`);
  }

  /**
   * Check if table contains a specific value
   * When found, scrolls to that row
   */
  async isTableCellHaveValue(value: string, columnName: string): Promise<boolean> {
    // First, load all rows by scrolling through the table
    await this.scrollTableToLoadAllRows();
    
    const rows = this.page.locator(this.selectors.tableRowsData);
    const columnIndex = await this.getColumnIndexByName(columnName);

    let i = 1 // Skip header row
    for (i; i < await rows.count(); i++) {
      const rowText = await rows.nth(i).locator('.multi-row-cell-item').nth(columnIndex).innerText();
      if (rowText.trim() === value) {
        // Get the row element and scroll it into view
        const rowElement = rows.nth(i);
        
        // Use scrollIntoViewIfNeeded to scroll the row into view
        await rowElement.scrollIntoViewIfNeeded();
        return true;
      }
    }
    return false;
  }

  /**
   * Click on first row in the table
   */
  async clickFirstRow(): Promise<void> {
    await this.clickRowByIndex(0);
    await this.page.waitForTimeout(500);
  }

  /**
   * Click on a specific row by index (1-based)
   */
  async clickRowByIndex(rowIndex: number): Promise<void> {
    const row = this.page.locator(this.selectors.tableRow(rowIndex)).nth(1); // get row at body data
    await row.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if a row is selected/highlighted
   */
  async isRowSelected(rowIndex: number = 0): Promise<boolean> {
    const selectedRow = this.page.locator(this.selectors.tableRow(rowIndex)).nth(1); // get row at body data

    return await selectedRow.evaluate(el =>
      el.classList.contains('ag-row-selected') || el.getAttribute('aria-selected') === 'true'
    );
  }

  /**
   * Get count of selected rows
   */
  async getSelectedRowCount(): Promise<number> {
    const selectedRows = this.page.locator(this.selectors.selectedRows);
    return await selectedRows.count()/2;
  }
  // /**
  //  * Check if confirmation dialog is visible
  //  */
  // async isConfirmationDialogVisible(): Promise<boolean> {
  //   const dialog = this.page.locator(this.selectors.confirmationDialog);
  //   return await dialog.isVisible({ timeout: 5000 }).catch(() => false);
  // }

  /**
   * Get confirmation message text
   */
  async getConfirmationMessage(): Promise<string> {
    const message = this.page.locator(this.selectors.confirmationMessage);
    const text = await message.textContent();
    return text?.trim() || '';
  }


  /**
   * Click cancel button (いいえ) in dialog
   */
  async clickCancelButton(): Promise<void> {
    const button = this.page.locator(this.selectors.cancelButton);
    await button.click();
  }

  /**
   * Get total row count in table
   */
  async getRowCount(): Promise<number> {
    const rows = this.page.locator(this.selectors.tableRowsData);
    return await rows.count() - 1; // Exclude header row
  }

  /**
   * Wait for confirmation dialog to close
   */
  async waitForDialogToClose(): Promise<void> {
    const dialog = this.page.locator(this.selectors.confirmationDialog);
    await dialog.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(1000); // Wait for UI to update
  }

  /**
   * Get table header position
   * @returns Position of table header (top, left, bottom, right)
   */
  async getTableHeaderPosition(): Promise<{ top: number, left: number, bottom: number, right: number }> {
    const header = this.page.locator(this.selectors.tableHeaders).first();
    const boundingBox = await header.boundingBox();
    if (!boundingBox) {
      throw new Error('Table header not found');
    }
    return {
      top: boundingBox.y,
      left: boundingBox.x,
      bottom: boundingBox.y + boundingBox.height,
      right: boundingBox.x + boundingBox.width
    };
  }

  /**
   * Scroll table down
   * @param distance - Distance to scroll (default: 500px)
   */
  async scrollTableDownEndOfData(): Promise<void> {
    const tableContainer = this.page.locator(this.selectors.popListTable);
    await tableContainer.evaluate((el) => {
      const scrollable = el.querySelector('.ag-body-viewport') || el;
      scrollable.scrollTop = scrollable.scrollHeight;
    });
    await this.page.waitForTimeout(500);
  }

}


