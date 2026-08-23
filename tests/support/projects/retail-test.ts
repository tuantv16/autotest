/**
 * `test` kèm fixture `retailData` — CHỈ dùng cho spec của dự án Retail (`RA1*`).
 *
 * ── Vì sao có file này ─────────────────────────────────────────────────────────
 * Trước đây `retailData` được đăng ký ngay trong `tests/base/base-test.ts`, nghĩa là
 * **base của engine biết tên một dự án cụ thể**. Hệ quả: mọi dự án mới onboard vào
 * workspace đều kéo theo `RetailDataSeeder` của dự án Retail, và `base-test.ts` import
 * `utils/db/retail-data.ts` dù dự án đang test chẳng liên quan gì.
 *
 * Base giờ không biết dự án nào là dự án nào. Tri thức riêng của từng dự án nằm ở đây —
 * mỗi dự án một file trong thư mục này, `extend` từ base-test nên **giữ nguyên 100%
 * fixture của engine** (`snapInput`, `snapExpect`, `indexedDBHelper`, `commonHelper`,
 * `baseUrl`, cipher preset…) và chỉ thêm phần của mình.
 *
 * ── Dùng thế nào ──────────────────────────────────────────────────────────────
 *     import { test, expect, loadTestData } from '../../../support/projects/retail-test';
 *
 *     test('WRA10102_01 - ...', async ({ page, retailData }) => { … });
 *
 * ── Với DỰ ÁN MỚI thì đừng bắt chước file này ─────────────────────────────────
 * `RetailDataSeeder` viết cứng cho bảng `products` của retail_app. Dự án mới dùng
 * `tests/support/data-test.ts` — fixture `testData` ở đó đọc `advanced.database` trong
 * `project.config.json` nên chạy đúng cho mọi dự án mà không phải viết seeder mới.
 * File này tồn tại để 2 spec `RA1*` cũ còn chạy được, không phải để nhân bản.
 */

import {
  test as baseTest,
  expect,
  loadTestData,
  loadTestDataTS,
} from '../../base/base-test';
import { RetailDataSeeder } from '../../utils/db/retail-data';

export interface RetailFixtures {
  /**
   * Tạo dữ liệu tiền đề cho test của retail_app và tự dọn khi test kết thúc.
   * Chỉ khởi tạo khi test thực sự khai nó, nên test không dùng thì không chạm database.
   * Xem `tests/utils/db/retail-data.ts`.
   */
  retailData: RetailDataSeeder;
}

export const test = baseTest.extend<RetailFixtures>({
  // Teardown của fixture chạy KỂ CẢ khi test fail, timeout, hay beforeEach chết giữa lúc
  // seed — nên không cần afterEach để dọn.
  retailData: async ({}, use, testInfo) => {
    const seeder = new RetailDataSeeder();
    await use(seeder);

    // Dọn thất bại KHÔNG được làm fail một test vốn đã pass — nhưng cũng không được im
    // lặng, vì im lặng là để rác lại trong database mà không ai biết.
    const leftover = seeder.tracked;
    try {
      await seeder.cleanup();
    } catch (error: any) {
      console.error(
        [
          '',
          '╔══════════════════════════════════════════════════════════════════════════╗',
          '║  DỌN DỮ LIỆU TEST THẤT BẠI — DATABASE ĐANG CÒN RÁC                       ║',
          '╚══════════════════════════════════════════════════════════════════════════╝',
          `  Test        : ${testInfo.title}`,
          `  Mã SKU sót  : ${leftover.join(', ') || '(không có)'}`,
          `  Nguyên nhân : ${error?.message?.split('\n')[0] ?? error}`,
          '',
          '  Dọn tay bằng lệnh (chạy từ gốc workspace):',
          '      python core/data/run_sql.py',
          '',
        ].join('\n'),
      );
    }
  },
});

export { expect, loadTestData, loadTestDataTS };
