/**
 * Messages cho RA102 (Retail App — Quản lý đơn hàng)
 *
 * Nội dung phải NGUYÊN VĂN kể cả dấu câu — test so khớp chính xác chuỗi này.
 */

/**
 * Thông báo của màn WRA10201 — Danh sách / Tìm đơn hàng.
 */
export const WRA10201_MESSAGES = {
  /**
   * Hiện thay cho TOÀN BỘ bảng khi không có đơn hàng nào khớp điều kiện lọc.
   * Nguồn: apps/retail_app/resources/views/orders/index.blade.php:46
   */
  EMPTY_RESULT: 'Chưa có đơn hàng nào khớp điều kiện.',

  /**
   * Liên kết nằm bên trong khối rỗng ở trên.
   * Nguồn: apps/retail_app/resources/views/orders/index.blade.php:47
   */
  EMPTY_RESULT_LINK: 'Tạo đơn hàng đầu tiên',

  /**
   * Dòng mô tả dưới tiêu đề màn hình.
   * Nguồn: apps/retail_app/resources/views/orders/index.blade.php:9
   */
  PAGE_SUBTITLE:
    'Đơn ở trạng thái khác "Đã hủy" đang giữ tồn kho. Hủy hoặc xóa đơn sẽ hoàn hàng về kho.',
} as const;
