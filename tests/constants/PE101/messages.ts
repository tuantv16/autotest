/**
 * Catalogue thông báo của module PE101 — PetCare Store (apps/pets).
 *
 * Mỗi message ghi rõ **source sinh ra nó**. Không tự sửa chính tả, không tự thêm dấu:
 * message tầng client là tiếng Việt CÓ DẤU, message tầng server là tiếng Việt KHÔNG DẤU
 * (hồ sơ dự án §3.11). Sửa cho "đẹp" là test fail.
 */

/** Thông báo trên màn danh sách / tìm kiếm sản phẩm (WPE10101). */
export const PE101_LIST_MESSAGE = {
  /**
   * Không có sản phẩm nào khớp bộ lọc.
   * Nguồn: apps/pets/frontend/src/App.jsx:198-200
   */
  noProducts: 'Không tìm thấy sản phẩm nào phù hợp. Thử từ khoá khác nhé!',

  /**
   * Gọi GET /api/products thất bại. `{message}` là `body.error` do API trả về,
   * hoặc `Request that bai (<status>)` nếu body không có `error`.
   * Nguồn: apps/pets/frontend/src/App.jsx:188-190, api.js:10-15
   */
  loadErrorPrefix: 'Không tải được danh sách sản phẩm:',

  /**
   * Dòng đếm kết quả. `{total}` lấy từ `meta.total` của API.
   * Nguồn: apps/pets/frontend/src/components/Filters.jsx:88-90
   */
  resultCount: (total: number) => `Tìm thấy ${total} sản phẩm`,

  /**
   * Thông tin trang hiện tại. Chỉ render khi `totalPages > 1`.
   * Nguồn: apps/pets/frontend/src/App.jsx:221
   */
  pageInfo: (page: number, totalPages: number) => `Trang ${page} / ${totalPages}`,
} as const;

/** Nhãn nút và placeholder trên màn WPE10101. */
export const PE101_LIST_LABEL = {
  /** Nguồn: frontend/src/components/Filters.jsx:27 */
  searchPlaceholder: 'Ví dụ: tông đơ, bát ăn, vòng cổ...',
  /** Nguồn: frontend/src/components/Filters.jsx:62 */
  resetFilters: 'Xoá bộ lọc',
  /** Nguồn: frontend/src/components/Filters.jsx:73 */
  categoryAll: 'Tất cả danh mục',
  /** Nguồn: frontend/src/components/ProductCard.jsx:46 */
  addToCart: 'Thêm vào giỏ',
  /** Nguồn: frontend/src/components/ProductCard.jsx:13,46 — dùng cho cả badge và nhãn nút */
  soldOut: 'Hết hàng',
  /** Nguồn: frontend/src/App.jsx:220 */
  prevPage: '← Trước',
  /** Nguồn: frontend/src/App.jsx:226 */
  nextPage: 'Sau →',
} as const;

/** Toast của thao tác giỏ hàng. Toast tự tắt sau 2500ms (App.jsx:66-70) — assert ngay. */
export const PE101_TOAST = {
  /**
   * Thêm sản phẩm vào giỏ thành công.
   * Nguồn: apps/pets/frontend/src/App.jsx:94
   */
  addedToCart: (productName: string) => `Đã thêm "${productName}" vào giỏ`,

  /**
   * Thêm vượt tồn kho — chặn ở tầng client, không gửi request.
   * Nguồn: apps/pets/frontend/src/App.jsx:80
   */
  stockLimit: (stock: number, productName: string) =>
    `Chỉ còn ${stock} sản phẩm "${productName}" trong kho`,
} as const;
