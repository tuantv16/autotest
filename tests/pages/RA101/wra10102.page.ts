/**
 * Page Object - WRA10102 (Đăng ký sản phẩm / Thêm sản phẩm)
 * Chỉ chứa selector và các hàm thao tác UI (actions), không chứa assertion nghiệp vụ.
 *
 * Selector được trích xuất từ source code:
 * - retail_app/resources/views/products/create.blade.php
 * - retail_app/resources/views/products/_form.blade.php
 * - retail_app/resources/views/partials/flash.blade.php
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { getRA101BaseUrl, RA101_PATHS, RA101_URL_PATTERNS } from './const/const-ra101';

/** Dữ liệu nhập của form đăng ký sản phẩm */
export interface WRA10102FormData {
  sku: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  isActive: boolean;
}

export type WRA10102FormFieldKey = keyof WRA10102FormData;

/** Các trường dạng input/textarea (không tính checkbox isActive) */
export type WRA10102InputFieldKey = Exclude<WRA10102FormFieldKey, 'isActive'>;

export class WRA10102Page extends BasePage {
  // Selectors
  private readonly selectorsWRA10102 = {
    // Tiêu đề màn hình
    pageTitle: 'div.page__head h1',

    // Form
    form: 'div.card__body form[method="POST"]',
    csrfToken: 'input[name="_token"]',

    // Các trường nhập liệu
    skuInput: '#sku',
    nameInput: '#name',
    priceInput: '#price',
    stockInput: '#stock',
    descriptionTextarea: '#description',
    isActiveCheckbox: 'input[type="checkbox"][name="is_active"]',

    // Button
    saveButton: 'div.form-actions button[type="submit"]',
    cancelButton: 'div.form-actions a.btn[href$="/products"]',

    // Thông báo lỗi
    errorAlert: 'div.alert.alert--error',
    errorAlertTitle: 'div.alert.alert--error strong',
    errorAlertItems: 'div.alert.alert--error ul li',
    successAlert: 'div.alert.alert--success',
    fieldErrorClass: 'div.field__error',
    inputErrorClass: 'input--error',
  };

  /** Map field key -> selector của element nhập liệu */
  private readonly fieldSelectors: Record<WRA10102InputFieldKey, string> = {
    sku: this.selectorsWRA10102.skuInput,
    name: this.selectorsWRA10102.nameInput,
    price: this.selectorsWRA10102.priceInput,
    stock: this.selectorsWRA10102.stockInput,
    description: this.selectorsWRA10102.descriptionTextarea,
  };

  /** Map field key -> hàm nhập dữ liệu tương ứng */
  private readonly formFieldFillers: Record<WRA10102FormFieldKey, (value: any) => Promise<void>> = {
    sku: async (value: string) => this.fillSku(value),
    name: async (value: string) => this.fillName(value),
    price: async (value: string) => this.fillPrice(value),
    stock: async (value: string) => this.fillStock(value),
    description: async (value: string) => this.fillDescription(value),
    isActive: async (value: boolean) => this.setActive(value),
  };

  constructor(page: Page) {
    super(page, getRA101BaseUrl());
  }

  /**
   * Truy cập trực tiếp màn hình đăng ký sản phẩm
   */
  async navigate(): Promise<void> {
    await this.goto(RA101_PATHS.PRODUCT_CREATE);
  }

  /**
   * Chờ form đăng ký sản phẩm hiển thị xong
   */
  async waitForFormReady(): Promise<void> {
    await this.page.waitForSelector(this.selectorsWRA10102.skuInput, {
      state: 'visible',
      timeout: 10000,
    });
  }

  /**
   * Lấy tiêu đề màn hình (h1)
   */
  async getPageTitle(): Promise<string> {
    const title = this.page.locator(this.selectorsWRA10102.pageTitle);
    return (await this.getTextByLocator(title)).trim();
  }

  /**
   * Nhập Mã SKU
   */
  async fillSku(value: string): Promise<void> {
    await this.fillFieldValue('sku', value);
  }

  /**
   * Nhập Tên sản phẩm
   */
  async fillName(value: string): Promise<void> {
    await this.fillFieldValue('name', value);
  }

  /**
   * Nhập Giá bán (₫)
   */
  async fillPrice(value: string): Promise<void> {
    await this.fillFieldValue('price', value);
  }

