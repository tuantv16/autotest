/**
 * Constants for RA101 (Retail App - Quản lý sản phẩm)
 * Nguồn: retail_app/routes/web.php, retail_app/resources/views/products/*
 */

/**
 * Base URL của Retail App (khác với BASE_URL của POS Renewal).
 * Dùng hàm thay vì hằng số để chắc chắn .env.test đã được nạp trước khi đọc.
 */
export function getRA101BaseUrl(): string {
  return process.env.RETAIL_BASE_URL || 'http://localhost:8080';
}

export const RA101_PATHS = {
  HOME: '/',
  PRODUCT_LIST: '/products',
  PRODUCT_CREATE: '/products/create',
} as const;

/** Regex kiểm tra URL sau khi điều hướng */
export const RA101_URL_PATTERNS = {
  PRODUCT_LIST: /\/products(\?.*)?$/,
  PRODUCT_CREATE: /\/products\/create$/,
} as const;

/** Tiêu đề màn hình (thẻ h1 trong .page__head) */
export const RA101_TITLES = {
  PRODUCT_LIST: 'Quản lý sản phẩm',
  PRODUCT_CREATE: 'Thêm sản phẩm',
} as const;

/** Nhãn của các item trên thanh menu (layouts/app.blade.php) */
export const RA101_MENU_LABELS = {
  REPORT: 'Thống kê',
  PRODUCT: 'Sản phẩm',
  ORDER: 'Đơn hàng',
  CUSTOMER: 'Khách hàng',
} as const;

/** Nhãn các trường trên form đăng ký sản phẩm (products/_form.blade.php) */
export const RA101_FIELD_LABELS = {
  SKU: 'Mã SKU',
  NAME: 'Tên sản phẩm',
  PRICE: 'Giá bán (₫)',
  STOCK: 'Số lượng tồn',
  DESCRIPTION: 'Mô tả',
  IS_ACTIVE: 'Đang bán',
} as const;

/** Nhãn các button */
export const RA101_BUTTON_LABELS = {
  ADD_PRODUCT: 'Thêm sản phẩm',
  SAVE: 'Lưu',
  CANCEL: 'Hủy',
  SEARCH: 'Tìm',
} as const;

/** Badge trạng thái hiển thị trên danh sách sản phẩm (products/index.blade.php) */
export const RA101_STATUS_LABELS = {
  ACTIVE: 'Đang bán',
  INACTIVE: 'Ngừng bán',
  OUT_OF_STOCK: 'Hết hàng',
} as const;
