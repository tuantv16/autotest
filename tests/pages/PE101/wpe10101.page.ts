/**
 * Page object màn WPE10101 — Danh sách / tìm kiếm / lọc sản phẩm (PetCare Store).
 *
 * Nguồn markup:
 *   - apps/pets/frontend/src/App.jsx:126-250            (khung trang, lưới, phân trang, toast)
 *   - apps/pets/frontend/src/components/Filters.jsx     (ô tìm kiếm, sắp xếp, danh mục)
 *   - apps/pets/frontend/src/components/ProductCard.jsx (thẻ sản phẩm)
 *
 * Neo bám: **chỉ `data-testid`** — app phủ 56 chỗ, 0 chỗ dùng `name=`/`aria-label`
 * (hồ sơ dự án §2). Selector gom trong `PE101_TESTID`, mỗi cái có `file:line`.
 *
 * KHÔNG có assertion nào trong file này (hợp đồng engine, CLAUDE.md §2.7).
 *
 * Ba đặc thù SPA phải nhớ khi dùng page object này:
 *   1. App **không có router** — mọi màn hình dùng chung một URL. `open()` là lần
 *      điều hướng duy nhất; đổi bộ lọc chỉ đổi state (adapter react-spa §5).
 *   2. Ô tìm kiếm **debounce 350ms** → mọi hàm đổi bộ lọc đều chờ vòng request
 *      `GET /api/products` tương ứng, không chờ theo thời gian.
 *   3. `product-grid` / `no-products` / `loading-skeleton` là **3 nhánh loại trừ nhau**
 *      của cùng một ternary (App.jsx:193-212) — element không tồn tại chứ không bị ẩn.
 */

import { Locator, Page, Response } from '@playwright/test';
import { BasePage } from '../base.page';
import {
  CART_STORAGE_KEY,
  PE101_API,
  PE101_TESTID,
  getPE101BaseUrl,
} from './const/const-pe101';

/** Bộ lọc mà màn hình này hỗ trợ. Nguồn: frontend/src/App.jsx:8 (hằng DEFAULT_FILTERS). */
export interface ProductFilter {
  search: string;
  category: string;
  petType: '' | 'dog' | 'cat';
  sort: 'newest' | 'price_asc' | 'price_desc' | 'rating_desc' | 'name_asc';
}

