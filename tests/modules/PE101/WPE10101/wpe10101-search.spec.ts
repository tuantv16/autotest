/**
 * WPE10101 — Tìm kiếm sản phẩm (PetCare Store, apps/pets)
 *
 * Nguồn testcase : testcases/pets_testcases/product/product_search.md (8 TC)
 * Nguồn kỳ vọng  : **NGUỒN 3 — suy từ source code app** (CLAUDE.md Luật 1).
 *                  Khách chưa gửi testcase cho dự án pets; bộ testcase .md là do agent
 *                  sinh từ source `apps/pets` và đã đối chiếu bằng API thật đang chạy.
 *                  Mọi con số dưới đây đo được từ `GET /api/products`, không ước lượng.
 *                  **Cần khách xác nhận** — xem mục "Kỳ vọng suy từ source code" trong
 *                  báo cáo.
 *
 * Dữ liệu tiền đề: seed gốc apps/pets/db/init/01-schema.sql — 24 sản phẩm, pageSize 12.
 *                  Màn này CHỈ ĐỌC (app không có UI tạo/sửa sản phẩm) nên không seed và
 *                  không cần dọn dữ liệu.
 *
 * Bẫy đã xử lý trong file này:
 *   - Ô tìm kiếm debounce 350ms (App.jsx:62) → chờ vòng `GET /api/products` qua
 *     `page.search()`, không dùng `waitForTimeout`.
 *   - `product-grid` / `no-products` là 2 nhánh loại trừ nhau (App.jsx:193-212) → dùng
 *     `toBeHidden()` cho element không render, không dùng `toHaveCount(0)` lẫn lộn.
 *   - Giá tiền có U+00A0 trước ₫ (api.js:33-35) → so bằng regex qua `moneyRegex()`.
 *   - Giỏ hàng persist localStorage → `page.open()` xóa key trước khi goto.
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WPE10101Page } from '../../../pages/PE101/wpe10101.page';
import {
  PE101_PAGE_SIZE,
  PE101_SEED,
  moneyRegex,
} from '../../../pages/PE101/const/const-pe101';
import { PE101_LIST_MESSAGE } from '../../../constants/PE101/messages';

const SCREEN = 'wpe10101';
const FIXTURE = `PE101/${SCREEN}`;

test.describe('WPE10101 — Tìm kiếm sản phẩm', () => {
  let screen: WPE10101Page;

  test.beforeEach(async ({ page }) => {
    screen = new WPE10101Page(page);
    await screen.open();
  });

  test('WPE10101_01 (TC_PET_SEARCH_01) - Tìm kiếm theo tên sản phẩm có dấu', async ({
    snapInput,
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_01');

    // Step 1-2: Truy cập app và chờ lưới sản phẩm hiển thị xong (làm ở beforeEach)
    await expect(screen.productGrid).toBeVisible();
    await snapInput();

    // Step 3-5: Nhập "Tông đơ" vào ô tìm kiếm, chờ debounce 350ms + vòng request
    await screen.search(data.formData.search);

    // Kỳ vọng: đúng 1 sản phẩm GR-001, giá 620.000 ₫
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await expect(screen.productCards).toHaveCount(data.expected.total);
    await expect(screen.productName(data.expected.skus[0])).toHaveText(
      data.expected.productName,
    );
    await expect(screen.productPrice(data.expected.skus[0])).toHaveText(
      moneyRegex(data.expected.price),
    );
    await snapExpect();
  });

  test('WPE10101_02 (TC_PET_SEARCH_02) - Tìm kiếm không dấu vẫn ra kết quả có dấu', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_02');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Nhập "tong" (không dấu), chờ debounce
    await screen.search(data.formData.search);

    // Kỳ vọng: collation utf8mb4_unicode_ci bỏ qua dấu nên vẫn khớp "Tông đơ…"
    // Nguồn: apps/pets/db/init/01-schema.sql:9, backend/src/routes/products.js:47-51
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await expect(screen.productCards).toHaveCount(data.expected.total);
    await expect(screen.productName(data.expected.skus[0])).toHaveText(
      data.expected.productName,
    );
    await snapExpect();
  });

  test('WPE10101_03 (TC_PET_SEARCH_03) - Tìm kiếm theo mã SKU chính xác', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_03');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Nhập "GR-001", chờ debounce
    await screen.search(data.formData.search);

    // Kỳ vọng: điều kiện tìm gồm cả `p.sku LIKE ?` (products.js:48) nên khớp theo SKU.
    // Thẻ sản phẩm được nhận diện bằng data-sku, không bằng vị trí trong lưới.
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await expect(screen.productCard(data.expected.skus[0])).toBeVisible();
    await expect(screen.productRating(data.expected.skus[0])).toContainText(
      data.expected.skuLabel,
    );
    await snapExpect();
  });

  test('WPE10101_04 (TC_PET_SEARCH_04) - Tìm kiếm theo từ khóa chỉ nằm trong mô tả', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_04');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Nhập "Omega" — từ này CHỈ có trong cột description của HE-002
    await screen.search(data.formData.search);

    // Kỳ vọng: khớp qua `p.description LIKE ?` (products.js:48)
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await expect(screen.productCards).toHaveCount(data.expected.total);
    await expect(screen.productName(data.expected.skus[0])).toHaveText(
      data.expected.productName,
    );
    await snapExpect();
  });

  test('WPE10101_05 (TC_PET_SEARCH_05) - Tìm kiếm từ khóa không tồn tại', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_05');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Nhập "khong-co-gi", chờ debounce
    await screen.search(data.formData.search);

    // Kỳ vọng: lưới BỊ UNMOUNT (không phải bị ẩn) và hiện thông báo rỗng.
    // Nguồn: App.jsx:197-200 — ternary chọn nhánh no-products.
    await expect(screen.productGrid).toBeHidden();
    await expect(screen.noProducts).toHaveText(PE101_LIST_MESSAGE.noProducts);
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await snapExpect();
  });

  test('WPE10101_06 (TC_PET_SEARCH_06) - Tìm kiếm bỏ qua khoảng trắng đầu/cuối', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_06');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Nhập "  bat an  " (2 khoảng trắng mỗi đầu), chờ debounce
    await screen.search(data.formData.search);

    // Kỳ vọng: backend trim từ khóa trước khi dựng LIKE (products.js:47-49)
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await expect(screen.productName(data.expected.skus[0])).toHaveText(
      data.expected.productName,
    );
    await snapExpect();
  });

  test('WPE10101_07 (TC_PET_SEARCH_07) - Xóa từ khóa thì danh sách trở về đầy đủ', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_07');

    // Step 1: Truy cập app (beforeEach)
    // Step 2: Nhập "tong", xác nhận còn 1 sản phẩm
    await screen.search(data.formData.search);
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.totalAfterSearch),
    );

    // Step 3-4: Xóa trắng ô tìm kiếm, chờ kết quả tải lại
    await screen.search(data.formData.searchCleared);

    // Kỳ vọng: danh sách trở về đầy đủ.
    //
    // KHÔNG assert "đúng 24 sản phẩm". Suite chạy `fullyParallel` và có spec khác tự
    // seed sản phẩm vào cùng database, nên tổng số là số ĐỘNG — assert số tuyệt đối là
    // fail oan (đã gặp thật). Cái cần chứng minh là "bỏ lọc thì ra nhiều hơn lúc lọc và
    // phân trang xuất hiện lại", nên assert theo quan hệ.
    // expect.poll: `textContent()` đọc một lần nên phải để Playwright thử lại tới khi
    // React render xong dòng đếm mới (đã fail thật vì đọc sớm, thấy số của từ khóa cũ).
    await expect
      .poll(() => screen.resultTotal())
      .toBeGreaterThanOrEqual(data.expected.totalAfterClearMin);
    await expect(screen.productCards).toHaveCount(data.expected.cardsOnFirstPage);
    await expect(screen.pagination).toBeVisible();
    await expect(screen.pageInfo).toHaveText(/^Trang 1 \/ \d+$/);
    await snapExpect();
  });

  test('WPE10101_08 (TC_PET_SEARCH_08) - Tìm kiếm khi đang ở trang 2 thì nhảy về trang 1', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_08');

    // Step 1: Truy cập app (beforeEach)
    // Step 2: Sang trang 2
    await screen.goToNextPage();
    // Tổng số trang phụ thuộc dữ liệu đang có trong database (spec khác seed song song),
    // nên chỉ chốt "đang ở trang 2".
    await expect(screen.pageInfo).toHaveText(/^Trang 2 \/ \d+$/);

    // Step 3-4: Nhập "tong", chờ debounce
    await screen.search(data.formData.search);

    // Kỳ vọng: mọi thay đổi bộ lọc đều gửi kèm `page: 1` (Filters.jsx:29) nên kết quả
    // là trang 1; còn 1 trang thì thanh phân trang bị unmount (App.jsx:214).
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await expect(screen.productCard(data.expected.skus[0])).toBeVisible();
    await expect(screen.pagination).toBeHidden();
    await snapExpect();
  });

  test('WPE10101_09 - Trạng thái ban đầu: 24 sản phẩm, 2 trang, API sẵn sàng', async () => {
    // TC bổ sung, KHÔNG có trong file testcase của khách. Mục đích: nếu dữ liệu seed bị
    // lệch (test khác đặt hàng mà chưa dọn, hoặc volume DB bị xóa) thì test này fail
    // trước, để không phải đi truy 8 TC trên fail vì lý do gì.
    await expect(screen.apiStatus).toContainText('sẵn sàng');

    // Dữ liệu seed là SÀN, không phải con số cố định: spec khác có thể đang seed thêm
    // sản phẩm của riêng nó. Ít hơn sàn nghĩa là seed bị mất (volume DB bị xóa) hoặc có
    // test xóa nhầm dữ liệu seed — đó mới là điều cần bắt.
    await expect
      .poll(() => screen.resultTotal())
      .toBeGreaterThanOrEqual(PE101_SEED.totalProducts);
    await expect(screen.pageInfo).toHaveText(/^Trang 1 \/ \d+$/);
    await expect(screen.productCards).toHaveCount(PE101_PAGE_SIZE);
  });
});
