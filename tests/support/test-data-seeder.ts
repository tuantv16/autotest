/**
 * Dựng và dọn dữ liệu test cho **bất kỳ dự án nào** trong workspace.
 *
 * Vòng đời mà mỗi testcase nên có:
 *
 *     beforeEach → testData.insert(...)     tạo dữ liệu tiền đề của riêng test này
 *     test       → chạy Step 1..N, expect   chỉ assert trên dữ liệu vừa tạo
 *     teardown   → tự động                  xóa đúng những row test này tạo ra
 *
 * Không gọi trực tiếp class này trong spec — dùng fixture `testData` ở
 * `tests/support/data-test.ts`. Xem ghi chú cuối file.
 *
 * Điểm khác `RetailDataSeeder` (tests/utils/db/retail-data.ts): file đó viết cứng cho
 * bảng `products` của retail_app — cột nào, SKU ra sao, xóa mềm hay cứng. File này
 * **không biết tên bảng nào cả**; mọi thứ đọc từ `project.config.json → advanced.database`:
 *
 * | Khóa cấu hình      | Seeder dùng để |
 * |--------------------|----------------|
 * | `tableKeys`        | biết cột khóa nghiệp vụ của mỗi bảng, để xóa đúng row |
 * | `cleanupOrder`     | xóa theo thứ tự khóa ngoại |
 * | `testDataPrefixes` | bắt buộc mã do test tạo phải có prefix đã khai |
 * | `protectedPatterns`| từ chối xóa dữ liệu seed |
 * | `beforeDelete`     | hoàn tác tác dụng phụ của app trước khi xóa (vd cộng lại tồn kho) |
 *
 * Nên đổi dự án = sửa cấu hình, không sửa file này.
 *
 * ── Fixture đăng ký ở đâu ──────────────────────────────────────────────────────
 * Chỗ "đúng sách" là `tests/base/base-test.ts`, nhưng đó là vùng cấm (CLAUDE.md §1
 * Luật 3). Vì `test.extend` chạy được ở bất kỳ file nào, fixture được đăng ký ở
 * `tests/support/data-test.ts` — nó extend TỪ base-test nên giữ nguyên mọi fixture của
 * engine và chỉ thêm vào. Không sửa base, không mất fixture nào, teardown vẫn chắc.
 */

import { DbRunner, dbRunner, likeToRegExp, sqlLiteral, sqlValueList } from './db-runner';
import { databaseConfig, projectConfig } from './project-config';

/** Một row cần tạo: tên cột → giá trị. */
export type SeedRow = Record<string, string | number | null>;

export interface SeederOptions {
  /** Runner riêng, dùng khi test cần trỏ vào database khác. Mặc định lấy từ cấu hình. */
  runner?: DbRunner;
  /**
   * Bỏ qua kiểm prefix. CHỈ dùng cho bảng mà app tự sinh mã và mã đó không có prefix
   * khai trong cấu hình. Mở cờ này là tự chịu trách nhiệm xóa đúng row.
   */
  allowUntrackedPrefix?: boolean;
}

export class TestDataSeeder {
  private readonly runner: DbRunner;
  private readonly options: SeederOptions;
  /** table → tập giá trị khóa mà test này đã tạo (hoặc nhận trách nhiệm dọn). */
  private readonly trackedByTable = new Map<string, Set<string>>();

  constructor(options: SeederOptions = {}) {
    this.options = options;
    this.runner = options.runner || dbRunner();
  }

  /** Tên dự án đang active — in ra khi báo lỗi để không nhầm database. */
  get projectName(): string {
    return projectConfig().projectName;
  }

  /** Cột khóa nghiệp vụ của một bảng. Chưa khai trong cấu hình là lỗi cấu hình, không đoán. */
  private keyColumn(table: string): string {
    const key = databaseConfig().tableKeys[table];
    if (!key) {
      throw new Error(
        `[seeder] Chưa khai cột khóa cho bảng '${table}'. Thêm vào project.config.json:\n` +
          `  advanced.database.tableKeys = { "${table}": "<tên cột UNIQUE>" }\n` +
          'Không khai thì seeder không biết xóa row nào — và đoán là rất nguy hiểm.',
      );
    }
    return key;
  }

