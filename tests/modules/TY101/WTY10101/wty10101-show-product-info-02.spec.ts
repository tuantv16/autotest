import { test, expect, loadTestData } from '../../../base/base-test';
import { TY10101Page } from '../../../pages/TY101/wty10101.page';
import { CommonHelper, takeScreenshotOnFailure } from '../../../utils/common-helper';

test.describe('WTY10101 - Show product info', () => {
    let productInquiryPage: TY10101Page;

    test.beforeEach(async ({ page }) => {
        productInquiryPage = new TY10101Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    const commonData = CommonHelper.loadTestData('TY101/wty10101-common-data').commonData;


    test('WTY10101_47', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_47');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const productRecommendInfoLabel = await productInquiryPage.getProductRecommendInfoLabel();
        await productInquiryPage.scrollToCenter(productRecommendInfoLabel);
        await expect(productRecommendInfoLabel).toBeVisible();
        const endOfDataLabel = await productInquiryPage.getEndOfDataLabel();
        await productInquiryPage.scrollToCenter(endOfDataLabel);
        await expect(endOfDataLabel).toBeVisible();
        const productRecommendInfo = await productInquiryPage.getProductRecommendInfo();
        await expect(productRecommendInfo).toContainText(testData.expectedResults.endOfData);
        const recommendDataWrapper = await productInquiryPage.getRecommendDataWrapper();
        expect(await recommendDataWrapper.evaluate((el) => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(false);

        await snapExpect();
    });

    test('WTY10101_48', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_48');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const productRecommendInfoLabel = await productInquiryPage.getProductRecommendInfoLabel();
        await productInquiryPage.scrollToCenter(productRecommendInfoLabel);
        await expect(productRecommendInfoLabel).toBeVisible();
        const productRecommendInfo = await productInquiryPage.getProductRecommendInfo();
        await expect(productRecommendInfo).toContainText(testData.expectedResults.endOfData);
        const recommendDataWrapper = await productInquiryPage.getRecommendDataWrapper();
        expect(await recommendDataWrapper.evaluate((el) => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);

        await snapExpect();
    });

    test('WTY10101_49', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // use TC_47 data
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_47');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode_TC_49);

        await snapInput();

        const productRecommendInfoLabel = await productInquiryPage.getProductRecommendInfoLabel();
        await productInquiryPage.scrollToCenter(productRecommendInfoLabel);
        await expect(productRecommendInfoLabel).toBeVisible();
        const productRecommendInfo = await productInquiryPage.getProductRecommendInfo();
        await expect(productRecommendInfo).toContainText(testData.expectedResults.endOfData);
        const recommendDataWrapper = await productInquiryPage.getRecommendDataWrapper();
        expect(await recommendDataWrapper.evaluate((el) => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);

        await snapExpect();
    });

    test('WTY10101_50', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_50');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const guaranteeRateInput = productInquiryPage.getGuaranteeRateInput();
        await guaranteeRateInput.scrollIntoViewIfNeeded();

        const productRecommendInfo = await productInquiryPage.getProductRecommendInfoLabel();
        await expect(productRecommendInfo).not.toBeVisible();

        await snapExpect();
    });

    test('WTY10101_51', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_51');
        const expected = testData.expectedResults.electronicPrice;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const concentratedSale = await productInquiryPage.getElectronicPriceConcentratedSaleValue();
        const priceSpecify = await productInquiryPage.getElectronicPricePriceSpecifyValue();
        const couponDiscount = await productInquiryPage.getElectronicPriceCouponDiscountValue();
        const noInterestTimes = await productInquiryPage.getElectronicPriceNoInterestTimesValue();

        expect(concentratedSale.trim()).toBe(expected.concentratedSale);
        expect(priceSpecify.trim()).toBe(expected.priceSpecify);
        expect(couponDiscount.trim()).toBe(expected.couponDiscount);
        expect(noInterestTimes.trim()).toBe(expected.noInterestTimes);

        await snapExpect();
    });

    test('WTY10101_52', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_52');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        await productInquiryPage.clickRelatedProductAccordion();
        await page.waitForTimeout(500);


        const isRelatedProductTakeAwayButtonVisible = await productInquiryPage.isRelatedProductTakeAwayButtonVisible();
        const isRelatedProductDeliveryButtonVisible = await productInquiryPage.isRelatedProductDeliveryButtonVisible();
        const isRelatedProductAllButtonVisible = await productInquiryPage.isRelatedProductAllButtonVisible();
        await snapInput();

        expect(isRelatedProductTakeAwayButtonVisible).toBe(true);
        expect(isRelatedProductDeliveryButtonVisible).toBe(true);
        expect(isRelatedProductAllButtonVisible).toBe(true);

        await snapExpect();
    });

    test('WTY10101_53', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_53');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);

        const relatedProductAccordionButton = await productInquiryPage.getRelatedProductAccordionButton();
        await expect(relatedProductAccordionButton).toBeVisible();
        await productInquiryPage.clickRelatedProductAccordion();

        await productInquiryPage.clickRelatedProductTakeAwayButton();

        await snapInput();

        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.janCd)).toBeTruthy();
        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.mkKata)).toBeTruthy();
        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.registrationType)).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_54', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_54');
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_52').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickRelatedProductAccordion();
        await productInquiryPage.clickRelatedProductDeliveryButton();

        await snapInput();

        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.janCd)).toBeTruthy();
        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.mkKata)).toBeTruthy();
        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.registrationType)).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_55', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_55');
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_52').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate()
        await productInquiryPage.waitForPageReady();

        await productInquiryPage.searchProduct(testData.searchCode);
        await productInquiryPage.clickRelatedProductAccordion();
        await productInquiryPage.clickRelatedProductAllButton();

        await snapInput();

        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.janCd)).toBeTruthy();
        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.mkKata)).toBeTruthy();
        expect(await productInquiryPage.isInputWithValueVisible(testData.expectedResults.deliveryType.registrationType)).toBeTruthy();

        await snapExpect();
    });


    // test('WTY10101_56', async ({
    //     page,
    //     baseUrl,
    //     indexedDBHelper,
    //     snapInput,
    //     snapExpect,
    // }) => {
    //     const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_56');

    //     await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    //     await indexedDBHelper.initializeDB({ commonData: commonData });
    //     await page.waitForTimeout(200);

    //     await productInquiryPage.navigate();
    //     await productInquiryPage.waitForPageReady();

    //     await productInquiryPage.searchProduct(testData.searchCode);
    //     await page.waitForTimeout(1500);

    //     await productInquiryPage.clickProductImageAccordion();

    //     await snapInput();

    //     const sliderWrapper = productInquiryPage.getProductImageSliderWrapper();
    //     await expect(sliderWrapper).toBeVisible();

    //     const mainImage = productInquiryPage.getProductImageMainImage();
    //     await expect(mainImage).toBeVisible();

    //     const thumbnailCount = await productInquiryPage.getProductImageThumbnailCount();

    //     if (thumbnailCount > 1) {
    //         // If there are multiple images, navigation buttons should be visible
    //         const prevButton = productInquiryPage.getProductImagePrevButton();
    //         const nextButton = productInquiryPage.getProductImageNextButton();
    //         await expect(prevButton).toBeVisible();
    //         await expect(nextButton).toBeVisible();
    //         // Verify thumbnails are visible (at least one)
    //         expect(thumbnailCount).toBeGreaterThan(0);
    //     }



    //     await snapExpect();
    // });

    // test('WTY10101_57', async ({
    //     page,
    //     baseUrl,
    //     indexedDBHelper,
    //     snapInput,
    //     snapExpect,
    // }) => {
    //     const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_57');

    //     await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

    //     await indexedDBHelper.initializeDB({ commonData: commonData });
    //     await page.waitForTimeout(200);

    //     await productInquiryPage.navigate();
    //     await productInquiryPage.waitForPageReady();

    //     await productInquiryPage.searchProduct(testData.searchCode);
    //     await page.waitForTimeout(1500);

    //     await productInquiryPage.clickProductImageAccordion();
    //     await page.waitForTimeout(500);

    //     await snapInput();

    //     const initialImageSrc = await productInquiryPage.getProductImageMainImageSrc();
    //     expect(initialImageSrc).toBeTruthy();

    //     const thumbnailCount = await productInquiryPage.getProductImageThumbnailCount();

    //     if (thumbnailCount > 1) {
    //         await productInquiryPage.clickProductImageNext();
    //         await page.waitForTimeout(500);

    //         const newImageSrc = await productInquiryPage.getProductImageMainImageSrc();
    //         expect(newImageSrc).not.toBe(initialImageSrc);
    //         expect(newImageSrc).toBeTruthy();

    //         const prevButton = productInquiryPage.getProductImagePrevButton();
    //         await expect(prevButton).toBeVisible();
    //         // Prev button should be clickable now (not disabled)
    //         await expect(prevButton).toBeEnabled();
    //     }

    //     await snapExpect();
    // });

    test('WTY10101_59', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_59');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        await productInquiryPage.clickProductDescriptionAccordion();

        await snapInput();

        const content = productInquiryPage.getProductDescriptionContent();
        await expect(content).toBeVisible();
        await expect(content).toContainText(testData.expectedResults.description.content);

        await snapExpect();
    });

    test('WTY10101_60', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_60');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        await productInquiryPage.clickProductSpecAccordion();

        await snapInput();

        const content = productInquiryPage.getProductSpecContent();
        await expect(content).toBeVisible();
        await expect(content).toContainText(testData.expectedResults.spec.content);

        await snapExpect();
    });

    test('WTY10101_61', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_61');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        await productInquiryPage.clickProductColorAccordion();

        await snapInput();

        const section = productInquiryPage.getProductColorSection();
        await expect(section).toBeVisible();

        const labels = productInquiryPage.getProductColorLabels();
        const labelsText = await labels.allTextContents();
        const allText = labelsText.join(' ');

        expect(allText).toContain(`色: ${testData.expectedResults.color.colorValue}`);
        expect(allText).toContain(`型番: ${testData.expectedResults.color.modelNumber}`);
        expect(allText).toContain(`JAN: ${testData.expectedResults.color.janCode}`);

        await snapExpect();
    });

    test('WTY10101_62', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // use TC_61 data
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_62');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        await productInquiryPage.clickProductColorAccordion();

        const janLink = productInquiryPage.getProductColorJanLink(testData.expectedResults.janCode);
        await expect(janLink).toBeVisible();
        await janLink.click();
        await page.waitForTimeout(1500);

        await snapInput();

        const mkKata = await productInquiryPage.getModelNumber();
        const rykmkrNmKnj = await productInquiryPage.getMakerName();

        expect(mkKata).toContain(testData.expectedResults.mkKata);
        expect(rykmkrNmKnj).toContain(testData.expectedResults.rykmkrNmKnj);

        await snapExpect();
    });

    test('WTY10101_63', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_63');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);
        await page.waitForTimeout(1500);

        await productInquiryPage.clickProductMakerAccordion();

        const janLink = productInquiryPage.getProductJanLinkBySection(testData.parentClassName, testData.expectedResults.janCode);
        await expect(janLink).toBeVisible();
        await janLink.click();
        await page.waitForTimeout(1500);

        await snapInput();

        const mkKata = await productInquiryPage.getModelNumber();
        const rykmkrNmKnj = await productInquiryPage.getMakerName();

        expect(mkKata).toContain(testData.expectedResults.mkKata);
        expect(rykmkrNmKnj).toContain(testData.expectedResults.rykmkrNmKnj);

        await snapExpect();
    });

    test('WTY10101_64', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_64');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await productInquiryPage.clickProductMakerAccordion();

        const janLink = productInquiryPage.getProductJanLinkBySection(testData.parentClassName, testData.expectedResults.janCode);

        await expect(janLink).toBeVisible();
        await janLink.click();
        await page.waitForTimeout(2000);

        await snapInput();

        const mkKata = await productInquiryPage.getModelNumber();
        const rykmkrNmKnj = await productInquiryPage.getMakerName();

        expect(mkKata).toContain(testData.expectedResults.mkKata);
        expect(rykmkrNmKnj).toContain(testData.expectedResults.rykmkrNmKnj);

        await snapExpect();
    });

    test('WTY10101_65', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_65');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const normalPriceLabel = await productInquiryPage.getPriceTableValue(1, -1);
        expect(normalPriceLabel).toBe(testData.expectedResults.normalLabel);

        await productInquiryPage.getMemberPriceModeLabel().click();

        const regularPriceLabel = await productInquiryPage.getPriceTableValue(1, -1);
        expect(regularPriceLabel).toBe(testData.expectedResults.regularLabel);

        await productInquiryPage.getAnshinPriceModeLabel().click();

        const anshinPriceLabel = await productInquiryPage.getPriceTableValue(1, -1);
        expect(anshinPriceLabel).toBe(testData.expectedResults.anshinLabel);

        await snapExpect();
    });

    test('WTY10101_66', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }, testInfo) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_66');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        const responseCapture = productInquiryPage.startCapturingApiResponses();
        await productInquiryPage.searchProduct(testData.searchCode);
        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-66.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }

        await snapInput();

        const normalPriceRateR1 = await productInquiryPage.getPriceTableValue(1, 1);
        const normalPriceRateR2 = await productInquiryPage.getPriceTableValue(2, 1);
        const normalPriceRateR3 = await productInquiryPage.getPriceTableValue(3, 1);

        expect(normalPriceRateR1).toBe(testData.expectedResults.normalPriceRateR1);
        expect(normalPriceRateR2).toBe(testData.expectedResults.normalPriceRateR2);
        expect(normalPriceRateR3).toBe(testData.expectedResults.normalPriceRateR3);

        const normalPriceAmountR1 = await productInquiryPage.getPriceTableValue(1, 2);
        const normalPriceAmountR2 = await productInquiryPage.getPriceTableValue(2, 2);
        const normalPriceAmountR3 = await productInquiryPage.getPriceTableValue(3, 2);

        expect(normalPriceAmountR1).toBe(testData.expectedResults.normalPriceAmountR1);
        expect(normalPriceAmountR2).toBe(testData.expectedResults.normalPriceAmountR2);
        expect(normalPriceAmountR3).toBe(testData.expectedResults.normalPriceAmountR3);

        await snapExpect();
    });

    test('WTY10101_67', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }, testInfo) => {
        // use TC_66 data
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_66');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        const responseCapture = productInquiryPage.startCapturingApiResponses();
        await productInquiryPage.searchProduct(testData.searchCode);

        responseCapture.stop();
        if (responseCapture.responses.length > 0) {
            await testInfo.attach('api-responses-wty10101-67.json', {
                body: JSON.stringify(responseCapture.responses, null, 2),
                contentType: 'application/json'
            });
        }
        await productInquiryPage.clickLimitedPointModeLabel();

        await snapInput();

        const limitPriceAmountR1 = await productInquiryPage.getPriceTableValue(1, 4);
        const limitPriceAmountR2 = await productInquiryPage.getPriceTableValue(2, 4);
        const limitPriceAmountR3 = await productInquiryPage.getPriceTableValue(3, 4);
        expect(limitPriceAmountR1).toBe(testData.expectedResults.limitPriceAmountR1);
        expect(limitPriceAmountR2).toBe(testData.expectedResults.limitPriceAmountR2);
        expect(limitPriceAmountR3).toBe(testData.expectedResults.limitPriceAmountR3);

        const limitPriceRateR1 = await productInquiryPage.getPriceTableValue(1, 3);
        const limitPriceRateR2 = await productInquiryPage.getPriceTableValue(2, 3);
        const limitPriceRateR3 = await productInquiryPage.getPriceTableValue(3, 3);
        expect(limitPriceRateR1).toBeFalsy();
        expect(limitPriceRateR2).toBeFalsy();
        expect(limitPriceRateR3).toBeFalsy();

        await snapExpect();
    });

    test('WTY10101_68', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // use TC_66 data
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_66');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const priceTaxIncluded = await Promise.all([
            productInquiryPage.getPriceTableValue(1, 0),
            productInquiryPage.getPriceTableValue(2, 0),
            productInquiryPage.getPriceTableValue(3, 0)
        ]);

        await productInquiryPage.clickTaxExcludedModeLabel();
        await productInquiryPage.getDmDisplayToggleButton().click();
        await page.waitForTimeout(10000);

        const priceNoTax = await Promise.all([
            productInquiryPage.getPriceTableValue(1, 0),
            productInquiryPage.getPriceTableValue(2, 0),
            productInquiryPage.getPriceTableValue(3, 0)
        ]);
        for (let i = 0; i < 3; i++) {
            expect(priceTaxIncluded[i]).toBe(productInquiryPage.calculateTaxIncludedPrice(priceNoTax[i]));
        }

        await snapExpect();
    });

    test('WTY10101_69', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const limitedPointButton = productInquiryPage.getLimitedPointButton();
        await limitedPointButton.click();
        const hasPlumBg = await productInquiryPage.hasPlumBackground(limitedPointButton);
        expect(hasPlumBg).toBe(true);

        const limitedPrice1 = await productInquiryPage.getPriceTableValue(1, 4);
        const limitedPrice2 = await productInquiryPage.getPriceTableValue(2, 4);
        const limitedPrice3 = await productInquiryPage.getPriceTableValue(3, 4);
        expect(limitedPrice1).toBeTruthy();
        expect(limitedPrice2).toBeTruthy();
        expect(limitedPrice3).toBeTruthy();

        await snapExpect();
    });

    test('WTY10101_70', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_70');
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const limitedPointButton = productInquiryPage.getLimitedPointButton();
        await limitedPointButton.click();
        const hasPlumBg = await productInquiryPage.hasPlumBackground(limitedPointButton);
        expect(hasPlumBg).toBe(false);

        const limitedPrice1 = await productInquiryPage.getPriceTableValue(1, 4);
        const limitedPrice2 = await productInquiryPage.getPriceTableValue(2, 4);
        const limitedPrice3 = await productInquiryPage.getPriceTableValue(3, 4);
        expect(limitedPrice1).toBe(testData.expectedResults.limitedPrice1);
        expect(limitedPrice2).toBe(testData.expectedResults.limitedPrice2);
        expect(limitedPrice3).toBe(testData.expectedResults.limitedPrice3);

        await snapExpect();
    });

    test('WTY10101_71', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_71');
        // use TC_69 data
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        const buttonDeliveryInfo = productInquiryPage.getButtonDeliveryInfo();
        await buttonDeliveryInfo.click();

        await snapInput();

        const errorDialog = productInquiryPage.getErrorDialog();
        await expect(errorDialog).toBeVisible();

        await snapExpect();
    });

    test('WTY10101_72', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_72');
        // use TC_69 data
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const buttonDeliveryInfo = productInquiryPage.getButtonDeliveryInfo();
        const isDisabled = await buttonDeliveryInfo.isDisabled();
        expect(isDisabled).toBe(true);

        await snapExpect();
    });

    test('WTY10101_73', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_73');
        // use TC_69 data
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        const buttonDeliveryInfo = productInquiryPage.getButtonDeliveryInfo();
        await buttonDeliveryInfo.click();

        await snapInput();

        const errorDialog = productInquiryPage.getErrorDialog();
        await expect(errorDialog).toBeVisible();
        expect(errorDialog).toContainText(testData.expectedResults.message);

        await snapExpect();
    });

    test('WTY10101_74', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_74');
        // use TC_69 data
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        const buttonDeliveryInfo = productInquiryPage.getButtonDeliveryInfo();
        await buttonDeliveryInfo.click();

        await snapInput();

        const errorDialog = productInquiryPage.getErrorDialog();

        await expect(errorDialog).toBeVisible();
        expect(errorDialog).toContainText(testData.expectedResults.errorMessage);

        await snapExpect();
    });

    test('WTY10101_75', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_75');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const taxIncludedModeLabel = productInquiryPage.getTaxIncludedModeLabel();
        await expect(taxIncludedModeLabel).toBeVisible();
        const taxExcludedModeLabel = productInquiryPage.getTaxExcludedModeLabel();
        await expect(taxExcludedModeLabel).toBeVisible();

        const generalPriceModeLabel = productInquiryPage.getGeneralPriceModeLabel();
        await expect(generalPriceModeLabel).not.toBeVisible();
        const memberPriceModeLabel = productInquiryPage.getMemberPriceModeLabel();
        await expect(memberPriceModeLabel).not.toBeVisible();
        const anshinPriceModeLabel = productInquiryPage.getAnshinPriceModeLabel();
        await expect(anshinPriceModeLabel).not.toBeVisible();

        const normalPointModeLabel = productInquiryPage.getNormalPointModeLabel();
        await expect(normalPointModeLabel).not.toBeVisible();
        const limitedPointModeLabel = productInquiryPage.getLimitedPointModeLabel();
        await expect(limitedPointModeLabel).not.toBeVisible();

        await snapExpect();
    });

    test('WTY10101_76', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_76');
        // use TC_69 data
        const commonData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_69').commonData;

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const warrantyLabel = productInquiryPage.getWarrantyLabel();
        await expect(warrantyLabel).toBeVisible();
        const warrantyLabelText = await warrantyLabel.textContent();
        expect(warrantyLabelText).toBe(testData.expectedResults.warrantyLabel);

        await snapExpect();
    });

    test('WTY10101_77', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_77');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode);

        await snapInput();

        const guaranteeRate = await productInquiryPage.getGuaranteeRateValue();
        expect(guaranteeRate).toBe(testData.expectedResults.guaranteeRate);

        const guaranteeRateLabel = await productInquiryPage.getGuaranteeRateLabel().textContent();
        expect(guaranteeRateLabel).toBe(testData.expectedResults.guaranteeRateLabel);

        await snapExpect();
    });

    test('WTY10101_78', async ({
        page,
        baseUrl,
        indexedDBHelper,
        snapInput,
        snapExpect,
    }) => {
        // use TC_77 data
        const testData = loadTestData('TY101/wty10101-show-product-info', 'wty10101', 'TC_77');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await indexedDBHelper.initializeDB({ commonData: testData.commonData });
        await page.waitForTimeout(200);

        await productInquiryPage.navigate();
        await productInquiryPage.waitForPageReady();
        await productInquiryPage.searchProduct(testData.searchCode_TC_78);

        await snapInput();

        const guaranteeRate = await productInquiryPage.getGuaranteeRateValue();
        expect(guaranteeRate).toBe(testData.expectedResults.guaranteeRate_TC_78);

        const guaranteeRateLabel = await productInquiryPage.getGuaranteeRateLabel().textContent();
        expect(guaranteeRateLabel).toBe(testData.expectedResults.guaranteeRateLabel);

        await snapExpect();
    });
});
