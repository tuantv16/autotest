/**
 * WTZ11001 Delivery work result search Test Suite
 * Tests for 配達工事果検索 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTZ11001Page } from '../../../pages/TZ110/wtz11001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTZ11001 - Delivery work result search (配達工事果検索)', () => {
    let deliveryWorkPage: WTZ11001Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        deliveryWorkPage = new WTZ11001Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTZ11001_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await deliveryWorkPage.navigate();
        await page.waitForTimeout(1000);

        await deliveryWorkPage.waitForFormReady();

        const button1 = await deliveryWorkPage.waitForTextInBody('クリア');
        expect(button1).toBe(true);

        const button2 = await deliveryWorkPage.waitForTextInBody('確定');
        expect(button2).toBe(true);

        await snapExpect();
    });

    
});
    