/**
 * Hằng số dùng chung cho module PE101 — PetCare Store (apps/pets).
 *
 * Mọi text hiển thị, data-testid và dữ liệu seed đều gom về đây để đổi một chỗ.
 * Nguồn của từng nhóm ghi ngay trên khai báo, theo Luật 2 (CLAUDE.md §1).
 */

/**
 * Base URL của app pets.
 *
 * `playwright.config.ts` KHÔNG khai `baseURL` (CLAUDE.md §2.4) nên cấm
 * `page.goto('/duong-dan')`. Mọi điều hướng phải đi qua hàm này.
 *
 * Biến môi trường: `PETS_BASE_URL` (project.config.json → advanced.baseUrlEnvVar).
 * Mặc định `http://localhost:8090` — cổng nginx của app.
 * Nguồn: apps/pets/docker-compose.yml (service `web`, ports "8090:80").
 */
export function getPE101BaseUrl(): string {
  return process.env.PETS_BASE_URL || 'http://localhost:8090';
}

/**
 * Key localStorage app dùng để lưu giỏ hàng.
 * Nguồn: apps/pets/frontend/src/App.jsx:9 (`const CART_KEY = 'petcare.cart.v1'`).
 *
 * Test PHẢI xóa key này trước khi mở trang, nếu không giỏ của test trước còn lại
 * và test không độc lập (hồ sơ dự án §3.8).
 */
export const CART_STORAGE_KEY = 'petcare.cart.v1';

/**
 * Độ trễ debounce của ô tìm kiếm, tính bằng ms.
 * Nguồn: apps/pets/frontend/src/App.jsx:62
 *   `setTimeout(() => fetchProducts(filters), filters.search ? 350 : 0)`
 */
export const SEARCH_DEBOUNCE_MS = 350;

/**
 * data-testid của màn WPE10101 — danh sách / tìm kiếm / lọc sản phẩm.
 *
 * App phủ data-testid cho toàn bộ phần tử tương tác (56 chỗ, 0 chỗ dùng `name=`)
 * nên đây là neo bám bậc 1 duy nhất cần dùng. Hồ sơ dự án §2.
 */
export const PE101_TESTID = {
  /** Nguồn: frontend/src/App.jsx:128 */
  appHeader: 'app-header',
  /** Nguồn: frontend/src/App.jsx:141 */
  apiStatus: 'api-status',
  /** Nguồn: frontend/src/App.jsx:151 */
  openCart: 'open-cart',
  /** Nguồn: frontend/src/App.jsx:155 */
  cartCount: 'cart-count',
  /** Nguồn: frontend/src/App.jsx:169 */
  heroTotalProducts: 'hero-total-products',

  /** Nguồn: frontend/src/components/Filters.jsx:19 */
  filterBar: 'filter-bar',
  /** Nguồn: frontend/src/components/Filters.jsx:26 */
  searchInput: 'search-input',
  /** Nguồn: frontend/src/components/Filters.jsx:37 */
  sortSelect: 'sort-select',
  /** Nguồn: frontend/src/components/Filters.jsx:51 */
  petTypeSelect: 'pet-type-select',
  /** Nguồn: frontend/src/components/Filters.jsx:61 */
  resetFilters: 'reset-filters',
  /** Nguồn: frontend/src/components/Filters.jsx:66 */
  categoryList: 'category-list',
  /** Nguồn: frontend/src/components/Filters.jsx:70 */
  categoryAll: 'category-all',
  /** Nguồn: frontend/src/components/Filters.jsx:88 */
  resultCount: 'result-count',

  /** Nguồn: frontend/src/App.jsx:194 — chỉ render khi loading = true */
  loadingSkeleton: 'loading-skeleton',
  /** Nguồn: frontend/src/App.jsx:198 — chỉ render khi danh sách rỗng */
  noProducts: 'no-products',
  /** Nguồn: frontend/src/App.jsx:188 — chỉ render khi gọi API lỗi */
  loadError: 'load-error',
  /** Nguồn: frontend/src/App.jsx:202 — chỉ render khi có kết quả */
  productGrid: 'product-grid',

  /** Nguồn: frontend/src/components/ProductCard.jsx:10 — render trong .map(), KHÔNG unique */
  productCard: 'product-card',
  /** Nguồn: frontend/src/components/ProductCard.jsx:25 */
  productName: 'product-name',
  /** Nguồn: frontend/src/components/ProductCard.jsx:36 */
  productPrice: 'product-price',
  /** Nguồn: frontend/src/components/ProductCard.jsx:28 */
  productRating: 'product-rating',
  /** Nguồn: frontend/src/components/ProductCard.jsx:42 */
  addToCart: 'add-to-cart',
  /** Nguồn: frontend/src/components/ProductCard.jsx:48 */
  inCartCount: 'in-cart-count',

  /** Nguồn: frontend/src/App.jsx:215 — chỉ render khi totalPages > 1 */
  pagination: 'pagination',
  /** Nguồn: frontend/src/App.jsx:217 */
  prevPage: 'prev-page',
  /** Nguồn: frontend/src/App.jsx:221 */
  pageInfo: 'page-info',
  /** Nguồn: frontend/src/App.jsx:223 */
  nextPage: 'next-page',

  /** Nguồn: frontend/src/App.jsx:249 — tự tắt sau 2500ms (App.jsx:66-70) */
  toast: 'toast',
} as const;

