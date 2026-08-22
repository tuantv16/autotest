/**
 * Constants cho RA102 (Retail App — Quản lý đơn hàng)
 *
 * Nguồn:
 * - apps/retail_app/routes/web.php:20                        (Route::resource('orders'))
 * - apps/retail_app/resources/views/orders/index.blade.php   (tiêu đề, bộ lọc, bảng)
 * - apps/retail_app/resources/views/layouts/app.blade.php    (thanh menu)
 * - apps/retail_app/app/Models/Order.php:15-26               (giá trị + nhãn trạng thái)
 */

/**
 * Base URL của Retail App.
 *
 * Dùng lại đúng hàm đã khai trong project.config.json#advanced.baseUrlConst
 * (const-ra101.ts#getRA101BaseUrl) thay vì đọc lại biến môi trường ở đây —
 * một nguồn duy nhất, đổi một chỗ.
 */
export { getRA101BaseUrl as getRA102BaseUrl } from '../../RA101/const/const-ra101';

export const RA102_PATHS = {
  HOME: '/',
  ORDER_LIST: '/orders',
  ORDER_CREATE: '/orders/create',
} as const;

/** Regex kiểm tra URL sau khi điều hướng */
export const RA102_URL_PATTERNS = {
  ORDER_LIST: /\/orders(\?.*)?$/,
  ORDER_CREATE: /\/orders\/create$/,
} as const;

/** Tiêu đề màn hình (thẻ h1 trong .page__head) — index.blade.php:8 */
export const RA102_TITLES = {
  ORDER_LIST: 'Quản lý đơn hàng',
} as const;

/** Nhãn của các item trên thanh menu — layouts/app.blade.php:14-21 */
export const RA102_MENU_LABELS = {
  REPORT: 'Thống kê',
  PRODUCT: 'Sản phẩm',
  ORDER: 'Đơn hàng',
  CUSTOMER: 'Khách hàng',
} as const;

/** Nhãn các button trên màn danh sách đơn hàng — index.blade.php:11,37,39 */
export const RA102_BUTTON_LABELS = {
  CREATE_ORDER: '+ Tạo đơn hàng',
  FILTER: 'Lọc',
  CLEAR_FILTER: 'Xóa lọc',
  VIEW: 'Xem',
  EDIT: 'Sửa',
  DELETE: 'Xóa',
} as const;

/**
 * Giá trị (value) của option trong selectbox trạng thái.
 * Nguồn: Order::STATUS_* — apps/retail_app/app/Models/Order.php:15-18
 */
export const RA102_STATUS_VALUES = {
  ALL: '',
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

/**
 * Nhãn hiển thị của trạng thái — dùng cho cả option trong selectbox và badge
 * trong cột "Trạng thái" (partials/order-status.blade.php:2 in ra cùng nhãn này).
 * Nguồn: Order::STATUSES — apps/retail_app/app/Models/Order.php:21-26
 */
export const RA102_STATUS_LABELS = {
  ALL: 'Mọi trạng thái',
  PENDING: 'Chờ xử lý',
  CONFIRMED: 'Đã xác nhận',
  COMPLETED: 'Hoàn thành',
  CANCELLED: 'Đã hủy',
} as const;

/** Placeholder ô tìm kiếm — index.blade.php:19 (ký tự cuối là dấu … U+2026, không phải ba dấu chấm) */
export const RA102_PLACEHOLDERS = {
  SEARCH: 'Tìm mã đơn, tên hoặc SĐT khách…',
} as const;

/** Nhãn hai ô ngày — index.blade.php:30,34 */
export const RA102_FIELD_LABELS = {
  FROM_DATE: 'Từ ngày',
  TO_DATE: 'Đến ngày',
} as const;
