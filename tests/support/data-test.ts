/**
 * `test` có sẵn fixture dựng/dọn dữ liệu — dùng cho spec nào có GHI dữ liệu.
 *
 * ── Vì sao có file này thay vì sửa `tests/base/base-test.ts` ────────────────────
 * Chỗ "đúng sách" để đăng ký fixture là `base-test.ts`, nhưng `tests/base/**` là vùng cấm
 * (CLAUDE.md §1 Luật 3). May là `test.extend` chạy được ở **bất kỳ** file nào: file này
 * mở rộng TỪ `base-test` nên giữ nguyên 100% fixture của engine (`snapInput`,
 * `snapExpect`, `indexedDBHelper`, `commonHelper`, `baseUrl`, cipher preset…) và chỉ
 * thêm vào. Không sửa base, không mất fixture nào.
 *
 * ── Vì sao fixture chắc hơn afterEach ──────────────────────────────────────────
 * Playwright dựng fixture **trước** khi chạy `beforeEach`, và teardown của fixture chạy
 * sau khi test kết thúc **bất kể** kết quả: pass, fail, timeout, hay `beforeEach` chết
 * giữa lúc seed. Dùng `afterEach` thì hụt đúng trường hợp cuối — seed xong một nửa rồi
 * hook chết, không ai dọn.
 *
 * Còn đúng một kẽ mà không cơ chế trong-process nào bít được: worker bị kill cứng
 * (Ctrl+C, hết RAM, mất điện). Lưới cuối cho trường hợp đó là dọn cả đợt:
 *
 *     python core/data/run_sql.py
 *
 * ── Dùng thế nào ───────────────────────────────────────────────────────────────
 * Spec có ghi dữ liệu thì import từ file này thay cho `base-test`:
 *
 *     import { test, expect, loadTestData } from '../../../support/data-test';
 *
 *     test('WPE10102_01 - Đặt hàng thành công', async ({ page, testData }) => {
 *       const sku = testData.insert('products', { sku: testData.uniqueCode('FIXT-PET-'), … });
 *       // … chạy Step 1..N, expect …
 *       // Không cần afterEach: fixture tự dọn khi test kết thúc.
 *     });
 *
 * Spec CHỈ ĐỌC (không tạo row nào) thì cứ import `base-test` như cũ — khai `testData` mà
 * không dùng cũng không sao, seeder chỉ chạm database khi thực sự có gì phải dọn.
 */

import {
  test as baseTest,
  expect,
  loadTestData,
  loadTestDataTS,
} from '../base/base-test';
import { TestDataSeeder } from './test-data-seeder';
import { DbRunner, dbRunner } from './db-runner';

export interface DataFixtures {
  /**
   * Dựng dữ liệu tiền đề của riêng test này, và tự xóa khi test kết thúc.
   *
   * Điều khiển hoàn toàn bằng `project.config.json → advanced.database`, nên cùng đoạn
   * code chạy đúng cho mọi dự án trong workspace. Xem `test-data-seeder.ts`.
   */
  testData: TestDataSeeder;

  /**
   * Truy vấn thẳng database của dự án đang active — dùng khi assertion cần đối chiếu
   * dữ liệu thật (vd: đặt hàng xong thì tồn kho trong DB có giảm đúng số lượng không).
   * Chỉ đọc là an toàn; muốn GHI thì đi qua `testData` để còn được dọn.
   */
  db: DbRunner;
}

export const test = baseTest.extend<DataFixtures>({
  testData: async ({}, use, testInfo) => {
    const seeder = new TestDataSeeder();

    await use(seeder);

    // Teardown: chạy kể cả khi test fail / timeout / beforeEach chết giữa lúc seed.
    // `cleanupQuietly` không làm fail một test vốn đã pass, nhưng in khung cảnh báo kèm
    // danh sách row còn sót — im lặng là để rác trong database mà không ai biết.
    await seeder.cleanupQuietly(testInfo.title);
  },

  db: async ({}, use) => {
    await use(dbRunner());
  },
});

export { expect, loadTestData, loadTestDataTS };
export { TestDataSeeder } from './test-data-seeder';
