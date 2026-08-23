/**
 * WRA10102 — Thêm sản phẩm / Đăng ký sản phẩm
 *
 * Nguồn testcase: testcases/retail_testcases/product/product_register.md (2 TC của khách)
 *   TC_PRODUCT_REGISTER_01 -> WRA10102_01
 *   TC_PRODUCT_REGISTER_02 -> WRA10102_02   (kỳ vọng suy từ source code, xem comment trong test)
 *
 * DỮ LIỆU TIỀN ĐỀ — do fixture `retailData` lo, KHÔNG cần chạy SQL tay trước khi test:
 *
 *   - `retailData.seedProducts([...])` tạo sản phẩm bằng SQL, mã SKU sinh duy nhất.
 *   - `retailData.track(sku)` nhận dọn một mã do chính test tạo qua giao diện.
 *   - Hết test, fixture tự XÓA CỨNG đúng những mã đó — KỂ CẢ khi test fail hoặc timeout.
 *
 * Nên bộ test này không phụ thuộc database đang có gì, và không cần dọn tay sau khi chạy.
 * Xem `autotest/tests/utils/db/retail-data.ts`.
 */

import { test, expect, loadTestData } from '../../../support/projects/retail-test';
import { WRA10101Page } from '../../../pages/RA101/wra10101.page';
import { WRA10102Page } from '../../../pages/RA101/wra10102.page';
import {
  RA101_MENU_LABELS,
  RA101_TITLES,
  RA101_URL_PATTERNS,
} from '../../../pages/RA101/const/const-ra101';
import {
  WRA10102_SUCCESS_MESSAGES,
  WRA10102_ERROR_MESSAGES,
} from '../../../constants/RA101/messages';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WRA10102 - Thêm sản phẩm', () => {
  let productListPage: WRA10101Page;
  let productCreatePage: WRA10102Page;

  test.beforeEach(async ({ page }) => {
    productListPage = new WRA10101Page(page);
    productCreatePage = new WRA10102Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Dọn dữ liệu KHÔNG còn ở đây: fixture `retailData` tự xóa cứng ở teardown của nó.
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WRA10102_01 - Đăng ký sản phẩm thành công', async ({
    retailData,
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_01');
    const { skuPrefix, ...baseFormData } = testData.formData;
    const formData = { ...baseFormData, sku: CommonHelper.uniqueCode(skuPrefix) };

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();
    await productListPage.waitForListReady();
    expect(productListPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_LIST);
    expect(await productListPage.getActiveMenuLabel()).toBe(RA101_MENU_LABELS.PRODUCT);

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productCreatePage.waitForFormReady();
    expect(productCreatePage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);
    expect(await productCreatePage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_CREATE);

    // Step 4: Nhập Mã SKU, Tên sản phẩm, Giá bán (₫), Số lượng tồn, Mô tả
    await productCreatePage.fillForm(formData);
    await snapInput();

    // Step 5: Click button Lưu
    //
    // Giao nhiệm vụ dọn cho fixture TRƯỚC khi submit, không phải sau: test fail giữa
    // đường thì sản phẩm có thể đã được tạo, vẫn phải xóa được.
    retailData.track(formData.sku);
    await productCreatePage.clickSave();

    // Expected: Màn hình di chuyển sang màn danh sách sản phẩm
    await productListPage.waitForListReady();
    expect(productListPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_LIST);

    // Expected: hiển thị text `Đã thêm sản phẩm [tên sản phẩm vừa đăng ký]`
    expect(await productListPage.isSuccessAlertVisible()).toBe(true);
    expect(await productListPage.getSuccessMessage()).toBe(
      WRA10102_SUCCESS_MESSAGES.PRODUCT_CREATED(formData.name),
    );

    // Expected: sản phẩm vừa đăng ký có mặt trong danh sách với đúng dữ liệu đã nhập.
    //
    // Phải TÌM KIẾM để lọc về đúng dòng trước khi đọc. Danh sách sắp theo `name` tăng dần
    // và phân trang 12 dòng/trang (ProductController.php:18-19) nên sản phẩm vừa tạo
    // thường KHÔNG nằm ở trang 1 — đọc thẳng sẽ không thấy dòng nào.
    // Assertion về thông báo thành công phải đặt TRƯỚC bước này, vì tìm kiếm làm tải lại
    // trang và thông báo flash biến mất.
    await productListPage.searchProduct(formData.sku);
    expect(await productListPage.getProductRowCount()).toBe(1);

    const row = await productListPage.getRowValuesBySku(formData.sku);
    expect(row.sku).toBe(formData.sku);
    expect(row.name).toBe(formData.name);
    expect(row.price).toBe(testData.expected.priceText);
    expect(row.stock).toBe(testData.expected.stockText);
    expect(row.status).toBe(testData.expected.statusText);
    await snapExpect();
  });

  test('WRA10102_02 - Đăng ký thất bại khi Mã SKU đã tồn tại', async ({
    retailData,
    snapInput,
    snapExpect,
  }) => {
    // ─────────────────────────────────────────────────────────────────────────
    // KỲ VỌNG SUY TỪ SOURCE CODE — khách chưa xác nhận.
    //
    // Khách viết ở TC_PRODUCT_REGISTER_02:
    //   Test step : TRÙNG TỪNG CHỮ với TC_PRODUCT_REGISTER_01
    //               ("Nhập Mã SKU, Tên sản phẩm, Giá bán, Số lượng tồn, Mô tả" -> "Click Lưu")
    //   Result    : "Đăng ký thất bại"  <- không nói thất bại kiểu gì, thông báo ra sao
    //
    // Cách đọc đã chọn, và căn cứ:
    //   1. Step nói NHẬP ĐỦ 5 trường -> không phải nhánh "bỏ trống trường bắt buộc".
    //   2. Mọi trường bắt buộc đều có `required` (_form.blade.php:7,16,25,34) nên bỏ
    //      trống thì TRÌNH DUYỆT chặn, request không tới server, không có màn "thất bại".
    //   3. Nhập đủ dữ liệu hợp lệ mà vẫn bị từ chối thì quy tắc duy nhất còn có thể
    //      chặn là `unique` trên cột sku (ProductRequest.php:20-23).
    //   -> Đọc là "đăng ký lại bằng mã SKU đã tồn tại".
    //
    // Phương án đã cân nhắc rồi bỏ: giá bán vượt trần (max:999999999999.99,
    // ProductRequest.php:26) cũng khớp "nhập đủ 5 trường mà vẫn thất bại". Chọn SKU
    // trùng vì đó là ràng buộc riêng của hành vi đăng ký, còn trần giá là giới hạn
    // kiểu dữ liệu. Khách xác nhận khác thì sửa cả fixture và test này.
    // ─────────────────────────────────────────────────────────────────────────
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_02');

    // Tiền đề: có sẵn một sản phẩm để mã SKU của nó đã tồn tại trên hệ thống.
    //
    // Tạo bằng SQL, KHÔNG qua giao diện. Đây là điểm quan trọng: nếu dựng tiền đề bằng
    // chính form Thêm sản phẩm thì lúc form hỏng, test này fail ở phần dàn dựng và
    // không nói được gì về việc kiểm SKU trùng. Tạo bằng SQL thì test chỉ fail khi đúng
    // hành vi nó đang kiểm bị sai.
    const existing = await retailData.seedProduct({
      name: testData.formData.name,
      description: testData.formData.description,
      price: Number(testData.formData.price),
      stock: Number(testData.formData.stock),
      isActive: true,
    });

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();
    await productListPage.waitForListReady();
    expect(productListPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_LIST);

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productCreatePage.waitForFormReady();
    expect(productCreatePage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);

    // Step 4: Nhập Mã SKU (dùng lại mã đã tồn tại), Tên sản phẩm, Giá bán, Số lượng tồn, Mô tả
    await productCreatePage.fillForm({
      ...testData.duplicatedFormData,
      sku: existing.sku,
    });
    await snapInput();

    // Step 5: Click button Lưu
    await productCreatePage.clickSave();

    // Expected: không lưu được, vẫn ở lại màn Thêm sản phẩm
    expect(productCreatePage.isOnCreatePage()).toBe(true);

    // Expected: hiện khối thông báo lỗi, nêu rõ mã SKU đã tồn tại
    expect(await productCreatePage.isErrorAlertVisible()).toBe(true);
    expect(await productCreatePage.getErrorAlertTitle()).toBe(
      WRA10102_ERROR_MESSAGES.ERROR_SUMMARY_TITLE,
    );
    expect(await productCreatePage.getErrorMessages()).toContain(
      WRA10102_ERROR_MESSAGES.SKU_DUPLICATED,
    );

    // Expected: không có sản phẩm thứ hai nào được tạo.
    // Đếm thẳng trên database — không phụ thuộc phân trang của giao diện.
    expect(await retailData.countLiveProductsBySku(existing.sku)).toBe(1);
    await snapExpect();
  });
});