/**
 * Endpoint API của app, dùng để chờ đúng vòng request thay vì chờ theo thời gian.
 * Nguồn: apps/pets/frontend/src/api.js:19-31, apps/pets/backend/src/server.js:19-29
 */
export const PE101_API = {
  products: '**/api/products?**',
  productsRegex: /\/api\/products(\?|$)/,
  categories: '**/api/categories',
  health: '**/api/health',
} as const;

/** Nhãn option của selectbox "Sắp xếp". Nguồn: frontend/src/components/Filters.jsx:3-9 */
export const PE101_SORT_OPTION = {
  newest: 'newest',
  priceAsc: 'price_asc',
  priceDesc: 'price_desc',
  ratingDesc: 'rating_desc',
  nameAsc: 'name_asc',
} as const;

/** Nhãn option của selectbox "Loại thú cưng". Nguồn: frontend/src/components/Filters.jsx:11-15 */
export const PE101_PET_TYPE = {
  all: '',
  dog: 'dog',
  cat: 'cat',
} as const;

/**
 * Số sản phẩm mỗi trang, mặc định của cả client và server.
 * Nguồn: frontend/src/App.jsx:8 (`pageSize: 12`),
 *        backend/src/routes/products.js:41 (chặn trên 50).
 */
export const PE101_PAGE_SIZE = 12;

/**
 * Dữ liệu seed dùng làm mốc trong test. Nguồn: apps/pets/db/init/01-schema.sql:78-103.
 *
 * Chỉ đọc — màn WPE10101 không tạo/sửa sản phẩm (app không có UI cho việc đó),
 * nên các giá trị này ổn định giữa các lần chạy MIỄN LÀ cleanup có hoàn tồn kho
 * sau khi test đặt hàng (hồ sơ dự án §3.4).
 */
export const PE101_SEED = {
  /** Tổng sản phẩm đang bán (is_active = 1) */
  totalProducts: 24,
  /** 24 sản phẩm / 12 mỗi trang */
  totalPages: 2,
  products: {
    GR001: {
      sku: 'GR-001',
      name: 'Tông đơ cắt lông chó mèo Pro-Clip',
      price: 620000,
      stock: 34,
    },
    FE001: {
      sku: 'FE-001',
      name: 'Bát ăn đôi inox chống trượt',
      price: 210000,
      stock: 65,
    },
    HE002: {
      sku: 'HE-002',
      name: 'Kem chống rụng lông và ngứa da 60g',
      price: 139000,
      stock: 95,
    },
  },
} as const;

/**
 * Định dạng tiền của app: `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
 * Nguồn: apps/pets/frontend/src/api.js:33-35.
 *
 * CẢNH BÁO: khoảng trắng trước ký hiệu ₫ là U+00A0 (no-break space), KHÔNG phải space
 * thường. So chuỗi bằng space thường sẽ fail dù mắt nhìn giống hệt (hồ sơ dự án §3.5).
 * Vì vậy hàm này trả về **regex**, không trả về chuỗi.
 *
 * @example moneyRegex(620000) // khớp "620.000 ₫"
 */
export function moneyRegex(amount: number): RegExp {
  const grouped = new Intl.NumberFormat('vi-VN').format(amount);
  const escaped = grouped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`${escaped}\\s*₫`);
}
