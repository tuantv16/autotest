/**
 * Page Object — WRA10201 (Danh sách / Tìm đơn hàng)
 *
 * Chỉ chứa selector và hàm thao tác UI (actions), KHÔNG chứa assertion nghiệp vụ.
 *
 * Selector được trích xuất từ source code:
 * - apps/retail_app/resources/views/layouts/app.blade.php:10-23    (thanh menu)
 * - apps/retail_app/resources/views/orders/index.blade.php:6-101   (tiêu đề, bộ lọc, bảng)
 * - apps/retail_app/resources/views/partials/order-status.blade.php:2 (badge trạng thái)
 * - apps/retail_app/resources/views/partials/flash.blade.php       (flash message)
 *
 * Thứ tự neo bám theo CLAUDE.md §1 Luật 2: ưu tiên `name="..."` (input[name="q"],
 * select[name="status"], input[name="from"], input[name="to"]), rồi tới class CSS
 * (form.filters, table.table, div.empty). Không dùng text tiếng Việt làm neo cho
 * phần tử form. Mọi selector đều scope trong form.filters để không bắt trúng
 * phần tử cùng tên ở màn khác.
 */

import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';
import { getRA102BaseUrl, RA102_PATHS, RA102_URL_PATTERNS } from './const/const-ra102';

/** Giá trị hiển thị của 1 dòng đơn hàng trên danh sách (index.blade.php:53-60) */
export interface WRA10201RowValues {
  /** Mã đơn — cột 1, ví dụ 'DH20260813-00322' */
  code: string;
  /** Ngày đặt — cột 2, định dạng d/m/Y (index.blade.php:70) */
  orderDate: string;
  /** Khách hàng — cột 3; '—' khi đơn không gắn khách (index.blade.php:79) */
  customer: string;
  /** Số dòng — cột 4 */
  itemsCount: string;
  /** Trạng thái — cột 5, nhãn của badge */
  status: string;
  /** Tổng tiền — cột 6, định dạng '97.420.000 ₫' */
  totalAmount: string;
}

/** Điều kiện lọc trên form.filters (index.blade.php:16-41) */
export interface WRA10201FilterCriteria {
  /** input[name="q"] — khớp mã đơn, tên hoặc SĐT khách (Order::scopeSearch, Order.php:62-78) */
  keyword?: string;
  /** select[name="status"] — value, xem RA102_STATUS_VALUES */
  status?: string;
  /** input[name="from"] — định dạng YYYY-MM-DD (input type="date") */
  from?: string;
  /** input[name="to"] — định dạng YYYY-MM-DD (input type="date") */
  to?: string;
}

export class WRA10201Page extends BasePage {
  // Selectors
  private readonly selectorsWRA10201 = {
    // Thanh menu (header) — layouts/app.blade.php:13-22
    navOrderMenu: 'header.topbar nav.nav a[href$="/orders"]',
    navActiveMenu: 'header.topbar nav.nav a.is-active',

    // Tiêu đề màn hình — index.blade.php:8-9
    pageTitle: 'div.page__head h1',
    pageSubTitle: 'div.page__head p.page__sub',

    // Button Tạo đơn hàng — index.blade.php:11
    createOrderButton: 'div.page__head a.btn--primary[href$="/orders/create"]',

    // Bộ lọc — index.blade.php:16-41
    filterForm: 'form.filters',
    searchInput: 'form.filters input[name="q"]',
    statusSelect: 'form.filters select[name="status"]',
    fromDateInput: 'form.filters input[name="from"]',
    toDateInput: 'form.filters input[name="to"]',
    filterButton: 'form.filters button[type="submit"]',
    clearFilterButton: 'form.filters a.btn--ghost',

    // Flash message — partials/flash.blade.php
    successAlert: 'div.alert.alert--success',
    errorAlert: 'div.alert.alert--error',

    // Bảng danh sách — index.blade.php:51-99
    table: 'table.table',
    tableRows: 'table.table tbody tr',
    emptyMessage: 'div.empty',
    pagination: 'div.card__foot',
  };

  /** Vị trí cột trong bảng danh sách (index.blade.php:53-60) */
  private readonly columnIndex = {
    code: 1,
    orderDate: 2,
    customer: 3,
    itemsCount: 4,
    status: 5,
    totalAmount: 6,
  };

  constructor(page: Page) {
    super(page, getRA102BaseUrl());
  }

  /** Truy cập trang chủ Retail App (http://localhost:8080) */
  async navigateHome(): Promise<void> {
    await this.goto(RA102_PATHS.HOME);
  }

