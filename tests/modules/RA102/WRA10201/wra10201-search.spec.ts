/**
 * WRA10201 — Danh sách / Tìm đơn hàng
 *
 * Nguồn testcase: testcases/retail_testcases/order/order_search.md (5 TC của khách)
 *   TC_ORDER_SEARCH_01 -> WRA10201_01   Tìm theo Mã đơn
 *   TC_ORDER_SEARCH_02 -> WRA10201_02   Tìm theo Tên khách hàng
 *   TC_ORDER_SEARCH_03 -> WRA10201_03   Tìm Mã đơn không tồn tại
 *   TC_ORDER_SEARCH_04 -> WRA10201_04   Lọc theo trạng thái = Hoàn thành
 *   TC_ORDER_SEARCH_05 -> WRA10201_05   Lọc theo khoảng Từ ngày - Đến ngày
 *
 * Màn này CHƯA CÓ SPEC trong specs/ -> kết quả mong đợi lấy theo CLAUDE.md §1 Luật 1:
 * ưu tiên cột `Result` của khách; chỗ nào `Result` không đủ để viết expect(...) thì
 * đối chiếu source code và ĐƯỢC GHI RÕ ngay tại test đó.
 *
 * DỮ LIỆU TIỀN ĐỀ — KHÔNG cần nạp SQL, KHÔNG cần dọn sau khi chạy:
 *
 *   Cả 5 testcase đều CHỈ ĐỌC: chúng chỉ điền bộ lọc rồi bấm "Lọc", không tạo /
 *   sửa / xóa bản ghi nào. Vì vậy không dùng fixture `retailData` và không thêm
 *   prefix nào vào test_data/retail_data/cleanup.sql.
 *
 *   Ba testcase cần "giá trị CÓ tồn tại trong cơ sở dữ liệu" (mã đơn, tên khách,
 *   ngày đặt) thì ĐỌC THẲNG từ dòng đầu của danh sách lúc chạy, thay vì hardcode.
 *   Đây đúng là thao tác của tester thật khi đọc step "Nhập Mã đơn tồn tại trong
 *   cơ sở dữ liệu", và nhờ vậy bộ test chạy được trên máy nào cũng cho kết quả như
 *   nhau mà không cần dựng dữ liệu riêng.
 *
 *   Điều kiện duy nhất: database phải có ít nhất 1 đơn hàng (và với WRA10201_04 là
 *   ít nhất 1 đơn ở trạng thái "Hoàn thành"). Thiếu là test fail ngay ở bước kiểm
 *   tiền đề, kèm thông báo nói rõ đó là thiếu dữ liệu chứ không phải app sai.
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WRA10201Page } from '../../../pages/RA102/wra10201.page';
import {
  RA102_MENU_LABELS,
  RA102_PLACEHOLDERS,
  RA102_STATUS_LABELS,
  RA102_STATUS_VALUES,
  RA102_TITLES,
  RA102_URL_PATTERNS,
} from '../../../pages/RA102/const/const-ra102';
import { WRA10201_MESSAGES } from '../../../constants/RA102/messages';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

/**
 * Đổi ngày hiển thị trên bảng (d/m/Y — index.blade.php:70) sang định dạng của
 * input type="date" (YYYY-MM-DD). Dùng cho WRA10201_05.
 */
