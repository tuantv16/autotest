/**
 * WPE10101 — Tìm kiếm trên dữ liệu do CHÍNH TEST tạo ra (PetCare Store)
 *
 * Khác gì `wpe10101-search.spec.ts`: file kia assert trên dữ liệu seed dùng chung
 * ("phải có đúng 24 sản phẩm"), nên ai thêm một sản phẩm vào database là fail oan. File
 * này tự dựng sản phẩm của riêng nó, chỉ assert trên SKU đó, rồi tự xóa. Chạy được bất
 * kể database đang có 24 hay 2400 sản phẩm.
 *
 * Vòng đời dữ liệu:
 *   beforeEach   → testData.insert('products', …)  tạo 1 sản phẩm SKU FIXT-PET-<unique>
 *   test         → Step 1..N + expect              chỉ assert trên SKU vừa tạo
 *   teardown     → tự động                          xóa đúng row đó, không quét cả bảng
 *
 * KHÔNG có `afterEach` dọn dữ liệu: `testData` là fixture (tests/support/data-test.ts),
 * teardown của nó chạy kể cả khi test fail, timeout, hoặc `beforeEach` chết giữa lúc seed
 * — trường hợp mà `afterEach` bỏ sót.
 *
 * Cơ chế dọn là **động theo cấu hình**, không viết cứng cho dự án nào:
 * `tests/support/test-data-seeder.ts` đọc `project.config.json → advanced.database`
 * (`tableKeys`, `cleanupOrder`, `testDataPrefixes`, `protectedPatterns`, `beforeDelete`).
 *
 * Nguồn kỳ vọng: **NGUỒN 3 — suy từ source code app** (CLAUDE.md Luật 1).
 * Điều kiện tìm kiếm: `p.name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?`
 * (apps/pets/backend/src/routes/products.js:47-51).
 */

import { test, expect } from '../../../support/data-test';
import { WPE10101Page } from '../../../pages/PE101/wpe10101.page';
import { moneyRegex } from '../../../pages/PE101/const/const-pe101';
import { PE101_LIST_MESSAGE } from '../../../constants/PE101/messages';

/** Danh mục "Đồ chơi vận động" — id 3 trong seed (db/init/01-schema.sql:70-76). */
const CATEGORY_TOYS_ID = 3;

test.describe('WPE10101 — Tìm kiếm trên dữ liệu test tự dựng', () => {
  let screen: WPE10101Page;
  let sku: string;
  /**
   * Tên sản phẩm phải UNIQUE theo từng test, không chỉ SKU.
   * `playwright.config.ts` bật `fullyParallel` + 8 worker, nên các test trong file này
   * seed đồng thời. Dùng tên cố định thì test "tìm theo tên" ra 2 kết quả và fail oan —
   * đã gặp thật khi chạy lần đầu. Nhét mã unique vào tên là hết.
   */
  let productName: string;
  const price = 199000;
  const stock = 7;

  test.beforeEach(async ({ page, testData }) => {
    // Tạo dữ liệu tiền đề của riêng test này. `insert` tự track SKU; teardown của
    // fixture `testData` xóa nó khi test kết thúc, không cần afterEach.
    const code = testData.uniqueCode('FIXT-PET-');
    productName = `Bàn cào mèo tự dựng ${code}`;

    sku = testData.insert('products', {
      sku: code,
      name: productName,
      description: 'Sản phẩm do auto-test tạo ra, sẽ bị xóa khi test kết thúc.',
      price,
      stock,
      category_id: CATEGORY_TOYS_ID,
      pet_type: 'cat',
      rating: 4.5,
      image_emoji: '🐈',
      is_active: 1,
    });

    screen = new WPE10101Page(page);
    await screen.open();
  });

  test('WPE10101_S01 - Tìm thấy sản phẩm do test tự tạo, theo SKU', async () => {
    // Step 1: Nhập SKU vừa tạo vào ô tìm kiếm, chờ vòng GET /api/products
    await screen.search(sku);

    // Step 2: Đúng 1 kết quả, và là sản phẩm của test này
    await expect(screen.resultCount).toHaveText(PE101_LIST_MESSAGE.resultCount(1));
    await expect(screen.productCard(sku)).toBeVisible();
    await expect(screen.productName(sku)).toHaveText(productName);
    await expect(screen.productPrice(sku)).toHaveText(moneyRegex(price));

    // Step 3: Tồn kho hiển thị đúng giá trị đã seed (ProductCard.jsx:37)
    await expect(screen.productCard(sku)).toContainText(`Kho: ${stock}`);
  });

  test('WPE10101_S02 - Tìm theo tên sản phẩm tự tạo, không phụ thuộc tổng số sản phẩm', async () => {
    // Step 1: Tìm bằng chính TÊN sản phẩm của test này (khớp qua `p.name LIKE ?`)
    await screen.search(productName);

    // Step 2: Chỉ sản phẩm của test này khớp — không quan tâm database có bao nhiêu row
    await expect(screen.resultCount).toHaveText(PE101_LIST_MESSAGE.resultCount(1));
    await expect(screen.productName(sku)).toHaveText(productName);
  });

  test('WPE10101_S03 - Seeder từ chối xóa dữ liệu seed của khách', async ({ testData }) => {
    // Không thao tác UI. TC này bảo vệ chính cơ chế dọn: nếu ai đó viết test track một
    // SKU của seed thì seeder phải THROW, không được nhận rồi xóa.
    // Nguồn quy tắc: project.config.json → advanced.database.protectedPatterns
    expect(() => testData.track('products', 'GR-001')).toThrow(/được bảo vệ/);
    expect(() => testData.track('orders', 'PET-SAMPLE-001')).toThrow(/được bảo vệ/);

    // Và từ chối cả mã không có prefix đã khai — nếu không thì test có thể xóa
    // dữ liệu thật do người dùng nhập tay.
    expect(() => testData.track('products', 'SKU-LA-CUA-KHACH')).toThrow(/prefix/);
  });
});
