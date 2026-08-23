/**
 * WPE10101 — Sắp xếp danh sách sản phẩm (PetCare Store, apps/pets)
 *
 * Nguồn testcase : testcases/pets_testcases/product/product_sort.md (6 TC)
 * Nguồn kỳ vọng  : **NGUỒN 3 — suy từ source code app** (CLAUDE.md Luật 1).
 *                  Màn này chưa có spec nghiệp vụ. Cột `Result` của file testcase là do
 *                  agent sinh từ `apps/pets` và **đã đối chiếu bằng API thật đang chạy**
 *                  (`GET /api/products?sort=…`). Mọi thứ tự dưới đây là giá trị ĐO ĐƯỢC.
 *                  **Cần khách xác nhận** — xem mục "Kỳ vọng suy từ source code" trong
 *                  báo cáo.
 *
 * Dữ liệu tiền đề: seed gốc apps/pets/db/init/01-schema.sql — 24 sản phẩm, pageSize 12
 *                  (2 trang). Bộ này CHỈ ĐỌC: không seed, không ghi, không cần cleanup.
 *
 * Bẫy đã xử lý trong file này:
 *   - Đổi `sort` vẫn tạo một vòng `GET /api/products` dù ô tìm kiếm rỗng (App.jsx:62 —
 *     delay 0ms nhưng vẫn là setTimeout) → chờ qua `screen.selectSort()`, không
 *     `waitForTimeout`.
 *   - `rating_desc` KHÔNG có tiêu chí phụ (products.js:10) — GR-001 và TO-003 cùng 4.8 nên
 *     thứ tự giữa hai cái là không xác định. TC_02 vì vậy **chỉ assert vị trí số 1**
 *     (FE-003, 4.9 duy nhất). Xem `unresolved` trong .work/WPE10101/elements.json.
 *   - Thanh phân trang chỉ render khi `totalPages > 1` (App.jsx:214) → lọc còn 1 trang thì
 *     `pagination` biến mất khỏi DOM, dùng `toBeHidden()` chứ không đọc `page-info`.
 *   - Nút phân trang dùng thuộc tính `disabled` thật (App.jsx:218,224) → assert
 *     `toBeDisabled()`, click vào sẽ treo tới timeout.
 *   - Test THỨ TỰ nên đọc theo vị trí (`listedSkus()` / `listedNames()`), khác các bộ khác
 *     vốn phải scope theo `data-sku`.
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WPE10101Page } from '../../../pages/PE101/wpe10101.page';
import {
  PE101_CATEGORY,
  PE101_PAGE_SIZE,
  PE101_SORT_OPTION,
} from '../../../pages/PE101/const/const-pe101';
import { PE101_LIST_MESSAGE } from '../../../constants/PE101/messages';

const SCREEN = 'wpe10101-sort';
const FIXTURE = `PE101/${SCREEN}`;

test.describe('WPE10101 — Sắp xếp danh sách sản phẩm', () => {
  let screen: WPE10101Page;

  test.beforeEach(async ({ page }) => {
    screen = new WPE10101Page(page);
    await screen.open();
  });

  test('WPE10101_SO01 (TC_PET_SORT_01) - Mặc định sắp xếp theo mới nhất', async ({
    snapInput,
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_01');

    // Step 1-2: Truy cập app và chờ lưới sản phẩm hiển thị xong (làm ở beforeEach)
    await expect(screen.productGrid).toBeVisible();
    await snapInput();

    // Step 3: Đọc giá trị đang chọn của ô Sắp xếp
    // Kỳ vọng: 'newest' — DEFAULT_FILTERS (App.jsx:8), option "Mới nhất" (Filters.jsx:4)
    await expect(screen.sortSelect).toHaveValue(data.formData.sort);

    // Step 4: Đọc thẻ sản phẩm đầu tiên trong lưới
    // Kỳ vọng suy từ source: newest = 'created_at DESC, id DESC' (products.js:7). Seed chèn
    // 24 dòng trong MỘT câu INSERT (01-schema.sql:78-102) nên created_at bằng nhau hết →
    // thực chất sắp theo id DESC, đứng đầu là sản phẩm cuối bảng seed (HO-004).
    const skus = await screen.listedSkus();
    expect(skus[0]).toBe(data.expected.firstSku);
    expect(skus[1]).toBe(data.expected.secondSku);
    await expect(screen.productName(data.expected.firstSku)).toHaveText(
      data.expected.firstName,
    );
    await snapExpect();
  });

  test('WPE10101_SO02 (TC_PET_SORT_02) - Sắp xếp theo đánh giá cao nhất', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_02');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Chọn "Đánh giá cao nhất" và chờ lưới tải lại
    await screen.selectSort(PE101_SORT_OPTION.ratingDesc);

    // Step 4: Đọc thẻ sản phẩm đầu tiên
    // CHỈ assert vị trí 1. products.js:10 là `ORDER BY p.rating DESC` không tiêu chí phụ →
    // GR-001 và TO-003 cùng 4.8, vị trí 2-3 KHÔNG xác định, assert vào là test flaky.
    // FE-003 điểm 4.9 là giá trị lớn nhất duy nhất nên vị trí 1 mới ổn định.
    const skus = await screen.listedSkus();
    expect(skus[0]).toBe(data.expected.firstSku);
    await expect(screen.productName(data.expected.firstSku)).toHaveText(
      data.expected.firstName,
    );
    await expect(screen.productRating(data.expected.firstSku)).toContainText(
      data.expected.firstRating,
    );

    // Bộ lọc không đổi tổng số, chỉ đổi thứ tự
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    await snapExpect();
  });

  test('WPE10101_SO03 (TC_PET_SORT_03) - Sắp xếp theo tên A-Z bỏ qua dấu tiếng Việt', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_03');

    // Step 1: Truy cập app (beforeEach)
    // Step 2-3: Chọn "Tên A-Z" và chờ lưới tải lại
    await screen.selectSort(PE101_SORT_OPTION.nameAsc);

    // Step 4: Đọc tên của 4 thẻ đầu tiên theo thứ tự
    // Kỳ vọng suy từ source: `ORDER BY p.name ASC` (products.js:11) chạy trên collation
    // utf8mb4_unicode_ci (01-schema.sql:9) — collation này BỎ DẤU khi so sánh, nên so
    // "balo" < "ban" < "bat" < "binh". Không sản phẩm nào tên bắt đầu bằng A.
    const names = await screen.listedNames();
    expect(names.slice(0, 4)).toEqual(data.expected.firstNames);

    const skus = await screen.listedSkus();
    expect(skus.slice(0, 4)).toEqual(data.expected.firstSkus);
    await snapExpect();
  });

  test('WPE10101_SO04 (TC_PET_SORT_04) - Đổi sắp xếp khi đang ở trang 2 thì quay về trang 1', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_04');

    // Step 1: Truy cập app (beforeEach)
    // Step 2: Sang trang 2 và xác nhận đang ở trang 2
    await screen.goToNextPage();
    await expect(screen.pageInfo).toHaveText(
      PE101_LIST_MESSAGE.pageInfo(data.expected.pageBefore, data.expected.totalPages),
    );

    // Step 3-4: Chọn "Tên A-Z" và chờ lưới tải lại
    await screen.selectSort(PE101_SORT_OPTION.nameAsc);

    // Kỳ vọng: quay về trang 1. Nguồn: Filters.jsx:39 — onChange gửi kèm `page: 1`.
    await expect(screen.pageInfo).toHaveText(
      PE101_LIST_MESSAGE.pageInfo(data.expected.pageAfter, data.expected.totalPages),
    );
    // Nút "← Trước" disabled khi page <= 1 (App.jsx:218) — assert trạng thái, không click.
    await expect(screen.prevPageButton).toBeDisabled();

    const skus = await screen.listedSkus();
    expect(skus[0]).toBe(data.expected.firstSku);
    await snapExpect();
  });

  test('WPE10101_SO05 (TC_PET_SORT_05) - Sắp xếp giữ nguyên khi chuyển sang trang 2', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_05');

    // Step 1: Truy cập app (beforeEach)
    // Step 2: Chọn "Tên A-Z" và chờ lưới tải lại
    await screen.selectSort(PE101_SORT_OPTION.nameAsc);

    // Step 3: Xác nhận thẻ cuối trang 1
    const page1Skus = await screen.listedSkus();
    expect(page1Skus).toHaveLength(PE101_PAGE_SIZE);
    expect(page1Skus[page1Skus.length - 1]).toBe(data.expected.lastSkuPage1);
    await expect(screen.productName(data.expected.lastSkuPage1)).toHaveText(
      data.expected.lastNamePage1,
    );

    // Step 4-5: Sang trang 2 và chờ lưới tải lại
    await screen.goToNextPage();

    // Kỳ vọng: trang 2 NỐI TIẾP thứ tự A-Z của trang 1, không quay về mặc định.
    // Nguồn: App.jsx:225 — nút Sau chỉ đổi `page`, giữ nguyên `sort`.
    await expect(screen.pageInfo).toHaveText(PE101_LIST_MESSAGE.pageInfo(2, data.expected.totalPages));
    const page2Skus = await screen.listedSkus();
    expect(page2Skus).toHaveLength(data.expected.cardsOnPage2);
    expect(page2Skus[0]).toBe(data.expected.firstSkuPage2);
    await expect(screen.productName(data.expected.firstSkuPage2)).toHaveText(
      data.expected.firstNamePage2,
    );
    await snapExpect();
  });

  test('WPE10101_SO06 (TC_PET_SORT_06) - Kết hợp sắp xếp giá thấp đến cao với lọc danh mục', async ({
    snapExpect,
  }) => {
    const data = loadTestData(FIXTURE, SCREEN, 'TC_06');

    // Step 1: Truy cập app (beforeEach)
    // Step 2: Click chip danh mục "Đồ chơi vận động"
    await screen.selectCategory(PE101_CATEGORY.toys);

    // Step 3-4: Chọn "Giá thấp đến cao" và chờ lưới tải lại
    await screen.selectSort(PE101_SORT_OPTION.priceAsc);

    // Kỳ vọng: 4 sản phẩm danh mục toys, xếp theo giá tăng dần (products.js:8)
    await expect(screen.resultCount).toHaveText(
      PE101_LIST_MESSAGE.resultCount(data.expected.total),
    );
    // Chỉ còn 1 trang → thanh phân trang KHÔNG render (App.jsx:214), không phải bị ẩn
    await expect(screen.pagination).toBeHidden();

    expect(await screen.listedSkus()).toEqual(data.expected.skusInOrder);
    expect(await screen.listedPrices()).toEqual(data.expected.pricesInOrder);
    await snapExpect();
  });
});
