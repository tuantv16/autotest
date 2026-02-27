/**
 * WTY10802 Check purchase history detail information Test Suite
 * Tests for 購入履歴明細 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10802Page } from '../../../pages/TY108/wty10802.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY10801 - Check purchase history information (購入履歴照会)', () => {
    let purchaseHistoryPage: WTY10802Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        purchaseHistoryPage = new WTY10802Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10802_05', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY108/wty10802', 'wty10802', 'TC_05');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        const hjZai = await purchaseHistoryPage.waitForTextInBody('購入履歴明細');
        expect(hjZai).toBe(true);

        await snapExpect();
    });

});
    