  /**
   * Nhận trách nhiệm dọn một giá trị khóa.
   *
   * Dùng khi **app tự sinh mã** nên test không đặt trước được: đặt hàng xong thì đọc mã
   * đơn trên UI rồi `track('orders', code)`. Từ đó cleanup xóa đúng đơn đó, không quét
   * cả bảng.
   */
  track(table: string, ...values: string[]): void {
    const db = databaseConfig();
    const prefixes = db.testDataPrefixes[table] || [];
    const protectedPatterns = db.protectedPatterns[table] || [];

    for (const raw of values) {
      const value = String(raw || '').trim();
      if (!value) continue;

      // Chặn xóa dữ liệu seed. Đây là lưới an toàn quan trọng nhất của cả file:
      // xóa nhầm seed thì mọi test sau fail mà không ai hiểu vì sao.
      for (const pattern of protectedPatterns) {
        if (likeToRegExp(pattern).test(value)) {
          throw new Error(
            `[seeder] Từ chối track '${value}' của bảng '${table}': khớp mẫu được bảo vệ ` +
              `'${pattern}' (advanced.database.protectedPatterns). Đây là dữ liệu seed, ` +
              'test không được xóa.',
          );
        }
      }

      if (prefixes.length > 0 && !this.options.allowUntrackedPrefix) {
        const matched = prefixes.some((prefix) => value.startsWith(prefix));
        if (!matched) {
          throw new Error(
            `[seeder] Từ chối track '${value}' của bảng '${table}': không bắt đầu bằng ` +
              `prefix nào đã khai (${prefixes.join(', ')}). Prefix là cách duy nhất phân ` +
              'biệt dữ liệu test với dữ liệu thật — xem advanced.database.testDataPrefixes.',
          );
        }
      }

      const set = this.trackedByTable.get(table) || new Set<string>();
      set.add(value);
      this.trackedByTable.set(table, set);
    }
  }

