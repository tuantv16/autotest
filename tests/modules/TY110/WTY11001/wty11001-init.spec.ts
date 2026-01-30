/**
 * WTY11001 Check arrival schedule information Test Suite
 * Tests for 入荷予定情報照会 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY11001Page } from '../../../pages/TY110/wty11001.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES, WTY11001_headerTables } from '../../../constants/messages';

test.describe('WTY11001 - Check arrival schedule information (入荷予定情報照会)', () => {
    let schedulePage: WTY11001Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        schedulePage = new WTY11001Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY11001_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickMenuButton();

        const menuItem1 = await schedulePage.waitForTextInBody('商品基本');
        expect(menuItem1).toBe(true);

        const menuItem2 = await schedulePage.waitForTextInBody('店別在庫');
        expect(menuItem2).toBe(true);

        const menuItem3 = await schedulePage.waitForTextInBody('供給依頼');
        expect(menuItem3).toBe(true);

        const menuItem4 = await schedulePage.waitForTextInBody('詳細');
        expect(menuItem4).toBe(true);

        await snapExpect();
    });

    test('WTY11001_07', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickRootKbnSelector();

        const item1 = await schedulePage.waitForTextInBody('全て');
        expect(item1).toBe(true);

        const item2 = await schedulePage.waitForTextInBody('メーカ直納');
        expect(item2).toBe(true);

        const item3 = await schedulePage.waitForTextInBody('補充入庫');
        expect(item3).toBe(true);

        const item4 = await schedulePage.waitForTextInBody('移動入庫');
        expect(item4).toBe(true);

        await snapExpect();
    });

    test('WTY11001_08', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickArriveReasonSelector();

        const item1 = await schedulePage.waitForTextInBody('客注品');
        expect(item1).toBe(true);

        const item2 = await schedulePage.waitForTextInBody('展示品');
        expect(item2).toBe(true);

        const item3 = await schedulePage.waitForTextInBody('展示品');
        expect(item3).toBe(true);

        await snapExpect();
    });

    test('WTY11001_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        const startDate = await schedulePage.selectorsObj.startDateInput.inputValue();
        expect(startDate).toBe(new Date().toISOString().slice(0, 10).replace(/-/g, '/'));

        const endDate = await schedulePage.selectorsObj.endDateInput.inputValue();
        expect(endDate).toBe('');

        await snapExpect();
    });

    test('WTY11001_12', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await expect(schedulePage.selectorsObj.mkKataInput).toHaveValue('');

        await expect(schedulePage.selectorsObj.mkKataInput).toBeDisabled();

        await snapExpect();
    });

    test('WTY11001_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await expect(schedulePage.selectorsObj.brNmInput).toHaveValue('');

        await expect(schedulePage.selectorsObj.brNmInput).toBeDisabled();

        await snapExpect();
    });

    test('WTY11001_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        const headerTable = WTY11001_headerTables;

        for (const headText of headerTable) {
            const isHeaderVisible = await schedulePage.waitForTextInBody(headText);
            expect(isHeaderVisible).toBe(true);
        }

        await snapExpect();
    });

    test('WTY11001_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickToggleDetailButton();

        await expect(schedulePage.selectorsObj.searchButton).toHaveCount(0);

        await snapExpect();
    });

    test('WTY11001_17', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);

        await schedulePage.navigate();
        await page.waitForTimeout(1000);

        await schedulePage.waitForFormReady();

        await schedulePage.clickToggleDetailButton();
        await snapInput();

        await schedulePage.clickToggleDetailButton();

        await expect(schedulePage.selectorsObj.searchButton).toHaveCount(1);

        await snapExpect();
    });

});
    