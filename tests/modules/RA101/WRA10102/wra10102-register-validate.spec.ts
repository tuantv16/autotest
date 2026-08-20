/**
 * WRA10102 Register Product Validation Test Suite
 * Testcase: tools/testcase/testcase01.md - STT 2 (Đăng ký sản phẩm thất bại)
 *
 * Testcase mô tả chung là "nhập dữ liệu -> Lưu -> đăng ký thất bại", nên các case dưới đây
 * bao phủ những dữ liệu không hợp lệ theo ràng buộc trong ProductRequest của Retail App:
 * - Mã SKU đã tồn tại (rule unique)
 * - Bỏ trống trường bắt buộc (rule required - bị chặn bởi validate của trình duyệt)
 * - Mã SKU chỉ chứa khoảng trắng (rule required - bị chặn bởi validate phía server)
 * - Giá bán vượt giới hạn cho phép (rule max)
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WRA10101Page } from '../../../pages/RA101/wra10101.page';
import { WRA10102Page } from '../../../pages/RA101/wra10102.page';
import { RA101_TITLES, RA101_URL_PATTERNS } from '../../../pages/RA101/const/const-ra101';
import {
  WRA10102_ERROR_MESSAGES,
  WRA10102_SUCCESS_MESSAGES,
} from '../../../constants/RA101/messages';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WRA10102 - Đăng ký sản phẩm thất bại (Validate)', () => {
  let productListPage: WRA10101Page;
  let productRegisterPage: WRA10102Page;

  /** Các mã SKU được submit trong test, dùng để dọn dữ liệu sau khi chạy */
  let createdSkus: string[] = [];

  test.beforeEach(async ({ page }) => {
    // Timeout mặc định (30s) đã gồm cả thời gian dọn dữ liệu ở afterEach
    test.setTimeout(60_000);

    productListPage = new WRA10101Page(page);
    productRegisterPage = new WRA10102Page(page);
    createdSkus = [];
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);

    // Cleanup: xóa sản phẩm đã đăng ký để DB sạch sau khi chạy test
    for (const sku of createdSkus) {
      await productListPage.deleteProductBySku(sku).catch(() => false);
    }
  });

  test('WRA10102_02 - Đăng ký thất bại khi Mã SKU đã tồn tại', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_02');
    const { skuPrefix, ...baseFormData } = testData.formData;
    const sku = CommonHelper.uniqueCode(skuPrefix);

    // Precondition: đăng ký sẵn 1 sản phẩm để có Mã SKU tồn tại trên hệ thống
    await productRegisterPage.navigate();
    await productRegisterPage.waitForFormReady();
    await productRegisterPage.fillForm({ ...baseFormData, sku });
    createdSkus.push(sku);
    await productRegisterPage.clickSave();
    await productListPage.waitForListReady();
    expect(await productListPage.getSuccessMessage()).toBe(
      WRA10102_SUCCESS_MESSAGES.PRODUCT_CREATED(baseFormData.name),
    );

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();
    expect(await productListPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_LIST);

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productRegisterPage.waitForFormReady();

    // Step 4: Nhập Mã SKU (đã tồn tại), Tên sản phẩm, Giá bán (₫), Số lượng tồn, Mô tả
    await productRegisterPage.fillForm({ ...testData.duplicatedFormData, sku });
    await snapInput();

    // Step 5: Click button Lưu
    await productRegisterPage.clickSave();

    // Expected: Đăng ký thất bại - màn hình không chuyển sang danh sách sản phẩm
    expect(productRegisterPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);
    expect(await productRegisterPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_CREATE);
    expect(await productRegisterPage.isSuccessAlertVisible()).toBe(false);

    // Expected: Hiển thị thông báo lỗi Mã SKU đã tồn tại
    expect(await productRegisterPage.isErrorSummaryVisible()).toBe(true);
    expect(await productRegisterPage.getErrorSummaryTitle()).toBe(
      WRA10102_ERROR_MESSAGES.ERROR_SUMMARY_TITLE,
    );
    expect(await productRegisterPage.getErrorSummaryMessages()).toContain(
      WRA10102_ERROR_MESSAGES.SKU_DUPLICATED,
    );
    expect(await productRegisterPage.isFieldErrorVisible('sku')).toBe(true);
    expect(await productRegisterPage.getFieldErrorMessage('sku')).toBe(
      WRA10102_ERROR_MESSAGES.SKU_DUPLICATED,
    );
    expect(await productRegisterPage.hasErrorBorder('sku')).toBe(true);
    await snapExpect();
  });

  test('WRA10102_03 - Đăng ký thất bại khi bỏ trống các trường bắt buộc', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_03');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();
    expect(await productListPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_LIST);

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productRegisterPage.waitForFormReady();

    // Step 4: Bỏ trống Mã SKU, Tên sản phẩm, Giá bán (₫), Số lượng tồn - chỉ nhập Mô tả
    await productRegisterPage.fillForm(testData.formData);
    await snapInput();

    // Step 5: Click button Lưu
    await productRegisterPage.clickSave();

    // Expected: Đăng ký thất bại - form bị chặn, màn hình vẫn ở màn đăng ký sản phẩm
    expect(productRegisterPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);
    expect(await productRegisterPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_CREATE);
    expect(await productRegisterPage.isSuccessAlertVisible()).toBe(false);

    // Expected: Các trường bắt buộc bị đánh dấu không hợp lệ và có message yêu cầu nhập
    for (const field of ['sku', 'name', 'price', 'stock'] as const) {
      expect(await productRegisterPage.isFieldNativelyValid(field)).toBe(false);
      expect(await productRegisterPage.getNativeValidationMessage(field)).not.toBe('');
    }
    await snapExpect();
  });

  test('WRA10102_04 - Đăng ký thất bại khi Mã SKU chỉ chứa khoảng trắng', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_04');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productRegisterPage.waitForFormReady();

    // Step 4: Nhập Mã SKU chỉ gồm khoảng trắng, các trường còn lại hợp lệ
    await productRegisterPage.fillForm(testData.formData);
    await snapInput();

    // Step 5: Click button Lưu
    await productRegisterPage.clickSave();

    // Expected: Đăng ký thất bại - màn hình không chuyển sang danh sách sản phẩm
    expect(productRegisterPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);
    expect(await productRegisterPage.isSuccessAlertVisible()).toBe(false);

    // Expected: Hiển thị thông báo lỗi bắt buộc nhập Mã SKU
    expect(await productRegisterPage.isErrorSummaryVisible()).toBe(true);
    expect(await productRegisterPage.getErrorSummaryMessages()).toContain(
      WRA10102_ERROR_MESSAGES.SKU_REQUIRED,
    );
    expect(await productRegisterPage.getFieldErrorMessage('sku')).toBe(
      WRA10102_ERROR_MESSAGES.SKU_REQUIRED,
    );
    expect(await productRegisterPage.hasErrorBorder('sku')).toBe(true);
    await snapExpect();
  });

  test('WRA10102_05 - Đăng ký thất bại khi Giá bán vượt giới hạn cho phép', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_05');
    const { skuPrefix, ...baseFormData } = testData.formData;
    const formData = { ...baseFormData, sku: CommonHelper.uniqueCode(skuPrefix) };

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productRegisterPage.waitForFormReady();

    // Step 4: Nhập Giá bán (₫) lớn hơn giới hạn cho phép, các trường còn lại hợp lệ
    await productRegisterPage.fillForm(formData);
    await snapInput();

    // Step 5: Click button Lưu
    // Ghi nhận SKU để chắc chắn dọn sạch dữ liệu nếu sản phẩm bị tạo ngoài mong đợi
    createdSkus.push(formData.sku);
    await productRegisterPage.clickSave();

    // Expected: Đăng ký thất bại - màn hình không chuyển sang danh sách sản phẩm
    expect(productRegisterPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);
    expect(await productRegisterPage.isSuccessAlertVisible()).toBe(false);

    // Expected: Hiển thị thông báo lỗi giới hạn của Giá bán
    expect(await productRegisterPage.isErrorSummaryVisible()).toBe(true);
    expect(await productRegisterPage.getErrorSummaryMessages()).toContain(
      WRA10102_ERROR_MESSAGES.PRICE_MAX,
    );
    expect(await productRegisterPage.getFieldErrorMessage('price')).toBe(
      WRA10102_ERROR_MESSAGES.PRICE_MAX,
    );
    expect(await productRegisterPage.hasErrorBorder('price')).toBe(true);
    await snapExpect();
  });
});