function displayDateToIso(displayDate: string): string {
  const [day, month, year] = displayDate.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

test.describe('WRA10201 - Danh sách / Tìm đơn hàng', () => {
  let orderListPage: WRA10201Page;

  test.beforeEach(async ({ page }) => {
    orderListPage = new WRA10201Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Không có gì phải dọn: cả 5 test chỉ đọc, không ghi database.
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WRA10201_01 - Search đơn hàng theo mã đơn', async ({ snapInput, snapExpect }) => {
    const testData = loadTestData('RA102/wra10201', 'wra10201', 'TC_01');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await orderListPage.navigateHome();

    // Step 2: Click vào button Đơn hàng -> hiển thị ra trang danh sách đơn hàng
    await orderListPage.clickOrderMenu();
    expect(orderListPage.getCurrentUrl()).toMatch(RA102_URL_PATTERNS.ORDER_LIST);
    expect(await orderListPage.getActiveMenuLabel()).toBe(RA102_MENU_LABELS.ORDER);
    expect(await orderListPage.getPageTitle()).toBe(RA102_TITLES.ORDER_LIST);

    // Tiền đề: phải có ít nhất 1 đơn hàng để lấy ra một mã đơn "tồn tại trong
    // cơ sở dữ liệu" như step của khách yêu cầu.
    expect(
      await orderListPage.getOrderRowCount(),
      'Database chưa có đơn hàng nào — đây là THIẾU DỮ LIỆU TIỀN ĐỀ, không phải lỗi app',
    ).toBeGreaterThan(0);
    const existingOrder = await orderListPage.getRowValuesByIndex(0);

    // Step 3: Click vào input có placeholder là "Tìm mã đơn, tên hoặc SĐT khách…"
    expect(await orderListPage.getSearchPlaceholder()).toBe(RA102_PLACEHOLDERS.SEARCH);

    // Step 4: Nhập Mã đơn tồn tại trong cơ sở dữ liệu
    await orderListPage.enterKeyword(existingOrder.code);
    await snapInput();

    // Step 5: Click button Lọc
    await orderListPage.clickFilter();

    // Expected (Result của khách): "Search thành công, hiển thị ra bản ghi có Mã đơn chính xác"
    //
    // Chốt cứng đúng 1 dòng: cột `code` là UNIQUE (create_orders_table.php) và bộ lọc
    // so bằng LIKE %term% trên chính cột đó (Order.php:69), nên tìm bằng mã đầy đủ
    // không thể ra dòng thứ hai.
    expect(await orderListPage.getOrderRowCount()).toBe(testData.expected.rowCount);

    const row = await orderListPage.getRowValuesByCode(existingOrder.code);
    expect(row.code).toBe(existingOrder.code);

    // Dòng tìm được phải là ĐÚNG bản ghi lúc đầu, không chỉ trùng mã.
    expect(row.orderDate).toBe(existingOrder.orderDate);
    expect(row.customer).toBe(existingOrder.customer);
    expect(row.itemsCount).toBe(existingOrder.itemsCount);
    expect(row.status).toBe(existingOrder.status);
    expect(row.totalAmount).toBe(existingOrder.totalAmount);

    // Điều kiện lọc được giữ lại trên form sau khi tải lại trang (index.blade.php:18)
    expect((await orderListPage.getFilterValues()).keyword).toBe(existingOrder.code);
    await snapExpect();
  });

  test('WRA10201_02 - Search đơn hàng theo tên khách hàng', async ({ snapInput, snapExpect }) => {
    const testData = loadTestData('RA102/wra10201', 'wra10201', 'TC_02');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await orderListPage.navigateHome();

    // Step 2: Click vào button Đơn hàng -> hiển thị ra trang danh sách đơn hàng
    await orderListPage.clickOrderMenu();
    expect(orderListPage.getCurrentUrl()).toMatch(RA102_URL_PATTERNS.ORDER_LIST);

    // Tiền đề: cần một đơn CÓ gắn khách hàng. Đơn không gắn khách hiển thị '—'
    // (index.blade.php:79) nên không dùng được cho testcase này.
    const rows = await orderListPage.getAllRowValues();
    const rowWithCustomer = rows.find((r) => r.customer !== '' && r.customer !== '—');
    expect(
      rowWithCustomer,
      'Trang 1 của danh sách không có đơn nào gắn khách hàng — THIẾU DỮ LIỆU TIỀN ĐỀ',
    ).toBeDefined();
    const customerName = rowWithCustomer!.customer;

    // Step 3: Click vào input có placeholder là "Tìm mã đơn, tên hoặc SĐT khách…"
    expect(await orderListPage.getSearchPlaceholder()).toBe(RA102_PLACEHOLDERS.SEARCH);

    // Step 4: Nhập Tên khách hàng tồn tại trong cơ sở dữ liệu
    await orderListPage.enterKeyword(customerName);
    await snapInput();

    // Step 5: Click button Lọc
    await orderListPage.clickFilter();

    // Expected (Result của khách): "hiển thị ra các bản ghi ở cột Khách hàng có chứa
    // tên vừa nhập".
    //
    // KHÔNG chốt số dòng: một khách có thể có nhiều đơn, và danh sách phân trang 12
    // dòng/trang (OrderController.php:29). Chỉ chốt: có ít nhất 1 dòng, và MỌI dòng
    // hiện ra đều khớp tên — đó mới là điều bộ lọc phải bảo đảm.
    const filtered = await orderListPage.getAllRowValues();
    expect(filtered.length).toBeGreaterThanOrEqual(testData.expected.minRowCount);

    for (const r of filtered) {
      expect(r.customer, `Dòng ${r.code} có khách "${r.customer}", không khớp từ khóa`).toContain(
        customerName,
      );
    }

    // Đơn dùng để lấy tên khách phải nằm trong kết quả
    expect(filtered.some((r) => r.code === rowWithCustomer!.code)).toBe(true);
    await snapExpect();
  });

  test('WRA10201_03 - Search đơn hàng theo mã đơn không tồn tại', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA102/wra10201', 'wra10201', 'TC_03');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await orderListPage.navigateHome();

    // Step 2: Click vào button Đơn hàng -> hiển thị ra trang danh sách đơn hàng
    await orderListPage.clickOrderMenu();
    expect(orderListPage.getCurrentUrl()).toMatch(RA102_URL_PATTERNS.ORDER_LIST);

    // Step 3: Click vào input có placeholder là "Tìm mã đơn, tên hoặc SĐT khách…"
    expect(await orderListPage.getSearchPlaceholder()).toBe(RA102_PLACEHOLDERS.SEARCH);

    // Step 4: Nhập Mã đơn không tồn tại trong cơ sở dữ liệu
    await orderListPage.enterKeyword(testData.formData.keyword);
    await snapInput();

    // Step 5: Click button Lọc
    await orderListPage.clickFilter();

    // Expected (Result của khách): "Search thất bại, hiển thị thông báo
    // 'Chưa có đơn hàng nào khớp điều kiện.'"
    //
    // Khách đã ghi rõ nguyên văn thông báo -> không cần suy từ source. Đối chiếu lại
    // orders/index.blade.php:46 thì trùng khớp từng ký tự.
    expect(await orderListPage.isEmptyMessageVisible()).toBe(true);
    expect(await orderListPage.getEmptyMessage()).toBe(testData.expected.emptyMessage);
    expect(await orderListPage.getEmptyMessage()).toBe(WRA10201_MESSAGES.EMPTY_RESULT);

    // Khối rỗng thay cho TOÀN BỘ bảng (index.blade.php:44-50) -> không còn bảng, 0 dòng
    expect(await orderListPage.getOrderRowCount()).toBe(testData.expected.rowCount);
    expect(await orderListPage.isTableVisible(2000)).toBe(false);
    await snapExpect();
  });

  test('WRA10201_04 - Lọc đơn hàng theo trạng thái Hoàn thành', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA102/wra10201', 'wra10201', 'TC_04');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await orderListPage.navigateHome();

    // Step 2: Click vào button Đơn hàng -> hiển thị ra trang danh sách đơn hàng
    await orderListPage.clickOrderMenu();
    expect(orderListPage.getCurrentUrl()).toMatch(RA102_URL_PATTERNS.ORDER_LIST);

    // Step 3: Chọn selectbox "Mọi trạng thái", lựa chọn option Hoàn thành
    //
    // Chọn theo VALUE ('completed', Order.php:17) chứ không theo nhãn hiển thị:
    // nhãn là text tiếng Việt — neo kém bền nhất theo CLAUDE.md §1 Luật 2.
    expect(testData.formData.statusValue).toBe(RA102_STATUS_VALUES.COMPLETED);
    await orderListPage.selectStatus(testData.formData.statusValue);
    await snapInput();

    // Step 4: Click button Lọc
    await orderListPage.clickFilter();

    // Expected (Result của khách): "hiển thị ra các bản ghi ở cột Trạng thái có giá trị
    // là Hoàn thành"
    const filtered = await orderListPage.getAllRowValues();
    expect(
      filtered.length,
      'Database không có đơn nào ở trạng thái "Hoàn thành" — THIẾU DỮ LIỆU TIỀN ĐỀ, không phải lỗi app',
    ).toBeGreaterThanOrEqual(testData.expected.minRowCount);

    for (const r of filtered) {
      expect(r.status, `Đơn ${r.code} lọt qua bộ lọc nhưng trạng thái là "${r.status}"`).toBe(
        testData.expected.statusText,
      );
    }
    expect(testData.expected.statusText).toBe(RA102_STATUS_LABELS.COMPLETED);

    // Điều kiện lọc được giữ lại trên selectbox sau khi tải lại trang (index.blade.php:25)
    expect((await orderListPage.getFilterValues()).status).toBe(RA102_STATUS_VALUES.COMPLETED);

    // Có điều kiện lọc thì button "Xóa lọc" phải xuất hiện (index.blade.php:38-40)
    expect(await orderListPage.isClearFilterButtonVisible()).toBe(true);
    await snapExpect();
  });

  test('WRA10201_05 - Lọc đơn hàng theo khoảng Từ ngày - Đến ngày', async ({
    snapInput,
    snapExpect,
  }) => {
    const testData = loadTestData('RA102/wra10201', 'wra10201', 'TC_05');

    // Step 1: Truy cập vào màn hình http://localhost:8080
    await orderListPage.navigateHome();

    // Step 2: Click vào button Đơn hàng -> hiển thị ra trang danh sách đơn hàng
    await orderListPage.clickOrderMenu();
    expect(orderListPage.getCurrentUrl()).toMatch(RA102_URL_PATTERNS.ORDER_LIST);

    // Tiền đề: lấy Ngày đặt của dòng đầu làm khoảng lọc, để chắc chắn khoảng này có
    // dữ liệu. Danh sách sắp giảm dần theo order_date (OrderController.php:27) nên
    // dòng đầu là ngày đặt mới nhất.
    expect(
      await orderListPage.getOrderRowCount(),
      'Database chưa có đơn hàng nào — THIẾU DỮ LIỆU TIỀN ĐỀ, không phải lỗi app',
    ).toBeGreaterThan(0);
    const firstRow = await orderListPage.getRowValuesByIndex(0);
    const targetDate = displayDateToIso(firstRow.orderDate);

    // ─────────────────────────────────────────────────────────────────────────
    // KỲ VỌNG SUY TỪ SOURCE CODE — khách chưa xác nhận.
    //
    // Khách viết ở TC_ORDER_SEARCH_05:
    //   Step 3-4 : "Nhập giá trị vào input Từ ngày" / "Đến ngày (lớn hơn Từ ngày)"
    //              -> KHÔNG nói nhập ngày cụ thể nào.
    //   Result   : "hiển thị ra các bản ghi có Ngày đặt nằm trong khoảng Từ ngày -
    //              Đến ngày" -> KHÔNG nói hai đầu mút có được tính vào hay không.
    //
    // Cách đọc đã chọn, và căn cứ: hai đầu mút ĐƯỢC tính vào (khoảng đóng).
    //   OrderController.php:25-26 dùng whereDate('order_date', '>=', from) và
    //   whereDate('order_date', '<=', to) — cả hai đều là so sánh có bằng.
    //   whereDate so theo NGÀY nên phần giờ không ảnh hưởng.
    //
    // Nhờ đó test này đặt from = to = đúng ngày của dòng đầu: nếu app hiểu là khoảng
    // MỞ thì kết quả sẽ rỗng và test fail — đó chính là điều cần phát hiện.
    // Khách xác nhận khác thì sửa lại test này.
    // ─────────────────────────────────────────────────────────────────────────

    // Step 3: Nhập giá trị vào input Từ ngày
    await orderListPage.enterFromDate(targetDate);

    // Step 4: Nhập giá trị vào input Đến ngày
    await orderListPage.enterToDate(targetDate);
    await snapInput();

    // Step 5: Click button Lọc
    await orderListPage.clickFilter();

    // Expected (Result của khách): "hiển thị ra các bản ghi có Ngày đặt nằm trong
    // khoảng Từ ngày - Đến ngày"
    const filtered = await orderListPage.getAllRowValues();
    expect(filtered.length).toBeGreaterThanOrEqual(testData.expected.minRowCount);

    for (const r of filtered) {
      expect(
        displayDateToIso(r.orderDate),
        `Đơn ${r.code} lọt qua bộ lọc nhưng Ngày đặt là ${r.orderDate}`,
      ).toBe(targetDate);
    }

    // Đơn dùng để lấy mốc ngày phải nằm trong kết quả (chứng minh đầu mút được tính vào)
    expect(filtered.some((r) => r.code === firstRow.code)).toBe(true);

    // Hai ô ngày giữ lại giá trị đã nhập sau khi tải lại trang (index.blade.php:31,35)
    const filterValues = await orderListPage.getFilterValues();
    expect(filterValues.from).toBe(targetDate);
    expect(filterValues.to).toBe(targetDate);
    await snapExpect();
  });
});