  /**
   * Tạo một row và tự track nó.
   *
   * @returns giá trị khóa của row vừa tạo, để test dùng trong assertion
   * @example
   *   const sku = seeder.insert('products', {
   *     sku: seeder.uniqueCode('FIXT-PET-'), name: 'Bàn cào mèo test',
   *     price: 199000, stock: 7, category_id: 3, pet_type: 'cat',
   *   });
   */
  insert(table: string, row: SeedRow): string {
    const key = this.keyColumn(table);
    const keyValue = row[key];
    if (keyValue === null || keyValue === undefined || String(keyValue) === '') {
      throw new Error(
        `[seeder] insert('${table}') thiếu cột khóa '${key}'. Không có khóa thì không ` +
          'dọn được row này sau khi test xong.',
      );
    }

    // Track TRƯỚC khi ghi: nếu INSERT thành công một phần rồi lỗi, row vẫn được dọn.
    this.track(table, String(keyValue));

    const columns = Object.keys(row);
    const values = columns.map((column) => sqlLiteral(row[column]));
    this.runner.exec(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${values.join(', ')});`,
    );

    return String(keyValue);
  }

  /** Tạo nhiều row cùng bảng. Trả về danh sách giá trị khóa theo đúng thứ tự truyền vào. */
  insertMany(table: string, rows: SeedRow[]): string[] {
    return rows.map((row) => this.insert(table, row));
  }

  /**
   * Sinh mã duy nhất từ một prefix, cho cột có ràng buộc UNIQUE.
   * Prefix phải là prefix đã khai trong cấu hình, nếu không `track` sẽ từ chối.
   */
  uniqueCode(prefix: string): string {
    const stamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `${prefix}${stamp}${random}`;
  }

  /** Đếm số row còn lại theo giá trị khóa — dùng để chứng minh cleanup thật sự xóa. */
  countByKey(table: string, value: string): number {
    const key = this.keyColumn(table);
    const raw = this.runner.scalar(
      `SELECT COUNT(*) AS n FROM ${table} WHERE ${key} = ${sqlLiteral(value)};`,
    );
    return Number(raw || 0);
  }

  /** Chạy truy vấn tùy ý — dùng khi assertion cần đối chiếu database. */
  query(sql: string) {
    return this.runner.query(sql);
  }

  /** Chạy câu lệnh tùy ý. Dùng dè: mọi thứ tạo ra bằng đường này phải tự `track`. */
  exec(sql: string): void {
    this.runner.exec(sql);
  }

  /** Danh sách đang chờ dọn, theo từng bảng. */
  get tracked(): Record<string, string[]> {
    const out: Record<string, string[]> = {};
    for (const [table, values] of this.trackedByTable) {
      out[table] = [...values];
    }
    return out;
  }

  /** Có gì cần dọn hay không. */
  get isEmpty(): boolean {
    return [...this.trackedByTable.values()].every((set) => set.size === 0);
  }

  /**
   * Xóa mọi row đã track.
   *
   * Thứ tự lấy từ `advanced.database.cleanupOrder` (thứ tự khóa ngoại). Bảng nào có
   * `beforeDelete` thì chạy SQL đó trước — chỗ để hoàn tác tác dụng phụ của app, ví dụ
   * app trừ tồn kho khi tạo đơn nhưng xóa đơn không cộng lại.
   *
   * Bảng đã track mà KHÔNG có trong `cleanupOrder` vẫn được xóa, sau cùng, kèm cảnh báo:
   * thà xóa muộn còn hơn để rác lại im lặng.
   */
  async cleanup(): Promise<void> {
    if (this.isEmpty) return;

    const db = databaseConfig();
    const ordered = db.cleanupOrder.filter((table) => this.trackedByTable.has(table));
    const leftover = [...this.trackedByTable.keys()].filter(
      (table) => !db.cleanupOrder.includes(table),
    );

    if (leftover.length > 0) {
      console.warn(
        `[seeder] Bảng ${leftover.join(', ')} không có trong advanced.database.cleanupOrder ` +
          'nên bị xóa sau cùng. Nếu có khóa ngoại thì bổ sung vào cleanupOrder.',
      );
    }

    for (const table of [...ordered, ...leftover]) {
      const values = [...(this.trackedByTable.get(table) || new Set<string>())];
      if (values.length === 0) continue;

      const key = this.keyColumn(table);
      const list = sqlValueList(values);

      for (const template of db.beforeDelete[table] || []) {
        this.runner.exec(template.split('{values}').join(list));
      }

      if ((db.softDeleteTables || []).includes(table)) {
        // Bảng xóa mềm: app chỉ set deleted_at nên row vẫn chiếm mã UNIQUE.
        // Test phải xóa CỨNG, nếu không lần chạy sau fail vì trùng mã.
        console.log(`[seeder] ${table} là bảng xóa mềm — xóa cứng ${values.length} row test.`);
      }

      this.runner.exec(`DELETE FROM ${table} WHERE ${key} IN (${list});`);
    }

    this.trackedByTable.clear();
  }

  /**
   * Dọn nhưng KHÔNG làm fail một test vốn đã pass.
   *
   * Gọi hàm này trong `afterEach`. Dọn lỗi thì in khung cảnh báo kèm danh sách còn sót
   * và cách dọn tay — im lặng là để rác trong database mà không ai biết.
   */
  async cleanupQuietly(context: string = ''): Promise<void> {
    const leftover = this.tracked;
    try {
      await this.cleanup();
    } catch (error: any) {
      const lines = Object.entries(leftover).map(
        ([table, values]) => `  ${table.padEnd(14)}: ${values.join(', ') || '(không có)'}`,
      );
      console.error(
        [
          '',
          '╔══════════════════════════════════════════════════════════════════════════╗',
          '║  DỌN DỮ LIỆU TEST THẤT BẠI — DATABASE ĐANG CÒN RÁC                       ║',
          '╚══════════════════════════════════════════════════════════════════════════╝',
          `  Dự án       : ${this.projectName}`,
          context ? `  Test        : ${context}` : '',
          '  Row còn sót :',
          ...lines,
          `  Nguyên nhân : ${String(error?.message || error).split('\n')[0]}`,
          '',
          '  Dọn tay bằng lệnh (chạy từ gốc workspace):',
          '      python tools/data/run_sql.py',
          '',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
  }
}

/**
 * ── Cách dùng khuyến nghị: fixture, không phải afterEach ───────────────────────
 *
 * Đừng gọi `new TestDataSeeder()` trong spec. Dùng fixture `testData` ở
 * `tests/support/data-test.ts`:
 *
 *     import { test, expect } from '../../../support/data-test';
 *
 *     test('...', async ({ page, testData }) => {
 *       const sku = testData.insert('products', { sku: testData.uniqueCode('FIXT-'), … });
 *     });
 *
 * Fixture được Playwright dựng TRƯỚC `beforeEach` và teardown chạy sau khi test kết thúc
 * bất kể kết quả — pass, fail, timeout, hay `beforeEach` chết giữa lúc seed. `afterEach`
 * hụt đúng trường hợp cuối. Đã kiểm thật: cho `beforeEach` throw ngay sau khi seed, row
 * vẫn được xóa sạch.
 *
 * Kẽ duy nhất còn lại là worker bị kill cứng (Ctrl+C, hết RAM) — không cơ chế
 * trong-process nào bít được. Lưới cuối cho trường hợp đó: `python tools/data/run_sql.py`.
 */
