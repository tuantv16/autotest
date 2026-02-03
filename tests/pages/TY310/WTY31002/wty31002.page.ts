/**
 * WTY31001 Stock Supply Request Product Input Page Object
 * Page Object for 供給移動依頼商品入力 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";

export class WTY31002Page extends BasePage {
  private readonly selectors = {
    pageTitle: "text=供給移動依頼登録",
    templateSelectorTitle: 'label[for="tk_comment"]:has-text("定型ｺﾒﾝﾄ")',
    templateSelectBox: "#tk_comment",
    commentTextArea: "#comment_TextArea",

    // Items table
    noColumnHeader: 'div.multi-row-header-cell:has-text("No.")',
    mkNmColumnHeader: 'div.multi-row-header-cell:has-text("メーカ名")',
    kataCodeColumnHeader: 'div.multi-row-header-cell:has-text("型番")',
    janColumnHeader: 'div.multi-row-header-cell:has-text("JAN")',
    shnNmColumnHeader: 'div.multi-row-header-cell:has-text("商品名")',
    ryoIraiColumnHeader: 'div.multi-row-header-cell:has-text("良品")',
    tenjiIraiColumnHeader: 'div.multi-row-header-cell:has-text("展示")',
    kaikonIraiColumnHeader: 'div.multi-row-header-cell:has-text("開梱")',
    tSuIraiColumnHeader: 'div.multi-row-header-cell:has-text("定数")',
    kisoIraiColumnHeader: 'div.multi-row-header-cell:has-text("基礎")',

    rowTable: '.ag-pinned-left-cols-container div[role="row"]',
    rowNoTable: ".ag-pinned-left-cols-container .multi-row-cell-item",

    // Buttona popup
    buttonCancelPro: 'button:has-text("商品取消")',
    buttonEditPro: 'button:has-text("商品修正")',

    // Menu
    actionMenuButton: 'button.MuiButtonBase-root[aria-haspopup="true"]',
    btnEdit: 'ul[role="menu"] li[role="menuitem"] span:has-text("商品修正")',
    btnProductInput:
      'ul[role="menu"] li[role="menuitem"] span:has-text("商品入力")',
    btnModelNumSearch:
      'ul[role="menu"] li[role="menuitem"] span:has-text("型番検索")',
    btnProductCancel:
      'ul[role="menu"] li[role="menuitem"] span:has-text("商品取消")',
    btnRequestCancel:
      'ul[role="menu"] li[role="menuitem"] span:has-text("依頼取消")',
    confirmButton: 'button:has-text("確定")',

    // Input Fields
    iriNoInput: 'input[id="iriNo_Label"]',
    iriDateInput: 'input[id="iriDate_Label"]',

    // Buttons Dialog
    confirmDialogButton: "button#ok_button",
    cancelDialogButton: "button#cancel_button",
  };

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY31002StockSupplyRequestsRegist?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async openMenu(): Promise<void> {
    const menuButton = this.page
      .locator(this.selectors.actionMenuButton)
      .first();
    const isMenuOpen = await this.page
      .locator(this.selectors.btnEdit)
      .isVisible()
      .catch(() => false);

    if (!isMenuOpen) {
      await menuButton.click();
      await this.page.waitForTimeout(500);
    }
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async btnMenuIsVisible(): Promise<boolean> {
    const btns = [
      this.selectors.btnEdit,
      this.selectors.btnProductInput,
      this.selectors.btnProductCancel,
      this.selectors.btnRequestCancel,
    ];
    for (const btnSelector of btns) {
      const isVisible = await this.page.locator(btnSelector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async isConfirmButtonVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.confirmButton).isVisible();
  }

  async isIriNoInputVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriNoInput).isVisible();
  }

  async isIriDateInputVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriDateInput).isVisible();
  }

  async isIriNoInputReadonly(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriNoInput).isDisabled();
  }

  async isIriDateInputReadonly(): Promise<boolean> {
    return await this.page.locator(this.selectors.iriDateInput).isDisabled();
  }

  async areGridColumnsVisible(): Promise<boolean> {
    const columnSelectors = [
      this.selectors.noColumnHeader,
      this.selectors.mkNmColumnHeader,
      this.selectors.kataCodeColumnHeader,
      this.selectors.janColumnHeader,
      this.selectors.shnNmColumnHeader,
      this.selectors.ryoIraiColumnHeader,
      this.selectors.tenjiIraiColumnHeader,
      this.selectors.tSuIraiColumnHeader,
      this.selectors.kisoIraiColumnHeader,
    ];

    for (const selector of columnSelectors) {
      const isVisible = await this.page.locator(selector).isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async selectTemplateCommentVisible(): Promise<void> {
    await expect(
      this.page.locator(this.selectors.templateSelectBox),
    ).toBeVisible();
  }

  async selectTemplateCommentDisable(): Promise<void> {
    await expect(
      this.page.locator(this.selectors.templateSelectBox),
    ).toBeDisabled();
  }

  async selectTemplateCommentClick(): Promise<void> {
    const selectBox = this.page.locator(this.selectors.templateSelectBox);

    await expect(selectBox).toBeEnabled();
    await selectBox.click();
    const option = this.page.locator(
      'ul[role="listbox"] li[role="option"][data-value="05"]',
    );
    await option.click();
  }

  async commentTextAreaVisible(): Promise<boolean> {
    const textArea = this.page.locator(this.selectors.commentTextArea);
    return await textArea.isVisible();
  }

  async commentTextAreaDisabled(): Promise<boolean> {
    const textArea = this.page.locator(this.selectors.commentTextArea);
    return await textArea.isDisabled();
  }

  async fillValueInCommentTextArea(value: string): Promise<void> {
    const textArea = this.page.locator(this.selectors.commentTextArea);
    await textArea.fill(value);
  }

  async getValueCommentTextArea(): Promise<string> {
    const textArea = this.page.locator(this.selectors.commentTextArea);
    return await textArea.inputValue();
  }

  async clickBtnEdit(): Promise<void> {
    const btnEdit = this.page.locator(this.selectors.btnEdit);
    await btnEdit.click();
  }

  async clickBtnProductCancel(): Promise<void> {
    const btnEdit = this.page.locator(this.selectors.btnProductCancel);
    await btnEdit.click();
  }

  async getErrorMessageDialog(): Promise<string> {
    const dialog = this.page.locator("#wty31002-error-dialog");
    if ((await dialog.count()) === 0) {
      return "";
    }
    const message = dialog.locator("p").first();
    return await message.innerText();
  }

  async getFieldErrorMessage(fieldLabel: string): Promise<string> {
    const labelLocator = this.page.locator(`label:has-text("${fieldLabel}")`);
    const parentContainer = labelLocator.locator("..");
    const errorMessage = parentContainer.locator("p.text-red-600");
    const text = await errorMessage.textContent().catch(() => null);
    return text || "";
  }

  async clickConfirmDialogButton(): Promise<void> {
    await this.page.locator(this.selectors.confirmDialogButton).first().click();
  }

  async clickCancelDialogButton(): Promise<void> {
    await this.page.locator(this.selectors.cancelDialogButton).first().click();
  }

  async clickFirstRow(): Promise<void> {
    const firstRow = this.page.locator(this.selectors.rowTable).first();

    await expect(firstRow).toBeVisible();
    await firstRow.click();
  }

  async getIriNoInputValue(): Promise<string> {
    return await this.page.locator(this.selectors.iriNoInput).inputValue();
  }

  async clickConfirmButton(): Promise<void> {
    const confirmButton = this.page.locator(this.selectors.confirmButton);
    await confirmButton.click();
  }

  async getRowNoValues(): Promise<number[]> {
    const cells = this.page.locator(this.selectors.rowNoTable);

    const count = await cells.count();
    const values: number[] = [];

    for (let i = 0; i < count; i++) {
      const text = await cells.nth(i).innerText();
      values.push(Number(text.trim()));
    }

    return values;
  }

  async isButtonCancelProVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.buttonCancelPro).isVisible();
  }

  async isButtonEditProVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.buttonEditPro).isVisible();
  }

  async clickButtonCancelPro(): Promise<void> {
    const button = this.page.locator(this.selectors.buttonCancelPro);
    await button.click();
  }

  async clickButtonEditPro(): Promise<void> {
    const button = this.page.locator(this.selectors.buttonEditPro);
    await button.click();
  }

  async clickButtonProductInput(): Promise<void> {
    const button = this.page.locator(this.selectors.btnProductInput);
    await button.click();
  }

  async clickButtonRequestCancel(): Promise<void> {
    const button = this.page.locator(this.selectors.btnRequestCancel);
    await button.click();
  }
}