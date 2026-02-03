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

    test('WTY11002_06', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        for (const header of WTY11002_INPUT_LABELS) {
            const checkLabel = await arriveDetailPage.waitForTextInBody(header);
            expect(checkLabel).toBe(true);
        }

        await snapExpect();
    });

    test('WTY11002_08', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_08');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const lablel1 = await arriveDetailPage.waitForTextInBody('移動依頼番号')
        expect(lablel1).toBe(true);

        const lablel2 = await arriveDetailPage.waitForTextInBody('依頼担当者名')
        expect(lablel2).toBe(true);

        await snapExpect();
    });

    test('WTY11002_09', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const lablel1 = await arriveDetailPage.waitForTextInBody('売上伝票番号')
        expect(lablel1).toBe(true);

        const lablel2 = await arriveDetailPage.waitForTextInBody('担当者名')
        expect(lablel2).toBe(true);

        await snapExpect();
    });

    test('WTY11002_10', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY110/wty11002', 'wty11002', 'TC_09');
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });
        await page.waitForTimeout(500);

        await arriveDetailPage.navigate();
        await page.waitForTimeout(1000);

        await arriveDetailPage.waitForFormReady();

        const rootKbn = await arriveDetailPage.selectorsObj.rootKbnInput.inputValue();
        expect(rootKbn).toBe("全て");

        const arriveReason = await arriveDetailPage.selectorsObj.arriveReasonInput.inputValue();
        expect(arriveReason).toBe("その他");

        const orderNo = await arriveDetailPage.selectorsObj.orderNoInput.inputValue();
        expect(orderNo).toBe("12345678");

        const slipNo = await arriveDetailPage.selectorsObj.slipNoInput.inputValue();
        expect(slipNo).toBe("98765432");

        const tanCd = await arriveDetailPage.selectorsObj.tanCdInput.inputValue();
        expect(tanCd).toBe("0001");

        const tanNm = await arriveDetailPage.selectorsObj.tanNmInput.inputValue();
        expect(tanNm).toBe("担当者太郎");

        const janCd = await arriveDetailPage.selectorsObj.janCdInput.inputValue();
        expect(janCd).toBe("4901234567890");

        const typeNo = await arriveDetailPage.selectorsObj.typeNoInput.inputValue();
        expect(typeNo).toBe("MODEL-ABC");

        const shnNm = await arriveDetailPage.selectorsObj.shnNmInput.inputValue();
        expect(shnNm).toBe("サンプル商品（テレビ 55インチ）");

        const mkNm = await arriveDetailPage.selectorsObj.mkNmInput.inputValue();
        expect(mkNm).toBe("ソニー");

        const torihikiNm = await arriveDetailPage.selectorsObj.torihikiNmInput.inputValue();
        expect(torihikiNm).toBe("ソニーマーケティング株式会社");

        const orderCnt = await arriveDetailPage.selectorsObj.orderCntInput.inputValue();
        expect(orderCnt).toBe("10");

        const arriveCnt = await arriveDetailPage.selectorsObj.arriveCntInput.inputValue();
        expect(arriveCnt).toBe("5");

        const arriveDate = await arriveDetailPage.selectorsObj.arriveDateInput.inputValue();
        expect(arriveDate).toBe("2025/01/15");

        const arriveType = await arriveDetailPage.selectorsObj.arriveTypeInput.inputValue();
        expect(arriveType).toBe("倉庫");

        const kokCd = await arriveDetailPage.selectorsObj.kokCdInput.inputValue();
        expect(kokCd).toBe("CUST001");

        const kokNm = await arriveDetailPage.selectorsObj.kokNmInput.inputValue();
        expect(kokNm).toBe("山田太郎");

        await snapExpect();
    });
});
    