/**
 * WTY11002 Check arrival detail information Test Suite
 * Tests for 入荷予定情報詳細 screen using Page Object Model
 */

import { test, expect, loadTestData } from '../../../base/base-test';
import { WTY11002Page } from '../../../pages/TY110/wty11002.page';
import { takeScreenshotOnFailure } from '../../../utils/common-helper';
import { COMMON_MESSAGES } from '../../../constants/messages';
import { WTY11001_headerTables, WTY11002_INPUT_LABELS } from '../../../pages/TY110/const/const-wty110';

test.describe('WTY11002 - Check arrival detail information (入荷予定情報詳細)', () => {
    let arriveDetailPage: WTY11002Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        arriveDetailPage = new WTY11002Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY11002_14', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_14');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const rootKbnValue = await arriveDetailPage.selectorsObj.rootKbnInput.inputValue();
        expect(rootKbnValue).toBe('メーカ直納');

        await snapExpect();
    });

    test('WTY11002_15', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_15');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const rootKbnValue = await arriveDetailPage.selectorsObj.rootKbnInput.inputValue();
        expect(rootKbnValue).toBe('補充入庫');

        await snapExpect();
    });

    test('WTY11002_16', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_16');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const rootKbnValue = await arriveDetailPage.selectorsObj.rootKbnInput.inputValue();
        expect(rootKbnValue).toBe('移動入庫');

        await snapExpect();
    });

    test('WTY11002_17', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_17');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const rootKbnValue = await arriveDetailPage.selectorsObj.rootKbnInput.inputValue();
        expect(rootKbnValue).toBe('モバイル');

        await snapExpect();
    });

    test('WTY11002_18', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_18');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const rootKbnValue = await arriveDetailPage.selectorsObj.rootKbnInput.inputValue();
        expect(rootKbnValue).toBe('全て');

        await snapExpect();
    });

    test('WTY11002_19', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_19');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const arriveReasonInput = await arriveDetailPage.selectorsObj.arriveReasonInput.inputValue();
        expect(arriveReasonInput).toBe('客注品');

        await snapExpect();
    });

    test('WTY11002_20', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_20');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const arriveReasonInput = await arriveDetailPage.selectorsObj.arriveReasonInput.inputValue();
        expect(arriveReasonInput).toBe('展示品');

        await snapExpect();
    });

    test('WTY11002_21', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_21');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const arriveReasonInput = await arriveDetailPage.selectorsObj.arriveReasonInput.inputValue();
        expect(arriveReasonInput).toBe('その他');

        await snapExpect();
    });

    test('WTY11002_22', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const orderNoInput = await arriveDetailPage.selectorsObj.orderNoInput.inputValue();
        expect(orderNoInput).toBe('ORD-12345678');

        await snapExpect();
    });

    test('WTY11002_23', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const slipNoInput = await arriveDetailPage.selectorsObj.slipNoInput.inputValue();
        expect(slipNoInput).toBe('SLIP-87654321');

        await snapExpect();
    });

    test('WTY11002_24', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const tanCdInput = await arriveDetailPage.selectorsObj.tanCdInput.inputValue();
        expect(tanCdInput).toBe('000001');

        await snapExpect();
    });

    test('WTY11002_25', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const tanNmInput = await arriveDetailPage.selectorsObj.tanNmInput.inputValue();
        expect(tanNmInput).toBe('エディオン太郎');

        await snapExpect();
    });

    test('WTY11002_26', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const janCdInput = await arriveDetailPage.selectorsObj.janCdInput.inputValue();
        expect(janCdInput).toBe('4901234567890');

        await snapExpect();
    });

    test('WTY11002_27', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const typeNoInput = await arriveDetailPage.selectorsObj.typeNoInput.inputValue();
        expect(typeNoInput).toBe('ABC-123');

        await snapExpect();
    });

    test('WTY11002_28', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const shnNmInput = await arriveDetailPage.selectorsObj.shnNmInput.inputValue();
        expect(shnNmInput).toBe('液晶テレビ');

        await snapExpect();
    });

    test('WTY11002_29', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const mkNmInput = await arriveDetailPage.selectorsObj.mkNmInput.inputValue();
        expect(mkNmInput).toBe('SHARP');

        await snapExpect();
    });

    test('WTY11002_30', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const torihikiNmInput = await arriveDetailPage.selectorsObj.torihikiNmInput.inputValue();
        expect(torihikiNmInput).toBe('仕入先A');

        await snapExpect();
    });

    test('WTY11002_31', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const orderCntInput = await arriveDetailPage.selectorsObj.orderCntInput.inputValue();
        expect(orderCntInput).toBe('10');

        await snapExpect();
    });

    test('WTY11002_32', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const arriveCnt = await arriveDetailPage.selectorsObj.arriveCntInput.inputValue();
        expect(arriveCnt).toBe('5');

        await snapExpect();
    });

    test('WTY11002_33', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_33');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();
        await arriveDetailPage.scrollToBottom();
        const orderCntInput = await arriveDetailPage.selectorsObj.orderCntInput.inputValue();
        expect(orderCntInput).toBe('');

        await snapExpect();
    });

    test('WTY11002_34', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_33');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();
        await arriveDetailPage.scrollToBottom();
        const arriveCntInput = await arriveDetailPage.selectorsObj.arriveCntInput.inputValue();
        expect(arriveCntInput).toBe('');

        await snapExpect();
    });

    test('WTY11002_35', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();
        await arriveDetailPage.scrollToBottom();

        const arriveDateInput = await arriveDetailPage.selectorsObj.arriveDateInput.inputValue();
        expect(arriveDateInput).toBe('2026/01/08');

        await snapExpect();
    });

    test('WTY11002_36', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();
        await arriveDetailPage.scrollToBottom();

        const arriveTypeInput = await arriveDetailPage.selectorsObj.arriveTypeInput.inputValue();
        expect(arriveTypeInput).toBe('納期回答');

        await snapExpect();
    });

    test('WTY11002_37', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();
        await arriveDetailPage.scrollToBottom();

        const kokCdInput = await arriveDetailPage.selectorsObj.kokCdInput.inputValue();
        expect(kokCdInput).toBe('880001');

        await snapExpect();
    });

    test('WTY11002_38', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
       const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_22');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();
        await arriveDetailPage.scrollToBottom();

        const kokNmInput = await arriveDetailPage.selectorsObj.kokNmInput.inputValue();
        expect(kokNmInput).toBe('山田花子');

        await snapExpect();
    });

});
    