export class WPE10101Page extends BasePage {
  constructor(page: Page, baseUrl: string = getPE101BaseUrl()) {
    super(page, baseUrl);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Locator — phần tử unique trên trang
  // ───────────────────────────────────────────────────────────────────────────

  /** Ô tìm kiếm. Nguồn: components/Filters.jsx:23-30 */
  get searchInput(): Locator {
    return this.byTestId(PE101_TESTID.searchInput);
  }

  /** Selectbox "Sắp xếp". Nguồn: components/Filters.jsx:35-44 */
  get sortSelect(): Locator {
    return this.byTestId(PE101_TESTID.sortSelect);
  }

  /** Selectbox "Loại thú cưng". Nguồn: components/Filters.jsx:49-58 */
  get petTypeSelect(): Locator {
    return this.byTestId(PE101_TESTID.petTypeSelect);
  }

  /** Nút "Xoá bộ lọc". Nguồn: components/Filters.jsx:61-63 */
  get resetFiltersButton(): Locator {
    return this.byTestId(PE101_TESTID.resetFilters);
  }

  /** Dòng "Tìm thấy N sản phẩm". Nguồn: components/Filters.jsx:88-90 */
  get resultCount(): Locator {
    return this.byTestId(PE101_TESTID.resultCount);
  }

  /** Lưới sản phẩm — CHỈ tồn tại khi có kết quả. Nguồn: App.jsx:202 */
  get productGrid(): Locator {
    return this.byTestId(PE101_TESTID.productGrid);
  }

  /** Thông báo rỗng — CHỈ tồn tại khi không có kết quả. Nguồn: App.jsx:198 */
  get noProducts(): Locator {
    return this.byTestId(PE101_TESTID.noProducts);
  }

  /** Thông báo lỗi tải danh sách. Nguồn: App.jsx:188 */
  get loadError(): Locator {
    return this.byTestId(PE101_TESTID.loadError);
  }

  /** Thanh phân trang — CHỈ tồn tại khi totalPages > 1. Nguồn: App.jsx:215 */
  get pagination(): Locator {
    return this.byTestId(PE101_TESTID.pagination);
  }

  /** Nút "← Trước". Nguồn: App.jsx:217 */
  get prevPageButton(): Locator {
    return this.byTestId(PE101_TESTID.prevPage);
  }

  /** Nút "Sau →". Nguồn: App.jsx:223 */
  get nextPageButton(): Locator {
    return this.byTestId(PE101_TESTID.nextPage);
  }

  /** Dòng "Trang X / Y". Nguồn: App.jsx:221 */
  get pageInfo(): Locator {
    return this.byTestId(PE101_TESTID.pageInfo);
  }

  /** Badge số lượng trong giỏ, cạnh nút mở giỏ. Nguồn: App.jsx:155 */
  get cartCount(): Locator {
    return this.byTestId(PE101_TESTID.cartCount);
  }

  /** Nút mở giỏ hàng. Nguồn: App.jsx:151 */
  get openCartButton(): Locator {
    return this.byTestId(PE101_TESTID.openCart);
  }

  /** Toast — tự tắt sau 2500ms (App.jsx:66-70). Nguồn: App.jsx:249 */
  get toast(): Locator {
    return this.byTestId(PE101_TESTID.toast);
  }

  /** Trạng thái API ở header. Nguồn: App.jsx:139-146 */
  get apiStatus(): Locator {
    return this.byTestId(PE101_TESTID.apiStatus);
  }

  /** Số mặt hàng ở khối hero. Nguồn: App.jsx:169 */
  get heroTotalProducts(): Locator {
    return this.byTestId(PE101_TESTID.heroTotalProducts);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Locator — phần tử trong danh sách, BẮT BUỘC scope theo khóa nghiệp vụ
  //
  // `product-card` và mọi testid bên trong nó render trong .map() (App.jsx:203)
  // nên KHÔNG unique. Truy cập bằng SKU (`data-sku`) thay vì `.nth(i)`, vì thứ tự
  // đổi theo bộ lọc `sort` — có 5 kiểu sắp xếp (products.js:6-12).
  // ───────────────────────────────────────────────────────────────────────────

  /** Tất cả thẻ sản phẩm đang hiển thị. Nguồn: components/ProductCard.jsx:10 */
  get productCards(): Locator {
    return this.byTestId(PE101_TESTID.productCard);
  }

  /**
   * Một thẻ sản phẩm theo SKU.
   * Nguồn: components/ProductCard.jsx:10 — `data-sku={product.sku}`
   */
  productCard(sku: string): Locator {
    return this.page.locator(
      `[data-testid="${PE101_TESTID.productCard}"][data-sku="${sku}"]`,
    );
  }

  /** Tên sản phẩm trong thẻ. Nguồn: components/ProductCard.jsx:25 */
  productName(sku: string): Locator {
    return this.productCard(sku).getByTestId(PE101_TESTID.productName);
  }

  /** Giá sản phẩm trong thẻ. Nguồn: components/ProductCard.jsx:36 */
  productPrice(sku: string): Locator {
    return this.productCard(sku).getByTestId(PE101_TESTID.productPrice);
  }

  /** Khối đánh giá + SKU trong thẻ. Nguồn: components/ProductCard.jsx:28-32 */
  productRating(sku: string): Locator {
    return this.productCard(sku).getByTestId(PE101_TESTID.productRating);
  }

  /** Nút "Thêm vào giỏ" của một sản phẩm. Nguồn: components/ProductCard.jsx:39-50 */
  addToCartButton(sku: string): Locator {
    return this.productCard(sku).getByTestId(PE101_TESTID.addToCart);
  }

  /** Badge số lượng đã có trong giỏ, hiện trên nút. Nguồn: components/ProductCard.jsx:48 */
  inCartCount(sku: string): Locator {
    return this.productCard(sku).getByTestId(PE101_TESTID.inCartCount);
  }

  /**
   * Chip một danh mục.
   * Nguồn: components/Filters.jsx:80 — `data-testid={`category-${cat.slug}`}`.
   * Slug seed: grooming, feeding, toys, health, accessory, housing (01-schema.sql:70-76).
   */
  categoryChip(slug: string): Locator {
    return this.byTestId(`category-${slug}`);
  }

  /** Chip "Tất cả danh mục". Nguồn: components/Filters.jsx:70 */
  get categoryAllChip(): Locator {
    return this.byTestId(PE101_TESTID.categoryAll);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Thao tác
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Mở màn hình.
   *
   * Xóa giỏ trong localStorage TRƯỚC khi điều hướng — `addInitScript` chỉ có tác dụng
   * nếu đăng ký trước `goto` đầu tiên (hồ sơ dự án §3.8). Không xóa thì giỏ của test
   * trước còn lại và badge số lượng sai.
   *
   * Chờ tới khi vòng `GET /api/products` đầu tiên trả về, vì `loading = true` lúc mount
   * (App.jsx:25) nên lưới chưa có trong DOM ngay sau `goto`.
   */
  async open(): Promise<void> {
    await this.page.addInitScript((key) => {
      window.localStorage.removeItem(key);
    }, CART_STORAGE_KEY);

    const firstLoad = this.waitForProducts();
    await this.goto('');
    await firstLoad;
  }

  /**
   * Chờ một vòng `GET /api/products` hoàn tất.
   *
   * Dùng cái này thay cho `waitForTimeout` ở MỌI thao tác đổi bộ lọc: ô tìm kiếm
   * debounce 350ms (App.jsx:62) nên chờ theo thời gian là vừa chậm vừa hay flaky.
   */
  waitForProducts(): Promise<Response> {
    return this.page.waitForResponse(
      (res) => PE101_API.productsRegex.test(res.url()) && res.request().method() === 'GET',
    );
  }

  /**
   * Nhập từ khóa vào ô tìm kiếm rồi chờ kết quả về.
   *
   * `fill` thay vì `type` là có chủ ý: app debounce theo giá trị cuối cùng nên gõ từng
   * ký tự chỉ tạo thêm request rác, không kiểm được thêm gì.
   *
   * @param keyword từ khóa; truyền chuỗi rỗng để xóa từ khóa
   */
  async search(keyword: string): Promise<void> {
    const done = this.waitForProducts();
    await this.searchInput.fill(keyword);
    await done;
  }

  /** Chọn kiểu sắp xếp rồi chờ kết quả về. Nguồn: components/Filters.jsx:35-44 */
  async selectSort(value: ProductFilter['sort']): Promise<void> {
    const done = this.waitForProducts();
    await this.sortSelect.selectOption(value);
    await done;
  }

  /** Chọn loại thú cưng rồi chờ kết quả về. Nguồn: components/Filters.jsx:49-58 */
  async selectPetType(value: ProductFilter['petType']): Promise<void> {
    const done = this.waitForProducts();
    await this.petTypeSelect.selectOption(value);
    await done;
  }

  /** Click chip danh mục theo slug rồi chờ kết quả về. */
  async selectCategory(slug: string): Promise<void> {
    const done = this.waitForProducts();
    await this.categoryChip(slug).click();
    await done;
  }

  /** Click "Xoá bộ lọc" rồi chờ kết quả về. Nguồn: components/Filters.jsx:61-63 */
  async resetFilters(): Promise<void> {
    const done = this.waitForProducts();
    await this.resetFiltersButton.click();
    await done;
  }

  /** Sang trang sau rồi chờ kết quả về. Nguồn: App.jsx:222-226 */
  async goToNextPage(): Promise<void> {
    const done = this.waitForProducts();
    await this.nextPageButton.click();
    await done;
  }

  /** Về trang trước rồi chờ kết quả về. Nguồn: App.jsx:216-220 */
  async goToPrevPage(): Promise<void> {
    const done = this.waitForProducts();
    await this.prevPageButton.click();
    await done;
  }

  /**
   * Thêm một sản phẩm vào giỏ.
   *
   * Thao tác này chỉ đổi state React + localStorage, KHÔNG gọi API (App.jsx:75-95),
   * nên không chờ request. Toast xuất hiện ngay và tự tắt sau 2500ms.
   */
  async addToCart(sku: string): Promise<void> {
    await this.addToCartButton(sku).click();
  }

  /**
   * Đọc con số trong dòng "Tìm thấy N sản phẩm".
   *
   * Trả về number để spec assert quan hệ (`>=`) thay vì so chuỗi tuyệt đối — tổng số
   * sản phẩm là số ĐỘNG khi suite chạy song song và có spec tự seed dữ liệu.
   * Đây là đọc một lần, KHÔNG tự chờ: spec phải bọc trong `expect.poll(...)`.
   * Nguồn: components/Filters.jsx:88-90
   */
  async resultTotal(): Promise<number> {
    const text = (await this.resultCount.textContent()) || '';
    return Number(text.match(/\d+/)?.[0] ?? 0);
  }

  /** Đọc số lượng SKU đang hiển thị trên lưới, phục vụ assertion ở tầng spec. */
  async listedSkus(): Promise<string[]> {
    return this.productCards.evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute('data-sku') || ''),
    );
  }

  /**
   * Đọc tên sản phẩm đang hiển thị, **theo đúng thứ tự trên lưới**.
   *
   * Dùng cho test sắp xếp: `productName(sku)` chỉ trả lời "sản phẩm X tên gì", không trả
   * lời được "sản phẩm nào đứng trước". Ở đây thứ tự chính là thứ cần kiểm nên đọc theo
   * vị trí là đúng, khác với các test khác phải scope theo `data-sku`.
   *
   * Nguồn: components/ProductCard.jsx:25 (`data-testid="product-name"` trong .map()).
   */
  async listedNames(): Promise<string[]> {
    return this.productCards.evaluateAll((nodes) =>
      nodes.map((n) => n.querySelector('[data-testid="product-name"]')?.textContent?.trim() || ''),
    );
  }

  /**
   * Đọc giá (dạng số) của các sản phẩm đang hiển thị, theo đúng thứ tự trên lưới.
   *
   * Bỏ mọi ký tự không phải chữ số — chuỗi hiển thị là `620.000 ₫` với dấu chấm phân cách
   * nghìn và U+00A0 trước ₫ (api.js:33-35), so chuỗi trực tiếp rất dễ sai.
   *
   * Nguồn: components/ProductCard.jsx:36
   */
  async listedPrices(): Promise<number[]> {
    const raw = await this.productCards.evaluateAll((nodes) =>
      nodes.map((n) => n.querySelector('[data-testid="product-price"]')?.textContent || ''),
    );
    return raw.map((text) => Number(text.replace(/\D/g, '')));
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Nội bộ
  // ───────────────────────────────────────────────────────────────────────────

  /** Rút gọn `getByTestId` — app chỉ dùng neo bám `data-testid` (hồ sơ dự án §2). */
  private byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }
}
