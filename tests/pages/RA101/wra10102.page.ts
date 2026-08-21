/**
 * Page Object — WRA10102 (Thêm sản phẩm / Đăng ký sản phẩm)
 * Chỉ chứa selector và hàm thao tác UI. KHÔNG chứa assertion.
 *
 * Selector trích xuất từ source code app (appSourcePath = ./apps/retail_app):
 * - resources/views/products/create.blade.php   (tiêu đề trang, thẻ form)
 * - resources/views/products/_form.blade.php    (toàn bộ trường nhập, nút Lưu/Hủy)
 * - resources/views/partials/flash.blade.php    (khối thông báo lỗi/thành công)
 * - app/Http/Controllers/ProductController.php  (đích điều hướng sau khi lưu)
 *
 * CẠM BẪY của màn này, đã xử lý bên dưới:
 *
 * 1. `name="is_active"` xuất hiện HAI lần: một input hidden value="0" đứng trước
 *    (_form.blade.php:49) và checkbox value="1" (_form.blade.php:51). Selector
 *    `input[name="is_active"]` sẽ khớp 2 element -> phải chỉ rõ [type="checkbox"].
 *
 * 2. `id="sku"`, `id="name"`, `id="price"` là id chung, trùng với màn Sửa sản phẩm
 *    (cả hai màn render chung _form.blade.php). Mọi selector đều được scope trong
 *    thẻ form của màn này, không bám id trần.
 *
 * 3. Mọi trường bắt buộc đều có thuộc tính `required` (_form.blade.php:7,16,25,34)
 *    -> bỏ trống rồi bấm Lưu thì TRÌNH DUYỆT chặn, request không tới server và
 *    trang không tải lại. Muốn kiểm nhánh đó phải đọc trạng thái validate của
 *    trình duyệt, không chờ điều hướng.
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { getRA101BaseUrl, RA101_PATHS, RA101_URL_PATTERNS } from './const/const-ra101';

/** Dữ liệu nhập của form Thêm sản phẩm */
export interface WRA10102FormData {
  sku: string;
  name: string;
  price: string;
  stock: string;
  description: string;
  isActive: boolean;
}

export type WRA10102FormFieldKey = keyof WRA10102FormData;

/** Các trường dạng input/textarea — không tính checkbox isActive */
export type WRA10102InputFieldKey = Exclude<WRA10102FormFieldKey, 'isActive'>;

export class WRA10102Page extends BasePage {
  /** Thẻ form của màn Thêm sản phẩm (create.blade.php:12) — dùng để scope mọi trường */
  private readonly formScope = 'form[action$="/products"]';

  private readonly selectorsWRA10102 = {
    /** div.page__head h1 — create.blade.php:7 */
    pageTitle: 'div.page__head h1',

    /** button[type="submit"] trong form — _form.blade.php:57 */
    saveButton: 'form[action$="/products"] button[type="submit"]',

    /** Liên kết Hủy, trỏ về danh sách — _form.blade.php:58 */
    cancelButton: 'form[action$="/products"] a.btn:not(.btn--primary)',

    /** Khối thông báo lỗi tổng — flash.blade.php:5-14 */
    errorAlert: 'div.alert.alert--error',

    /** Từng dòng lỗi trong khối trên — flash.blade.php:9-11 */
    errorAlertItems: 'div.alert.alert--error ul li',

    /** Tiêu đề khối lỗi — flash.blade.php:6 */
    errorAlertTitle: 'div.alert.alert--error strong',
  } as const;

  /**
   * Selector của từng trường nhập, scope trong thẻ form để không đụng màn Sửa.
   * Nguồn: _form.blade.php dòng 6, 15, 24, 33, 44, 51.
   */
  private readonly fieldSelectors: Record<WRA10102FormFieldKey, string> = {
    sku: `${this.formScope} input[name="sku"]`,
    name: `${this.formScope} input[name="name"]`,
    price: `${this.formScope} input[name="price"]`,
    stock: `${this.formScope} input[name="stock"]`,
    description: `${this.formScope} textarea[name="description"]`,
    // [type="checkbox"] là BẮT BUỘC: có thêm input hidden cùng name (cạm bẫy 1)
    isActive: `${this.formScope} input[type="checkbox"][name="is_active"]`,
  };

  constructor(page: Page) {
    super(page);
  }

  /** Mở trực tiếp màn Thêm sản phẩm */
  async navigate(): Promise<void> {
    await this.page.goto(`${getRA101BaseUrl()}${RA101_PATHS.PRODUCT_CREATE}`);
    await this.waitForFormReady();
  }

  /** Chờ form nhập đã sẵn sàng để nhập liệu */
  async waitForFormReady(): Promise<void> {
    await this.waitForVisible(this.page.locator(this.fieldSelectors.sku));
    await this.waitForVisible(this.page.locator(this.selectorsWRA10102.saveButton));
  }

  /** Lấy tiêu đề trang (kỳ vọng: `Thêm sản phẩm`) */
  async getPageTitle(): Promise<string> {
    const title = this.page.locator(this.selectorsWRA10102.pageTitle);
    return (await this.getTextByLocator(title)).trim();
  }

