import { expect, loadTestData, test } from '../../../base/base-test';
import { WTY32201_MESSAGES } from '../../../constants/messages';
import { TY32201Page } from '../../../pages/TY322/wty32201.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY32201 - (棚卸カウント」)', () => {
  let summaryPage: TY32201Page;
  test.beforeEach(async ({ page, baseUrl }) => {
    summaryPage = new TY32201Page(page);
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test('WTY32201_20', async ({
    page,
    indexedDBHelper,
    snapInput,
    snapExpect,
  }) => {});
});
