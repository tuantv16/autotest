import { BasePage } from "../base.page";

export class TY32101Page extends BasePage {
    public selectors = {
        InventoryGuideCombobox: '#tnorsShiji[role="combobox"], label[for="tnorsShiji"] ~ div [role="combobox"]',
        inventoryDateCombobox: '#tnorsDate[role="combobox"], label[for="tnorsDate"] ~ div [role="combobox"]',
        InventoryGuideDropdownOption: '#_r_1_ li',
        errorDialog: '#wty32101-error-dialog',
        inventoryGuideText: '#tnorsShiji span',
        inventoryDateText: '#tnorsDate span',
    };

    async navigate(pilotKey: string = 'prod'): Promise<void>{
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY32101InventoryPreprocessing?token=G92U8I0NxKPkMQ_RkIH4CQvp9Qac3dJwpZLdElKIKB399ZCABTy_sN0Zqv-RmGA3eVv-DXH7PScUojvfb8i6hMgeQy0RFM3npXT_A-YXlotyY6bO7pv4DP3RDNAsh21mQZr_1f1AOJjkixs4OY9_o_NhqpQLJ0iqfHAgNaiEZgcGtzOb9aaS479ufkj-Wn6KmqaEDEU5JgdEuKw0RLfw9dAgKlEDyUf85QgDSwGbMpR3LF6uDXX-OKbpIZ7DIKxE&jznuridenNo=00102498010416&jznuridenHkkDate=20251022&unyoDate=20251022&cipher=LOCAL_DEV_DUMMY_KEY`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

  /**
   * Click on combobox and select option by text
   * @param optionText - Text of the option to select
   * @param comboboxSelector - Optional selector for the combobox (default: salesDepartmentCombobox)
   */
  async selectComboboxOptionByText(optionText: string, comboboxSelector?: string): Promise<void> {
    const selector = comboboxSelector || '';
    const optionSelectors = [
      `ul.MuiList-root li[role="option"]:has-text("${optionText}")`,
      `${this.selectors.InventoryGuideDropdownOption}:has-text("${optionText}")`,
      `li[role="option"]:has-text("${optionText}")`,
    ];
    await super.clickOptionInCombobox(optionSelectors, `Option with text "${optionText}" not found in combobox dropdown`, selector);
  }
}
