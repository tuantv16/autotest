/**
 * Page Object for 販売区分選択 screen
 */

import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";

export class WTY20401Page extends BasePage {
  // Selectors
  private readonly selectors = {
    // Page title
    pageTitle: 'div:has-text("販売区分選択")',
    // section-title: 販売区分
    hanTypeTitle: 'label[for="han-type"]',
    // section-title: 会員申請
    memberTypeTitle: 'label[for="member-type"]',
    // section-title: ＴＥＬフォロー
    telTypeTitle: 'label[for="tel-type"]',
    // Confirm button
    confirmButton: 'button:has-text("確定")',
    // Error Dialog
    errorDialog: '#errorDialog',
    errorDialogMessage: '#errorDialog p._dialogParagraph_1afn1_52',
    errorDialogOkButton: '#ok_only_button',
    // 販売区分 radio buttons
    hanTypeGeneralInput: 'input[name="han-type"][value="0"]',
    hanTypeGeneralLabel: 'label:has(input[name="han-type"][value="0"]) span',
    hanTypeBridalInput: 'input[name="han-type"][value="1"]',
    hanTypeBridalLabel: 'label:has(input[name="han-type"][value="1"]) span',
    hanTypeSingleLifeInput: 'input[name="han-type"][value="2"]',
    hanTypeSingleLifeLabel: 'label:has(input[name="han-type"][value="2"]) span',
    hanTypeRenovationInput: 'input[name="han-type"][value="3"]',
    hanTypeRenovationLabel: 'label:has(input[name="han-type"][value="3"]) span',
    hanTypeSystemInput: 'input[name="han-type"][value="4"]',
    hanTypeSystemLabel: 'label:has(input[name="han-type"][value="4"]) span',
    hanTypeGiftInput: 'input[name="han-type"][value="5"]',
    hanTypeGiftLabel: 'label:has(input[name="han-type"][value="5"]) span',
    // 会員申請 radio buttons
    memberTypeYesInput: 'input[name="member-type"][value="1"]',
    memberTypeYesLabel: 'label:has(input[name="member-type"][value="1"]) span',
    memberTypeNoInput: 'input[name="member-type"][value="0"]',
    memberTypeNoLabel: 'label:has(input[name="member-type"][value="0"]) span',
    // ＴＥＬフォロー radio buttons
    telTypeRequiredInput: 'input[name="tel-type"][value="1"]',
    telTypeRequiredLabel: 'label:has(input[name="tel-type"][value="1"]) span',
    telTypeNotRequiredInput: 'input[name="tel-type"][value="0"]',
    telTypeNotRequiredLabel: 'label:has(input[name="tel-type"][value="0"]) span',
  };

  constructor(page: Page) {
    super(page);
  }

  async navigate(pilotKey: string = "prod"): Promise<void> {
    const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY20401SalesCategory?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
    await this.goto(url);
    await this.page.waitForTimeout(1000);
  }

  async waitForFormReady(): Promise<void> {
    await this.page.waitForSelector(this.selectors.pageTitle, {
      state: "visible",
      timeout: 10000,
    });
  }

