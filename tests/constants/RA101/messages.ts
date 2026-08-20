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
