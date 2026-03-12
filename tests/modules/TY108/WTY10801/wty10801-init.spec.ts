/**
 * WTY10801 Check purchase history information Test Suite
 * Tests for 購入履歴照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY10801Page } from '../../../pages/TY108/wty10801.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';

test.describe('WTY10801 - Check purchase history information (購入履歴照会)', () => {
    let purchaseHistoryPage: WTY10801Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        purchaseHistoryPage = new WTY10801Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY10801_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        await purchaseHistoryPage.clickMenuButton();

        const menuItem1 = await purchaseHistoryPage.waitForTextInBody('履歴明細');
        expect(menuItem1).toBe(true);

        await snapExpect();
    });

    test('WTY10801_07', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        const kokNmInput = await purchaseHistoryPage.selectorsObj.kokNmInput.isDisabled();
        expect(kokNmInput).toBe(true);

        const kokNmInputValue = await purchaseHistoryPage.selectorsObj.kokNmInput.inputValue();
        expect(kokNmInputValue).toBe('');

        await snapExpect();
    });

    test('WTY10801_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        const hjZai = await purchaseHistoryPage.selectorsObj.hjZai1Input.isChecked();
        expect(hjZai).toBe(true);

        await snapExpect();
    });

    test('WTY10801_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await purchaseHistoryPage.navigate();
        await page.waitForTimeout(1000);

        await purchaseHistoryPage.waitForFormReady();

        const hjZai = await purchaseHistoryPage.selectorsObj.hjZai1Input.isChecked();
        expect(hjZai).toBe(true);

        await snapExpect();
    });

});
    