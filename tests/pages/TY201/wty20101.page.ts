/**
 * WTY20501 Summary Input Page Object
 * Page Object for 摘要欄入力 screen
 */

import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";

export interface WTY20501FormData {
  customerNameKanji: string;
  customerNameKana: string;
  deliveryDate: string;
  summaryText: string;
}

export class TY20101Page extends BasePage {
  // Form field names (for POM pattern)
  public readonly fieldNames = {
    customerNameKanji: "kokKnj",
    customerNameKana: "kokKn",
    honorific: "keishoKbn",
    paymentMethod: "shHou",
    deliveryDate: "nnyOtdkYoteiDate",
    summary: "tkyRn",
  };

  // Selectors
  public readonly selectors = {
    idSaiBin: "#SaiBin_Lable",
  };

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to WTY20501 Summary Input screen
   */
  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html??pilotkey=${pilotKey}#/WTY20101SalesInAdvance?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }
}
