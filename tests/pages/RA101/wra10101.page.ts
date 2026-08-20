/**
 * Page Object - WRA10101 (Danh sách sản phẩm / Quản lý sản phẩm)
 * Chỉ chứa selector và các hàm thao tác UI (actions), không chứa assertion nghiệp vụ.
 *
 * Selector được trích xuất từ source code:
 * - retail_app/resources/views/layouts/app.blade.php   (thanh menu)
 * - retail_app/resources/views/products/index.blade.php (danh sách, bộ lọc)
 * - retail_app/resources/views/partials/flash.blade.php (flash message)
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import {
  getRA101BaseUrl,
  RA101_MENU_LABELS,
  RA101_PATHS,
  RA101_URL_PATTERNS,
} from './const/const-ra101';

/** Giá trị hiển thị của 1 dòng sản phẩm trên danh sách */
export interface WRA10101RowValues {
  sku: string;
  name: string;
  price: string;
  stock: string;
  status: string;
}

export class WRA10101Page extends BasePage {
  // Selectors
  private readonly selectorsWRA10101 = {
    // Thanh menu (header)
    navProductMenu: 'header.topbar nav.nav a[href$="/products"]',
    navOrderMenu: 'header.topbar nav.nav a[href$="/orders"]',
    navCustomerMenu: 'header.topbar nav.nav a[href$="/customers"]',
    navActiveMenu: 'header.topbar nav.nav a.is-active',

    // Tiêu đề màn hình
    pageTitle: 'div.page__head h1',
    pageSubTitle: 'div.page__head p.page__sub',

    // Button Thêm sản phẩm
    addProductButton: 'div.page__head a.btn--primary[href$="/products/create"]',

    // Bộ lọc
    searchInput: 'form.filters input[name="q"]',
    statusSelect: 'form.filters select[name="status"]',
    searchButton: 'form.filters button[type="submit"]',
    clearFilterButton: 'form.filters a.btn--ghost',

    // Flash message
    successAlert: 'div.alert.alert--success',
    errorAlert: 'div.alert.alert--error',

    // Bảng danh sách
    table: 'table.table',
    tableRows: 'table.table tbody tr',
    emptyMessage: 'div.empty',

    // Button thao tác trong 1 dòng
    editButtonInRow: 'div.actions a.btn--sm',
    deleteButtonInRow: 'div.actions form.inline-form button.btn--danger',
  };

  /** Vị trí cột trong bảng danh sách (index.blade.php) */
  private readonly columnIndex = {
    sku: 1,
    name: 2,
    price: 3,
    stock: 4,
    status: 5,
  };

  constructor(page: Page) {
    super(page, getRA101BaseUrl());
  }

  /**
   * Truy cập màn hình trang chủ của Retail App (http://localhost:8080)
   */
  async navigateHome(): Promise<void> {
    await this.goto(RA101_PATHS.HOME);
  }

  /**
   * Truy cập trực tiếp màn hình danh sách sản phẩm
   */
  async navigate(): Promise<void> {
    await this.goto(RA101_PATHS.PRODUCT_LIST);
  }

  /**
   * Click menu "Sản phẩm" trên thanh header -> chuyển sang danh sách sản phẩm
   */
  async clickProductMenu(): Promise<void> {
    const menu = this.page.locator(this.selectorsWRA10101.navProductMenu);
    await this.waitForVisible(menu);
    await menu.click();
    await this.waitForListReady();
  }