  /**
   * Nhập Số lượng tồn
   */
  async fillStock(value: string): Promise<void> {
    await this.fillFieldValue('stock', value);
  }

  /**
   * Nhập Mô tả
   */
  async fillDescription(value: string): Promise<void> {
    await this.fillFieldValue('description', value);
  }

  /**
   * Tick / bỏ tick checkbox "Đang bán"
   */
  async setActive(checked: boolean): Promise<void> {
    const checkbox = this.page.locator(this.selectorsWRA10102.isActiveCheckbox);
    await this.waitForVisible(checkbox);

    if (checked) {
      await checkbox.check();
    } else {
      await checkbox.uncheck();
    }
  }

  /**
   * Nhập dữ liệu vào form (chỉ nhập các trường được truyền vào)
   */
  async fillForm(formData: Partial<WRA10102FormData>): Promise<void> {
    for (const key of Object.keys(formData) as WRA10102FormFieldKey[]) {
      const value = formData[key];
      if (value == null) continue;

      const filler = this.formFieldFillers[key];

      if (!filler) {
        throw new Error(`No filler defined for field: ${key}`);
      }

      await filler(value);
    }
  }

  /**
   * Xóa trắng toàn bộ các trường nhập liệu
   */
  async clearForm(): Promise<void> {
    for (const key of Object.keys(this.fieldSelectors) as WRA10102InputFieldKey[]) {
      const locator = this.page.locator(this.fieldSelectors[key]);
      await this.waitForVisible(locator);
      await locator.clear();
    }
  }

  /**
   * Click button "Lưu" để đăng ký sản phẩm
   * - Form hợp lệ theo validate của trình duyệt: chờ submit + điều hướng xong
   * - Form không hợp lệ: trình duyệt chặn submit, không có điều hướng để chờ
   */
  async clickSave(): Promise<void> {
    const button = this.page.locator(this.selectorsWRA10102.saveButton);
    await this.waitForVisible(button);

    const willSubmit = await this.isFormNativelyValid();

    if (!willSubmit) {
      await button.click();
      return;
    }

    await this.clickAndWaitForLoad(button);
  }

  /**
   * Kiểm tra toàn bộ form có hợp lệ theo validate của trình duyệt (HTML5) hay không
   */
  async isFormNativelyValid(): Promise<boolean> {
    const form = this.page.locator(this.selectorsWRA10102.form);
    await this.waitForVisible(form);
    return await form.evaluate((el: Element) => (el as HTMLFormElement).checkValidity());
  }