  /** Truy cập trực tiếp màn hình danh sách đơn hàng */
  async navigate(): Promise<void> {
    await this.goto(RA102_PATHS.ORDER_LIST);
    await this.waitForListReady();
  }

  /** Click menu "Đơn hàng" trên thanh header -> chuyển sang danh sách đơn hàng */
  async clickOrderMenu(): Promise<void> {
    const menu = this.page.locator(this.selectorsWRA10201.navOrderMenu);
    await this.waitForVisible(menu);
    await menu.click();
    await this.waitForListReady();
  }

  /**
   * Chờ màn hình danh sách đơn hàng hiển thị xong.
   *
   * Neo vào button "+ Tạo đơn hàng" chứ KHÔNG neo vào bảng: khi bộ lọc không ra
   * bản ghi nào thì bảng bị thay hẳn bằng div.empty (index.blade.php:44-50),
   * neo vào bảng sẽ treo ở đúng những testcase cần kiểm danh sách rỗng.
   */
  async waitForListReady(): Promise<void> {
    await this.waitForNavigation(RA102_URL_PATTERNS.ORDER_LIST);
    await this.page.waitForLoadState('networkidle');
    await this.waitForVisible(this.page.locator(this.selectorsWRA10201.createOrderButton));
  }

  /** Lấy tiêu đề màn hình (h1) */
  async getPageTitle(): Promise<string> {
    const title = this.page.locator(this.selectorsWRA10201.pageTitle);
    return (await this.getTextByLocator(title)).trim();
  }

  /** Lấy nhãn menu đang được active */
  async getActiveMenuLabel(): Promise<string> {
    const activeMenu = this.page.locator(this.selectorsWRA10201.navActiveMenu).first();
    return (await this.getTextByLocator(activeMenu)).trim();
  }

  /** Lấy placeholder của ô tìm kiếm (để đối chiếu với testcase của khách) */
  async getSearchPlaceholder(): Promise<string> {
    const input = this.page.locator(this.selectorsWRA10201.searchInput);
    await this.waitForVisible(input);
    return (await input.getAttribute('placeholder')) ?? '';
  }

  /** Nhập từ khóa vào ô tìm kiếm, CHƯA bấm Lọc */
  async enterKeyword(keyword: string): Promise<void> {
    const input = this.page.locator(this.selectorsWRA10201.searchInput);
    await this.waitForVisible(input);
    await input.fill(keyword);
  }

  /** Chọn trạng thái trong selectbox theo value, CHƯA bấm Lọc */
  async selectStatus(statusValue: string): Promise<void> {
    const select = this.page.locator(this.selectorsWRA10201.statusSelect);
    await this.waitForVisible(select);
    await select.selectOption(statusValue);
  }

  /** Nhập ô "Từ ngày" (định dạng YYYY-MM-DD), CHƯA bấm Lọc */
  async enterFromDate(isoDate: string): Promise<void> {
    const input = this.page.locator(this.selectorsWRA10201.fromDateInput);
    await this.waitForVisible(input);
    await input.fill(isoDate);
  }

  /** Nhập ô "Đến ngày" (định dạng YYYY-MM-DD), CHƯA bấm Lọc */
  async enterToDate(isoDate: string): Promise<void> {
    const input = this.page.locator(this.selectorsWRA10201.toDateInput);
    await this.waitForVisible(input);
    await input.fill(isoDate);
  }

  /** Click button "Lọc" và chờ danh sách tải lại xong */
  async clickFilter(): Promise<void> {
    const button = this.page.locator(this.selectorsWRA10201.filterButton);
    await this.waitForVisible(button);
    await this.clickAndWaitForLoad(button);
    await this.waitForVisible(this.page.locator(this.selectorsWRA10201.createOrderButton));
  }

  /** Điền một hoặc nhiều điều kiện lọc rồi bấm "Lọc" */
  async applyFilter(criteria: WRA10201FilterCriteria): Promise<void> {
    if (criteria.keyword !== undefined) await this.enterKeyword(criteria.keyword);
    if (criteria.status !== undefined) await this.selectStatus(criteria.status);
    if (criteria.from !== undefined) await this.enterFromDate(criteria.from);
    if (criteria.to !== undefined) await this.enterToDate(criteria.to);
    await this.clickFilter();
  }

  /** Lấy giá trị hiện tại của các ô lọc (kiểm điều kiện có được giữ lại sau khi lọc) */
  async getFilterValues(): Promise<Required<WRA10201FilterCriteria>> {
    return {
      keyword: await this.page.locator(this.selectorsWRA10201.searchInput).inputValue(),
      status: await this.page.locator(this.selectorsWRA10201.statusSelect).inputValue(),
      from: await this.page.locator(this.selectorsWRA10201.fromDateInput).inputValue(),
      to: await this.page.locator(this.selectorsWRA10201.toDateInput).inputValue(),
    };
  }

