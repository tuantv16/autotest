/**
 * Tạo dữ liệu tiền đề cho test của retail_app, và tự xóa sạch sau khi test xong.
 *
 * Mục tiêu: test KHÔNG phụ thuộc vào database đang có gì, cũng không phụ thuộc máy
 * ai chạy. Mỗi test tự dựng đúng dữ liệu nó cần rồi tự dọn.
 *
 * Dùng qua fixture `retailData` của `tests/base/base-test.ts` — không cần tự khởi tạo:
 *
 * ```ts
 * test('WRA10102_02 - SKU đã tồn tại', async ({ retailData }) => {
 *   const [p] = await retailData.seedProducts([
 *     { name: 'Bàn làm việc gỗ sồi', price: 2500000, stock: 15, isActive: true },
 *   ]);
 *   // p.sku là mã duy nhất vừa được tạo, ví dụ 'FIXT-SKU-1787332929867272'
 * });
 * // Hết test -> tự DELETE CỨNG đúng những mã đã tạo, KỂ CẢ khi test fail
 * ```
 *
 * Ba điểm thiết kế, mỗi điểm giải một vấn đề thật:
 *
 * 1. **Xóa theo ĐÚNG danh sách mã đã tạo**, không dùng `LIKE 'prefix%'`. Nhờ vậy hai
 *    test chạy song song không xóa dữ liệu của nhau — điều mà dọn theo prefix không
 *    bảo đảm được (`fullyParallel: true` đang bật).
 *
 * 2. **Xóa CỨNG, không qua giao diện.** `products` dùng SoftDeletes nên xóa qua UI chỉ
 *    đặt `deleted_at`, dòng dữ liệu vẫn nằm lại và VẪN CHIẾM mã SKU (cột UNIQUE). Xóa
 *    cứng cũng nhanh hơn hẳn: một câu SQL thay cho chuỗi mở trang → tìm kiếm → bấm
 *    Xóa → nhận hộp thoại xác nhận.
 *
 * 3. **Vẫn có lưới an toàn.** Mã sinh ra mang prefix `FIXT-SKU-` đã khai trong
 *    `project.config.json` và có dòng DELETE tương ứng trong
 *    `test_data/retail_data/cleanup.sql`. Nếu tiến trình test bị kill giữa đường thì
 *    teardown không chạy, và `python tools/data/run_sql.py` vẫn dọn được phần rơi lại.
 */

import { runSql, querySql, sqlValue } from './retail-db.helper';
import { CommonHelper } from '../common-helper';

/**
 * Prefix mã SKU do fixture sinh ra.
 *
 * BẤT BIẾN: đổi giá trị này thì phải sửa đồng thời 2 chỗ, không thì rác không được dọn
 *   - project.config.json -> advanced.database.testDataPrefixes.products
 *   - test_data/retail_data/cleanup.sql
 */
export const FIXTURE_SKU_PREFIX = 'FIXT-SKU-';

/** Dữ liệu một sản phẩm cần tạo. Bỏ trống `sku` thì fixture tự sinh mã duy nhất. */
export interface ProductSeed {
  sku?: string;
  name: string;
  description?: string | null;
  /** Đơn vị đồng. `2500000` sẽ hiện trên giao diện là `2.500.000 ₫` */
  price: number;
  stock: number;
  /** Mặc định `true` -> cột Trạng thái hiện `Đang bán`; `false` -> `Ngừng bán` */
  isActive?: boolean;
}

/** Sản phẩm đã được tạo, kèm id thật trong database */
export interface SeededProduct {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
}

export class RetailDataSeeder {
  /** Mọi mã SKU cần dọn khi test kết thúc — gồm cả mã do test tự tạo qua giao diện */
  private readonly trackedSkus = new Set<string>();