  /** Locator của một trường, dùng khi test cần thao tác riêng lẻ */
  getFieldLocator(field: WRA10102FormFieldKey): Locator {
    return this.page.locator(this.fieldSelectors[field]);
  }

  /**
   * Điền form. Nhận dữ liệu MỘT PHẦN — chỉ trường nào truyền vào mới bị chạm,
   * nhờ đó test kiểm bỏ trống một trường không phải dựng cả bộ dữ liệu.
   *
   * Chuỗi rỗng vẫn được xử lý (xóa sạch trường đó), khác với không truyền.
   */
  async fillForm(data: Partial<WRA10102FormData>): Promise<void> {
    const inputKeys: WRA10102InputFieldKey[] = ['sku', 'name', 'price', 'stock', 'description'];

    for (const key of inputKeys) {
      const value = data[key];
      if (value === undefined) {
        continue;
      }

      const locator = this.page.locator(this.fieldSelectors[key]);
      await this.waitForVisible(locator);
      await locator.fill(value);
    }

    if (data.isActive !== undefined) {
      await this.setActiveCheckbox(data.isActive);
    }
  }

  /** Tích / bỏ tích ô `Đang bán` */
  async setActiveCheckbox(checked: boolean): Promise<void> {
    const checkbox = this.page.locator(this.fieldSelectors.isActive);
    await this.waitForVisible(checkbox);

    if ((await checkbox.isChecked()) !== checked) {
      await checkbox.click();
    }
  }

  /** Đọc giá trị hiện tại của một trường nhập */
  async getFieldValue(field: WRA10102InputFieldKey): Promise<string> {
    return await this.page.locator(this.fieldSelectors[field]).inputValue();
  }

  /** Ô `Đang bán` hiện đang được tích hay không */
  async isActiveChecked(): Promise<boolean> {
    return await this.page.locator(this.fieldSelectors.isActive).isChecked();
  }

  /**
   * Bấm nút `Lưu` và chờ trang tải xong.
   *
   * Dùng cho trường hợp request THỰC SỰ tới server — tức mọi trường bắt buộc đã
   * được điền. Trường bắt buộc còn trống thì trình duyệt chặn submit (cạm bẫy 3),
   * trang không tải lại và hàm này chỉ chờ hết thời gian rồi đi tiếp.
   */
  async clickSave(): Promise<void> {
    const button = this.page.locator(this.selectorsWRA10102.saveButton);
    await this.waitForVisible(button);

    const loaded = this.page.waitForEvent('load', { timeout: 15000 }).catch(() => null);
    await button.click();
    await loaded;
    await this.page.waitForLoadState('networkidle');
  }

  /** Bấm `Hủy` — quay về danh sách, không lưu gì */
  async clickCancel(): Promise<void> {
    const link = this.page.locator(this.selectorsWRA10102.cancelButton);
    await this.waitForVisible(link);

    const loaded = this.page.waitForEvent('load', { timeout: 15000 }).catch(() => null);
    await link.click();
    await loaded;
    await this.page.waitForLoadState('networkidle');
  }

  /** Vẫn đang ở màn Thêm sản phẩm hay đã chuyển đi */
  isOnCreatePage(): boolean {
    return RA101_URL_PATTERNS.PRODUCT_CREATE.test(this.getCurrentUrl());
  }

  /** Khối thông báo lỗi tổng có hiển thị hay không */
  async isErrorAlertVisible(timeout: number = 5000): Promise<boolean> {
    try {
      await this.page.locator(this.selectorsWRA10102.errorAlert).first().waitFor({
        state: 'visible',
        timeout,
      });
      return true;
    } catch {
      return false;
    }
  }

  /** Tiêu đề của khối lỗi (kỳ vọng: `Không lưu được, vui lòng kiểm tra lại:`) */
  async getErrorAlertTitle(): Promise<string> {
    const title = this.page.locator(this.selectorsWRA10102.errorAlertTitle);
    return (await this.getTextByLocator(title)).trim();
  }

  /**
   * Danh sách từng dòng lỗi trong khối thông báo.
   * Không có khối lỗi thì trả về mảng rỗng, không throw.
   */
  async getErrorMessages(): Promise<string[]> {
    if (!(await this.isErrorAlertVisible())) {
      return [];
    }

    const items = this.page.locator(this.selectorsWRA10102.errorAlertItems);
    const count = await items.count();

    const messages: string[] = [];
    for (let i = 0; i < count; i += 1) {
      messages.push((await items.nth(i).innerText()).trim());
    }

    return messages;
  }

  /**
   * Trường này có đang hợp lệ theo validate CỦA TRÌNH DUYỆT hay không.
   * Dùng cho nhánh bỏ trống trường `required` (cạm bẫy 3) — lúc đó không có
   * request nào tới server nên không có khối lỗi để đọc.
   */
  async isFieldNativelyValid(field: WRA10102InputFieldKey): Promise<boolean> {
    return await this.page
      .locator(this.fieldSelectors[field])
      .evaluate((el) => (el as HTMLInputElement).checkValidity());
  }
}
