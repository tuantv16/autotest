/**
 * Messages for RA101 (Retail App - Quản lý sản phẩm)
 *
 * Nguồn message:
 * - retail_app/app/Http/Controllers/ProductController.php  (flash success)
 * - retail_app/resources/views/partials/flash.blade.php    (tiêu đề khối lỗi)
 * - retail_app/lang/vi/validation.php + ProductRequest::attributes() (message validate)
 */

export const WRA10102_SUCCESS_MESSAGES = {
  /** ProductController@store: "Đã thêm sản phẩm \"{name}\"." */
  PRODUCT_CREATED: (productName: string): string => `Đã thêm sản phẩm "${productName}".`,
} as const;

export const WRA10102_ERROR_MESSAGES = {
  /** flash.blade.php: <strong>...</strong> của khối .alert--error */
  ERROR_SUMMARY_TITLE: 'Không lưu được, vui lòng kiểm tra lại:',

  // required => 'Vui lòng nhập :attribute.'
  SKU_REQUIRED: 'Vui lòng nhập mã SKU.',
  NAME_REQUIRED: 'Vui lòng nhập tên sản phẩm.',
  PRICE_REQUIRED: 'Vui lòng nhập giá bán.',
  STOCK_REQUIRED: 'Vui lòng nhập số lượng tồn.',

  // unique => ':attribute đã tồn tại.'
  SKU_DUPLICATED: 'mã SKU đã tồn tại.',

  // max.numeric => ':attribute không được lớn hơn :max.'
  PRICE_MAX: 'giá bán không được lớn hơn 999999999999.99.',
  STOCK_MAX: 'số lượng tồn không được lớn hơn 4294967295.',

  // min.numeric => ':attribute không được nhỏ hơn :min.'
  PRICE_MIN: 'giá bán không được nhỏ hơn 0.',
  STOCK_MIN: 'số lượng tồn không được nhỏ hơn 0.',

  // integer => ':attribute phải là số nguyên.'
  STOCK_INTEGER: 'số lượng tồn phải là số nguyên.',

  // max.string => ':attribute không được dài hơn :max ký tự.'
  SKU_MAX_LENGTH: 'mã SKU không được dài hơn 50 ký tự.',
  NAME_MAX_LENGTH: 'tên sản phẩm không được dài hơn 255 ký tự.',
} as const;

/**
 * WRA10103 (Sửa sản phẩm)
 *
 * Message lỗi validate của WRA10103 DÙNG CHUNG với WRA10102: hai màn cùng dùng
 * ProductRequest (retail_app/app/Http/Requests/ProductRequest.php) và cùng render
 * products/_form.blade.php -> tái sử dụng WRA10102_ERROR_MESSAGES ở trên,
 * KHÔNG nhân bản thành khối WRA10103_ERROR_MESSAGES.
 */
export const WRA10103_SUCCESS_MESSAGES = {
  /** ProductController@update (ProductController.php:56): "Đã cập nhật sản phẩm \"{name}\"." */
  PRODUCT_UPDATED: (productName: string): string => `Đã cập nhật sản phẩm "${productName}".`,
} as const;

/**
 * Gợi ý (.field__hint) trên form sản phẩm — dùng chung cho WRA10102 và WRA10103
 * vì cả hai màn đều render products/_form.blade.php
 */
export const RA101_FORM_HINTS = {
  /** _form.blade.php:35 — dòng hint ngay dưới ô "Số lượng tồn" */
  STOCK_HINT: 'Đây là số còn lại thực tế — đơn hàng đang mở đã được trừ khỏi con số này.',
} as const;

/**
 * Thông báo của màn WRA10101 — Danh sách / Tìm sản phẩm.
 * Nội dung phải NGUYÊN VĂN kể cả dấu câu, test so khớp chính xác chuỗi này.
 */
export const WRA10101_MESSAGES = {
  /**
   * Hiện thay cho TOÀN BỘ bảng khi không có bản ghi nào khớp điều kiện lọc.
   * Nguồn: apps/retail_app/resources/views/products/index.blade.php:38
   */
  EMPTY_RESULT: 'Chưa có sản phẩm nào khớp điều kiện.',

  /**
   * Liên kết nằm bên trong khối rỗng ở trên.
   * Nguồn: apps/retail_app/resources/views/products/index.blade.php:39
   */
  EMPTY_RESULT_LINK: 'Thêm sản phẩm đầu tiên',
} as const;
