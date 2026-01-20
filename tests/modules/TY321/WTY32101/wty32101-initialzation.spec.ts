import { TY32101Page } from './../../../pages/TY321/wty32101.page';
import { expect, loadTestData, test } from '../../../base/base-test';
import { ApiMockHelper } from '../../../utils/api-mock-helper';

test.describe('WTY32101 Initialzation Tests', () => {
    let PageTY32101: TY32101Page;

    test.beforeEach(async ({ page }) => {
        PageTY32101 = new TY32101Page(page);
    });

    test('TC01 - Sample Test Case', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_01');

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            sessionData: testData.sessionData,
            commonData: testData.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        await expect(page.locator('.text-heading-h5').filter({ hasText: '棚卸前処理' })).toHaveText('棚卸前処理');
    });

    test('TC02 - Test with API Mock Response', async ({ page, baseUrl, indexedDBHelper }) => {
        const testData = loadTestData('TY321/wty32101', 'wty32101', 'TC_02');
        const apiMock = new ApiMockHelper(page);

        // Mock API response
        const mockResponse = {
            "createdDate": null,
            "createdBy": null,
            "createdProgramName": null,
            "updatedDate": null,
            "updatedBy": null,
            "updatedProgramName": null,
            "modifyCount": null,
            "inDS": null,
            "outDS": {
                "resultDT": [
                    {
                        "resultKbn": "1",
                        "msgID": "TE5136",
                        "msgArg1": "棚卸情報",
                        "msgArg2": "",
                        "msgArg3": "",
                        "msgArg4": "",
                        "msgArg5": ""
                    }
                ],
                "tnorsHeadDT": [],
                "setteiInfoDT": []
            },
            "list": null,
            "userInfo": null,
            "modifyCountDouble": 0.0
        };

        // Mock API endpoint (thay đổi URL pattern theo API thực tế của bạn)
        await apiMock.mockApiResponse('**/api/**', mockResponse);

        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });

        // Inject IndexedDB data AFTER page loaded
        await indexedDBHelper.initializeDB({
            commonData: testData.commonData
        });

        // Navigate to target URL
        await PageTY32101.navigate();

        await expect(
            page.locator('#wty32101-error-dialog')
        ).toContainText('棚卸情報が存在しません。');
    });
})