  /**
   * Click button "+ Thêm sản phẩm" -> chuyển sang màn hình đăng ký sản phẩm
   */
  async clickAddProduct(): Promise<void> {
    const button = this.page.locator(this.selectorsWRA10101.addProductButton);
    await this.waitForVisible(button);
    await button.click();
    await this.waitForNavigation(RA101_URL_PATTERNS.PRODUCT_CREATE);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Chờ màn hình danh sách sản phẩm hiển thị xong
   */
  async waitForListReady(): Promise<void> {
    await this.waitForNavigation(RA101_URL_PATTERNS.PRODUCT_LIST);
    await this.page.waitForLoadState('networkidle');
    await this.waitForVisible(this.page.locator(this.selectorsWRA10101.addProductButton));
  }

  /**
   * Lấy tiêu đề màn hình (h1)
   */
  async getPageTitle(): Promise<string> {
    const title = this.page.locator(this.selectorsWRA10101.pageTitle);
    return (await this.getTextByLocator(title)).trim();
  }

  /**
   * Lấy nhãn menu đang được active
   */
  async getActiveMenuLabel(): Promise<string> {
    const activeMenu = this.page.locator(this.selectorsWRA10101.navActiveMenu).first();
    return (await this.getTextByLocator(activeMenu)).trim();
  }

  /**
   * Kiểm tra menu "Sản phẩm" đang được active hay không
   */
  async isProductMenuActive(): Promise<boolean> {
    const activeLabel = await this.getActiveMenuLabel().catch(() => '');
    return activeLabel === RA101_MENU_LABELS.PRODUCT;
  }

  /**
   * Tìm kiếm sản phẩm theo tên hoặc SKU
   */
  async searchProduct(keyword: string): Promise<void> {
    const input = this.page.locator(this.selectorsWRA10101.searchInput);
    await this.waitForVisible(input);
    await input.fill(keyword);

    const button = this.page.locator(this.selectorsWRA10101.searchButton);
    await this.waitForVisible(button);

    // Chờ đúng lần điều hướng do nút Tìm sinh ra (URL /products -> /products?q=...)
    await this.clickAndWaitForLoad(button);

    await this.waitForVisible(this.page.locator(this.selectorsWRA10101.addProductButton));
  }

  /**
   * Lấy locator của dòng sản phẩm theo mã SKU
   */
  getRowBySku(sku: string): Locator {
    return this.page.locator(`${this.selectorsWRA10101.tableRows}:has(td.mono:text-is("${sku}"))`);
  }

  /**
   * Kiểm tra dòng sản phẩm theo mã SKU có hiển thị hay không
   */
  async isProductRowVisible(sku: string, timeout: number = 10000): Promise<boolean> {
    return await this.isLocatorVisible(this.getRowBySku(sku), timeout);
  }

  /**
   * Xóa sản phẩm theo mã SKU (tìm kiếm -> click Xóa -> đồng ý confirm)
   * Dùng để dọn dữ liệu test. Không tìm thấy sản phẩm thì bỏ qua.
   *
   * @returns true nếu đã thực hiện xóa, false nếu không tìm thấy sản phẩm
   */
  async deleteProductBySku(sku: string): Promise<boolean> {
    await this.navigate();
    await this.searchProduct(sku);

    if (!(await this.isProductRowVisible(sku, 3000))) {
      return false;
    }

    const deleteButton = this.getRowBySku(sku)
      .first()
      .locator(this.selectorsWRA10101.deleteButtonInRow);
    await this.waitForVisible(deleteButton);

    // Form xóa có onsubmit="return confirm(...)" -> mặc định Playwright dismiss, phải accept
    this.page.once('dialog', (dialog) => dialog.accept());

    await this.clickAndWaitForLoad(deleteButton);

    return true;
  }

  /**
   * Lấy toàn bộ giá trị hiển thị của 1 dòng sản phẩm theo mã SKU
   */
  async getRowValuesBySku(sku: string): Promise<WRA10101RowValues> {
    const row = this.getRowBySku(sku).first();
    await this.waitForVisible(row);

    const getCell = async (index: number): Promise<string> => {
      const text = await row.locator(`td:nth-child(${index})`).innerText();
      return text.trim();
    };

    const nameCell = await getCell(this.columnIndex.name);

    return {
      sku: await getCell(this.columnIndex.sku),
      // Ô "Tên sản phẩm" gồm tên ở dòng đầu và mô tả rút gọn (div.sub) ở dòng sau
      name: nameCell.split('\n')[0].trim(),
      price: await getCell(this.columnIndex.price),
      stock: await getCell(this.columnIndex.stock),
      status: await getCell(this.columnIndex.status),
    };
  }

  /**
   * Lấy phần mô tả rút gọn hiển thị trong ô "Tên sản phẩm"
   */
  async getRowDescriptionBySku(sku: string): Promise<string> {
    const row = this.getRowBySku(sku).first();
    await this.waitForVisible(row);

    const description = row.locator(`td:nth-child(${this.columnIndex.name}) div.sub`);
    if (!(await description.isVisible({ timeout: 2000 }).catch(() => false))) {
      return '';
    }

    return (await description.innerText()).trim();
  }

  /**
   * Đếm số dòng đang hiển thị trên danh sách
   */
  async getProductRowCount(): Promise<number> {
    return await this.page.locator(this.selectorsWRA10101.tableRows).count();
  }

  /**
   * Kiểm tra flash message thành công có hiển thị hay không
   */
  async isSuccessAlertVisible(): Promise<boolean> {
    return await this.isLocatorVisible(this.page.locator(this.selectorsWRA10101.successAlert));
  }

  /**
   * Lấy nội dung flash message thành công
   */
  async getSuccessMessage(): Promise<string> {
    const alert = this.page.locator(this.selectorsWRA10101.successAlert);
    return (await this.getTextByLocator(alert)).trim();
  }

  /**
   * Kiểm tra khối thông báo lỗi có hiển thị hay không
   */
  async isErrorAlertVisible(): Promise<boolean> {
    return await this.isLocatorVisible(this.page.locator(this.selectorsWRA10101.errorAlert), 2000);
  }

  /**
   * Kiểm tra danh sách đang ở trạng thái rỗng
   */
  async isEmptyMessageVisible(): Promise<boolean> {
    return await this.isLocatorVisible(this.page.locator(this.selectorsWRA10101.emptyMessage), 5000);
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
}
