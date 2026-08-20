/**
 * WRA10102 Register Product Test Suite
 * Testcase: tools/testcase/testcase01.md - STT 1 (Đăng ký sản phẩm thành công)
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WRA10101Page } from '../../../pages/RA101/wra10101.page';
import { WRA10102Page } from '../../../pages/RA101/wra10102.page';
import {
  RA101_MENU_LABELS,
  RA101_TITLES,
  RA101_URL_PATTERNS,
} from '../../../pages/RA101/const/const-ra101';
import { WRA10102_SUCCESS_MESSAGES } from '../../../constants/RA101/messages';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WRA10102 - Đăng ký sản phẩm (Thêm sản phẩm)', () => {
  let productListPage: WRA10101Page;
  let productRegisterPage: WRA10102Page;

  /** Các mã SKU được tạo trong test, dùng để dọn dữ liệu sau khi chạy */
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

  test('WRA10102_01 - Đăng ký sản phẩm thành công', async ({ snapInput, snapExpect }) => {
    const testData = loadTestData('RA101/wra10102', 'wra10102', 'TC_01');
    const { skuPrefix, ...baseFormData } = testData.formData;
    const formData = { ...baseFormData, sku: CommonHelper.uniqueCode(skuPrefix) };

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await productListPage.navigateHome();

    // Step 2: Click vào button Sản phẩm -> hiển thị ra trang danh sách sản phẩm
    await productListPage.clickProductMenu();
    expect(productListPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_LIST);
    expect(await productListPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_LIST);
    expect(await productListPage.getActiveMenuLabel()).toBe(RA101_MENU_LABELS.PRODUCT);

    // Step 3: Click vào button Thêm sản phẩm
    await productListPage.clickAddProduct();
    await productRegisterPage.waitForFormReady();
    expect(productRegisterPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_CREATE);
    expect(await productRegisterPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_CREATE);

    // Step 4: Nhập Mã SKU, Tên sản phẩm, Giá bán (₫), Số lượng tồn, Mô tả
    await productRegisterPage.fillForm(formData);
    await snapInput();

    // Step 5: Click button Lưu
    createdSkus.push(formData.sku);
    await productRegisterPage.clickSave();

    // Expected 1: Màn hình di chuyển sang màn danh sách sản phẩm
    await productListPage.waitForListReady();
    expect(productListPage.getCurrentUrl()).toMatch(RA101_URL_PATTERNS.PRODUCT_LIST);
    expect(await productListPage.getPageTitle()).toBe(RA101_TITLES.PRODUCT_LIST);

    // Expected 2: Hiển thị text Đã thêm sản phẩm [tên sản phẩm vừa đăng ký]
    expect(await productListPage.isSuccessAlertVisible()).toBe(true);
    expect(await productListPage.getSuccessMessage()).toBe(
      WRA10102_SUCCESS_MESSAGES.PRODUCT_CREATED(formData.name),
    );
    await snapExpect();

    // Expected 3: Sản phẩm vừa đăng ký được lưu và hiển thị đúng trên danh sách
    await productListPage.searchProduct(formData.sku);
    expect(await productListPage.isProductRowVisible(formData.sku)).toBe(true);

    const rowValues = await productListPage.getRowValuesBySku(formData.sku);
    expect(rowValues.sku).toBe(formData.sku);
    expect(rowValues.name).toBe(formData.name);
    expect(rowValues.price).toBe(testData.expected.priceText);
    expect(rowValues.stock).toBe(testData.expected.stockText);
    expect(rowValues.status).toBe(testData.expected.statusText);
    await snapExpect(2);
  });
});