  async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }

  async waitForAPIReady(expectedValue: string, timeout = 10000): Promise<void> {
    const input = this.page.locator(this.selectors.kataInput);

    await expect(input).toBeVisible({ timeout });
    await expect(input).toHaveValue(expectedValue, { timeout });
  }

  async getPageTitle(): Promise<boolean> {
    return await this.page
      .locator(this.selectors.pageTitle)
      .first()
      .isVisible();
  }

  async getSectionTitle(section_title: string): Promise<boolean> {
    return await this.page
      .locator(`label[for="${section_title}"]`)
      .first()
      .isVisible();
  }

  async isConfirmButtonDisabled(): Promise<boolean> {
    return await this.page.locator(this.selectors.confirmButton).isDisabled();
  }

  async isErrorDialogVisible(): Promise<boolean> {
    return await this.page.locator(this.selectors.errorDialog).isVisible();
  }

  async waitForErrorDialog(timeout = 10000): Promise<void> {
    await expect(this.page.locator(this.selectors.errorDialog)).toBeVisible({
      timeout,
    });
  }

  async getErrorDialogMessage(): Promise<string> {
    return await this.page
      .locator(this.selectors.errorDialogMessage)
      .innerText();
  }

  async getErrorDialogOkButtonText(): Promise<string> {
    return await this.page
      .locator(this.selectors.errorDialogOkButton)
      .innerText();
  }

  async isHanTypeSelected(value: string): Promise<boolean> {
    return await this.page.locator(`input[name="han-type"][value="${value}"]`).isChecked();
  }

  async isSingleLifeSelected(): Promise<boolean> {
    return await this.isHanTypeSelected("2");
  }

  async isGeneralPurchaseSelected(): Promise<boolean> {
    return await this.isHanTypeSelected("0");
  }

  async isGiftSelected(): Promise<boolean> {
    return await this.isHanTypeSelected("5");
  }

  async selectGeneralPurchase(): Promise<void> {
    await this.page.locator(this.selectors.hanTypeGeneralLabel).click();
  }

  async selectGiftLabel(): Promise<void> {
    await this.page.locator(this.selectors.hanTypeGiftLabel).click();
  }

  async isMemberTypeSelected(value: string): Promise<boolean> {
    return await this.page.locator(`input[name="member-type"][value="${value}"]`).isChecked();
  }

  async selectMemberTypeNo(): Promise<void> {
    await this.page.locator(this.selectors.memberTypeNoLabel).click();
  }

  async selectMemberTypeYes(): Promise<void> {
    await this.page.locator(this.selectors.memberTypeYesLabel).click();
  }

  async isErrorDialogContainsEdionMemberMessage(): Promise<boolean> {
    try {
      const message = await this.getErrorDialogMessage();
      return message.includes("あんしん未会員でエディオン会員申請ボタンが押下されているため、処理を継続できません。あんしん保証カード会員本登録後会員申請をしてください。");
    } catch {
      return false;
    }
  }

  async isMemberTypeYesSelected(): Promise<boolean> {
    return await this.isMemberTypeSelected("1");
  }

  async isMemberTypeNoSelected(): Promise<boolean> {
    return await this.isMemberTypeSelected("0");
  }

  async isMemberTypeTitleContains100ManVolt(): Promise<boolean> {
    try {
      const titleText = await this.page
        .locator(this.selectors.memberTypeTitle)
        .innerText();
      
      return titleText.includes("100満ﾎﾞﾙﾄ");
    } catch {
      return false;
    }
  }

  async isMemberTypeTitleEdionMember(): Promise<boolean> {
    try {
      const titleText = await this.page
        .locator(this.selectors.memberTypeTitle)
        .innerText();
      
      return titleText.includes("ｴﾃﾞｨｵﾝ 会員申請");
    } catch {
      return false;
    }
  }

  async isTelTypeSelected(value: string): Promise<boolean> {
    return await this.page.locator(`input[name="tel-type"][value="${value}"]`).isChecked();
  }

  async clickTelTypeRequired(): Promise<void> {
    await this.page.locator(this.selectors.telTypeRequiredLabel).click();
  }

  async clickTelTypeNotRequired(): Promise<void> {
    await this.page.locator(this.selectors.telTypeNotRequiredLabel).click();
  }

  async isTelTypeNotRequiredSelected(): Promise<boolean> {
    return await this.isTelTypeSelected("0");
  }

  async selectTelTypeRequired(): Promise<boolean> {
    return await this.isTelTypeSelected("1");
  }

  async isMemberTypeSectionHidden(): Promise<boolean> {
    const titleVisible = await this.page
      .locator(this.selectors.memberTypeTitle)
      .isVisible()
      .catch(() => false);
    
    if (titleVisible) return false;

    const yesLabelVisible = await this.page
      .locator(this.selectors.memberTypeYesLabel)
      .isVisible()
      .catch(() => false);
    
    const noLabelVisible = await this.page
      .locator(this.selectors.memberTypeNoLabel)
      .isVisible()
      .catch(() => false);

    return !titleVisible && !yesLabelVisible && !noLabelVisible;
  }

  async isTelTypeSectionHidden(): Promise<boolean> {
    const titleVisible = await this.page
      .locator(this.selectors.telTypeTitle)
      .isVisible()
      .catch(() => false);
    
    if (titleVisible) return false;

    const requiredLabelVisible = await this.page
      .locator(this.selectors.telTypeRequiredLabel)
      .isVisible()
      .catch(() => false);
    
    const notRequiredLabelVisible = await this.page
      .locator(this.selectors.telTypeNotRequiredLabel)
      .isVisible()
      .catch(() => false);

    return !titleVisible && !requiredLabelVisible && !notRequiredLabelVisible;
  }

}
