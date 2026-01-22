import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30301Page } from "../../../pages/TY303/wty30301.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe('WTY30301 - (マルチＰＯＰ出力指示)', () => {
    let summaryPage: TY30301Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30301Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('WTY30301_06', async ({
        page,
        baseUrl,
    }) => {
        const expectedTitle = 'マルチＰＯＰ出力指示';

        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2 & 3: Observe the title in the header and check the title text
        const titleFound = await summaryPage.waitForTextInBody(expectedTitle, 5000);

        // Step 4: Verify title and log result
        expect(titleFound).toBe(true);
    });

    test('WTY30301_08', async ({
        page,
        baseUrl,
    }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2: Click menu button to open the dropdown
        await summaryPage.clickMenuButton();

        // Step 3: Verify menu items are displayed in the dropdown
        const menuTexts = ['削除', 'クリア', '一覧', '確定'];

        for (const text of menuTexts) {
            const isDisplayed = await summaryPage.waitForTextInBody(text);
            expect(isDisplayed).toBeTruthy();
        }
    });
    
    test('WTY30301_09', async ({ page, baseUrl }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2: Locate Delete button
        await summaryPage.clickMenuButton();
        const deleteButton = await summaryPage.findDeleteButton();

        // Step 3: Verify Delete button text is displayed
        const isTextDisplayed = await deleteButton.isVisible();
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify Delete button is active (enabled)
        const isEnabled = await deleteButton.isEnabled();
        expect(isEnabled).toBeTruthy();
    });

    test('WTY30301_10', async ({ page, baseUrl }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2: Locate Clear button
        await summaryPage.clickMenuButton();
        const clearButton = await summaryPage.findClearButton();

        // Step 3: Verify Clear button text is displayed
        const isTextDisplayed = await clearButton.isVisible();
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify Clear button is active (enabled)
        const isEnabled = await clearButton.isEnabled();
        expect(isEnabled).toBeTruthy();
    });

    test('WTY30301_11', async ({ page, baseUrl }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2: Locate List button
        await summaryPage.clickMenuButton();
        const listButton = await summaryPage.findListButton();

        // Step 3: Verify List button text is displayed
        const isTextDisplayed = await listButton.isVisible();
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify List button is active (enabled)
        const isEnabled = await listButton.isEnabled();
        expect(isEnabled).toBeTruthy();
    });

    test('WTY30301_12', async ({ page, baseUrl }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2: Locate Confirm button
        await summaryPage.clickMenuButton();
        const confirmButton = await summaryPage.findConfirmButton();

        // Step 3: Verify Confirm button text is displayed
        const isTextDisplayed = await confirmButton.isVisible();
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify Confirm button is active (enabled)
        const isEnabled = await confirmButton.isEnabled();
        expect(isEnabled).toBeTruthy();
    });

    test('WTY30301_13', async ({ page, baseUrl }) => {
        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await summaryPage.navigate();

        // Step 2: Locate Normal toggle
        const normalToggle = await summaryPage.findNormalToggle();
        const disposalToggle = await summaryPage.findDisposalToggle();

        // Step 3: Verify both toggle buttons are displayed
        const isNormalTextDisplayed = await normalToggle.isVisible();
        expect(isNormalTextDisplayed).toBeTruthy();

        const isDisposalTextDisplayed = await disposalToggle.isVisible();
        expect(isDisposalTextDisplayed).toBeTruthy();

        // Step 4: Verify default selected state
        const isNormalChecked = await normalToggle.isChecked();
        const isDisposalChecked = await disposalToggle.isChecked();

        expect(isNormalChecked).toBe(true);
        expect(isDisposalChecked).toBe(false);
    });
});