  /**
   * Tạo sản phẩm trong database.
   *
   * `deleted_at` để NULL nên sản phẩm hiện ngay trên danh sách. Nếu cần một sản phẩm
   * đã bị xóa mềm thì tạo bình thường rồi gọi `softDeleteProducts()`.
   */
  async seedProducts(rows: ProductSeed[]): Promise<SeededProduct[]> {
    if (rows.length === 0) {
      return [];
    }

    const prepared: SeededProduct[] = rows.map((row) => ({
      id: 0,
      sku: row.sku ?? CommonHelper.uniqueCode(FIXTURE_SKU_PREFIX),
      name: row.name,
      description: row.description ?? null,
      price: row.price,
      stock: row.stock,
      isActive: row.isActive ?? true,
    }));

    // Ghi nhận TRƯỚC khi chạy INSERT: câu lệnh lỗi giữa đường vẫn phải dọn được
    prepared.forEach((p) => this.trackedSkus.add(p.sku));

    const values = prepared
      .map(
        (p) =>
          `(${sqlValue(p.sku)}, ${sqlValue(p.name)}, ${sqlValue(p.description)}, ` +
          `${sqlValue(p.price)}, ${sqlValue(p.stock)}, ${sqlValue(p.isActive)}, NOW(), NOW(), NULL)`,
      )
      .join(',\n  ');

    runSql(
      'INSERT INTO products\n' +
        '  (sku, name, description, price, stock, is_active, created_at, updated_at, deleted_at)\n' +
        'VALUES\n  ' +
        values +
        ';',
    );

    // Lấy lại id thật để test dựng được URL dạng /products/{id}/edit
    const idRows = querySql(
      'SELECT id, sku FROM products WHERE sku IN (' +
        prepared.map((p) => sqlValue(p.sku)).join(', ') +
        ');',
    );
    const idBySku = new Map(idRows.map(([id, sku]) => [sku, Number(id)]));

    return prepared.map((p) => ({ ...p, id: idBySku.get(p.sku) ?? 0 }));
  }

  /** Lối tắt khi chỉ cần đúng một sản phẩm */
  async seedProduct(row: ProductSeed): Promise<SeededProduct> {
    const [created] = await this.seedProducts([row]);
    return created;
  }

  /**
   * Nhận dọn một mã SKU mà TEST tự tạo qua giao diện.
   *
   * Dùng cho các test mà việc tạo sản phẩm chính là thứ đang được kiểm (màn Thêm sản
   * phẩm) — lúc đó không được tạo bằng SQL, nhưng vẫn muốn dọn cứng cho nhanh và chắc.
   * Gọi hàm này NGAY TRƯỚC khi bấm Lưu, không phải sau, để test fail giữa đường vẫn dọn.
   */
  track(...skus: string[]): void {
    skus.filter(Boolean).forEach((sku) => this.trackedSkus.add(sku));
  }

  /** Danh sách mã SKU đang được theo dõi — dùng khi cần khẳng định trong báo cáo */
  get tracked(): string[] {
    return [...this.trackedSkus];
  }

  /** Đánh dấu xóa mềm (đặt `deleted_at`) — dựng tình huống "sản phẩm đã bị xóa" */
  async softDeleteProducts(skus: string[]): Promise<void> {
    if (skus.length === 0) {
      return;
    }
    runSql(
      'UPDATE products SET deleted_at = NOW() WHERE sku IN (' +
        skus.map((s) => sqlValue(s)).join(', ') +
        ');',
    );
  }

  /** Đếm số sản phẩm CHƯA bị xóa mềm khớp một mã SKU — tiện cho assertion về dữ liệu */
  async countLiveProductsBySku(sku: string): Promise<number> {
    const rows = querySql(
      `SELECT COUNT(*) FROM products WHERE sku = ${sqlValue(sku)} AND deleted_at IS NULL;`,
    );
    return Number(rows[0]?.[0] ?? 0);
  }

  /**
   * Xóa CỨNG mọi thứ đã tạo. Fixture gọi hàm này ở teardown nên bình thường không phải
   * tự gọi.
   *
   * Xóa `order_items` trước vì `order_items.product_id` khai `restrictOnDelete`
   * (database/migrations/2026_08_13_100004_create_order_items_table.php:14) — sai thứ tự
   * là vỡ khóa ngoại.
   */
  async cleanup(): Promise<void> {
    const skus = [...this.trackedSkus];
    if (skus.length === 0) {
      return;
    }

    const inList = skus.map((s) => sqlValue(s)).join(', ');

    runSql(
      `DELETE FROM order_items WHERE product_id IN (SELECT id FROM products WHERE sku IN (${inList}));`,
    );
    runSql(`DELETE FROM products WHERE sku IN (${inList});`);

    this.trackedSkus.clear();
  }
}