  /**
   * Click button "Hủy" để quay lại danh sách sản phẩm
   */
  async clickCancel(): Promise<void> {
    const button = this.page.locator(this.selectorsWRA10102.cancelButton);
    await this.waitForVisible(button);
    await button.click();
    await this.waitForNavigation(RA101_URL_PATTERNS.PRODUCT_LIST);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Lấy giá trị hiện tại của 1 trường nhập liệu
   */
  async getFieldValue(field: WRA10102InputFieldKey): Promise<string> {
    const locator = this.page.locator(this.fieldSelectors[field]);
    await this.waitForVisible(locator);
    return await locator.inputValue();
  }

  /**
   * Kiểm tra checkbox "Đang bán" có đang được tick hay không
   */
  async isActiveChecked(): Promise<boolean> {
    const checkbox = this.page.locator(this.selectorsWRA10102.isActiveCheckbox);
    await this.waitForVisible(checkbox);
    return await checkbox.isChecked();
  }

  /**
   * Kiểm tra trường có hợp lệ theo validate của trình duyệt (HTML5) hay không
   */
  async isFieldNativelyValid(field: WRA10102InputFieldKey): Promise<boolean> {
    const locator = this.page.locator(this.fieldSelectors[field]);
    await this.waitForVisible(locator);
    return await locator.evaluate(
      (el: Element) => (el as HTMLInputElement | HTMLTextAreaElement).checkValidity(),
    );
  }

  /**
   * Lấy message validate của trình duyệt (HTML5) trên 1 trường
   */
  async getNativeValidationMessage(field: WRA10102InputFieldKey): Promise<string> {
    const locator = this.page.locator(this.fieldSelectors[field]);
    await this.waitForVisible(locator);
    return await locator.evaluate(
      (el: Element) => (el as HTMLInputElement | HTMLTextAreaElement).validationMessage,
    );
  }

  /**
   * Kiểm tra khối tổng hợp lỗi (.alert--error) có hiển thị hay không
   */
  async isErrorSummaryVisible(): Promise<boolean> {
    return await this.isLocatorVisible(this.page.locator(this.selectorsWRA10102.errorAlert));
  }

  /**
   * Lấy tiêu đề của khối tổng hợp lỗi
   */
  async getErrorSummaryTitle(): Promise<string> {
    const title = this.page.locator(this.selectorsWRA10102.errorAlertTitle);
    return (await this.getTextByLocator(title)).trim();
  }

  /**
   * Lấy danh sách message trong khối tổng hợp lỗi
   */
  async getErrorSummaryMessages(): Promise<string[]> {
    const items = this.page.locator(this.selectorsWRA10102.errorAlertItems);
    await this.waitForVisible(items.first());

    const messages = await items.allInnerTexts();
    return messages.map((message) => message.trim());
  }

  /**
   * Lấy locator message lỗi hiển thị ngay dưới 1 trường
   */
  private getFieldErrorLocator(field: WRA10102InputFieldKey): Locator {
    return this.page.locator(
      `div.field:has(${this.fieldSelectors[field]}) ${this.selectorsWRA10102.fieldErrorClass}`,
    );
  }

  /**
   * Kiểm tra message lỗi của 1 trường có hiển thị hay không
   */
  async isFieldErrorVisible(field: WRA10102InputFieldKey): Promise<boolean> {
    return await this.isLocatorVisible(this.getFieldErrorLocator(field));
  }

  /**
   * Lấy message lỗi hiển thị ngay dưới 1 trường
   */
  async getFieldErrorMessage(field: WRA10102InputFieldKey): Promise<string> {
    const error = this.getFieldErrorLocator(field).first();
    return (await this.getTextByLocator(error)).trim();
  }

  /**
   * Kiểm tra 1 trường có được tô viền lỗi (class input--error) hay không
   */
  async hasErrorBorder(field: WRA10102InputFieldKey): Promise<boolean> {
    const locator = this.page.locator(this.fieldSelectors[field]);
    await this.waitForVisible(locator);

    const classList = await locator
      .evaluate((el: Element) => Array.from(el.classList) as string[])
      .catch(() => [] as string[]);

    return classList.includes(this.selectorsWRA10102.inputErrorClass);
  }

  /**
   * Kiểm tra flash message thành công có hiển thị trên màn hình đăng ký hay không
   */
  async isSuccessAlertVisible(): Promise<boolean> {
    return await this.isLocatorVisible(
      this.page.locator(this.selectorsWRA10102.successAlert),
      2000,
    );
  }

  /**
   * Kiểm tra button "Lưu" hiển thị và cho phép thao tác
   */
  async isSaveButtonEnabled(): Promise<boolean> {
    const button = this.page.locator(this.selectorsWRA10102.saveButton);
    await this.waitForVisible(button);
    return await button.isEnabled();
  }

  /**
   * Click 1 element gây điều hướng (submit form / click link) và chờ trang mới load xong
   */
  private async clickAndWaitForLoad(locator: Locator, timeout: number = 15000): Promise<void> {
    const loaded = this.page.waitForEvent('load', { timeout }).catch(() => null);
    await locator.click();
    await loaded;
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Chờ và kiểm tra 1 element có hiển thị hay không
   * (locator.isVisible() không chờ, nên dùng waitFor để tránh kiểm tra sớm)
   */
  private async isLocatorVisible(locator: Locator, timeout: number = 10000): Promise<boolean> {
    try {
      await locator.first().waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Nhập giá trị vào 1 trường theo key (xóa trắng trước khi nhập)
   * Form của Retail App là HTML thuần (không có mask/format khi gõ) nên dùng fill() cho ổn định.
   */
  private async fillFieldValue(field: WRA10102InputFieldKey, value: string): Promise<void> {
    const locator = this.page.locator(this.fieldSelectors[field]);
    await this.waitForVisible(locator);
    await locator.scrollIntoViewIfNeeded();
    await locator.fill(value);
  }
}