  /** Lấy locator của dòng đơn hàng theo mã đơn (cột 1 là td.mono > a) */
  getRowByCode(code: string): Locator {
    return this.page.locator(
      `${this.selectorsWRA10201.tableRows}:has(td.mono a:text-is("${code}"))`,
    );
  }

  /** Dòng đơn hàng theo mã đơn có hiển thị hay không */
  async isOrderRowVisible(code: string, timeout: number = 10000): Promise<boolean> {
    return await this.isLocatorVisible(this.getRowByCode(code), timeout);
  }

  /** Số dòng đang hiển thị trên danh sách (0 khi danh sách rỗng) */
  async getOrderRowCount(): Promise<number> {
    return await this.page.locator(this.selectorsWRA10201.tableRows).count();
  }

  /** Toàn bộ giá trị hiển thị của 1 dòng theo chỉ số (0-based) */
  async getRowValuesByIndex(index: number): Promise<WRA10201RowValues> {
    const row = this.page.locator(this.selectorsWRA10201.tableRows).nth(index);
    await this.waitForVisible(row);
    return await this.readRow(row);
  }

  /** Toàn bộ giá trị hiển thị của 1 dòng theo mã đơn */
  async getRowValuesByCode(code: string): Promise<WRA10201RowValues> {
    const row = this.getRowByCode(code).first();
    await this.waitForVisible(row);
    return await this.readRow(row);
  }

  /** Đọc toàn bộ các dòng đang hiển thị trên trang hiện tại */
  async getAllRowValues(): Promise<WRA10201RowValues[]> {
    const rows = this.page.locator(this.selectorsWRA10201.tableRows);
    const total = await rows.count();

    const values: WRA10201RowValues[] = [];
    for (let i = 0; i < total; i += 1) {
      values.push(await this.readRow(rows.nth(i)));
    }
    return values;
  }

  /** Danh sách đang ở trạng thái rỗng (div.empty thay cho cả bảng) */
  async isEmptyMessageVisible(): Promise<boolean> {
    return await this.isLocatorVisible(
      this.page.locator(this.selectorsWRA10201.emptyMessage),
      5000,
    );
  }

  /** Nội dung dòng đầu của khối rỗng — index.blade.php:46 */
  async getEmptyMessage(): Promise<string> {
    const empty = this.page.locator(this.selectorsWRA10201.emptyMessage);
    await this.waitForVisible(empty);
    return (await empty.innerText()).split('\n')[0].trim();
  }

  /** Bảng danh sách có đang hiển thị hay không */
  async isTableVisible(timeout: number = 5000): Promise<boolean> {
    return await this.isLocatorVisible(this.page.locator(this.selectorsWRA10201.table), timeout);
  }

  /** Button "Xóa lọc" chỉ xuất hiện khi có ít nhất 1 điều kiện lọc (index.blade.php:38) */
  async isClearFilterButtonVisible(timeout: number = 5000): Promise<boolean> {
    return await this.isLocatorVisible(
      this.page.locator(this.selectorsWRA10201.clearFilterButton),
      timeout,
    );
  }

  /** Đọc 6 ô của một dòng trong bảng */
  private async readRow(row: Locator): Promise<WRA10201RowValues> {
    const getCell = async (index: number): Promise<string> => {
      const text = await row.locator(`td:nth-child(${index})`).innerText();
      return text.trim();
    };

    const customerCell = await getCell(this.columnIndex.customer);

    return {
      code: await getCell(this.columnIndex.code),
      orderDate: await getCell(this.columnIndex.orderDate),
      // Ô "Khách hàng" có thể kèm span.sub "(đã xóa)" khi khách đã bị xóa mềm
      // (index.blade.php:74-76) -> chỉ lấy phần tên, bỏ hậu tố đó.
      customer: customerCell.split('\n')[0].replace('(đã xóa)', '').trim(),
      itemsCount: await getCell(this.columnIndex.itemsCount),
      status: await getCell(this.columnIndex.status),
      totalAmount: await getCell(this.columnIndex.totalAmount),
    };
  }

  /** Click 1 element gây điều hướng (submit form / click link) và chờ trang mới load xong */
  private async clickAndWaitForLoad(locator: Locator, timeout: number = 15000): Promise<void> {
    const loaded = this.page.waitForEvent('load', { timeout }).catch(() => null);
    await locator.click();
    await loaded;
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Chờ và kiểm tra 1 element có hiển thị hay không.
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
