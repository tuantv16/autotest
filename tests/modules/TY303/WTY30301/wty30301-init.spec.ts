import { test, expect, loadTestData } from '../../../base/base-test';
import { TY30301Page } from "../../../pages/TY303/wty30301.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe('WTY30301 - Sales In Advance Correction (マルチＰＯＰ出力指示)', () => {
    let summaryPage: TY30301Page;

    test.beforeEach(async ({ page, baseUrl }) => {
        summaryPage = new TY30301Page(page);
    });

    test.afterEach(async ({ page }, testInfo) => {
        await takeScreenshotOnFailure(page, testInfo);
    });

    test('TC06 - Screen title displays correctly: マルチＰＯＰ出力指示', async ({
        page,
        baseUrl,
    }) => {
        const expectedTitle = 'マルチＰＯＰ出力指示';
        console.log('[TEST] Running TC06 - Screen title verification');

        // Step 1: Go to base URL and wait for it to load
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2 & 3: Observe the title in the header and check the title text
        const titleFound = await summaryPage.waitForTextInBody(expectedTitle, 5000);

        // Step 4: Verify title and log result
        if (titleFound) {
            console.log(`[PASS] Screen title is displayed correctly: ${expectedTitle}`);
        } else {
            console.error(`[FAIL] Screen title is NOT displayed: ${expectedTitle}`);
        }

        expect(titleFound).toBe(true);
    });

    test('TC08 - Display menu buttons (dropdown)', async ({
        page,
        baseUrl,
    }) => {
        console.log('[TEST] Running TC08 - Display menu buttons dropdown');

        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2: Click menu button to open the dropdown
        await summaryPage.clickMenuButton();

        // Step 3: Verify menu items are displayed in the dropdown
        const menuTexts = ['削除', 'クリア', '一覧', '確定'];

        for (const text of menuTexts) {
            const isDisplayed = await summaryPage.waitForTextInBody(text);

            if (isDisplayed) {
                console.log(`[PASS] Menu item is displayed: ${text}`);
            } else {
                console.error(`[FAIL] Menu item is NOT displayed: ${text}`);
            }

            expect(isDisplayed).toBeTruthy();
        }

        console.log('[SUCCESS] All menu buttons are displayed correctly');
    });
    
    test('TC09 - Display Delete button (削除)', async ({ page, baseUrl }) => {
        console.log('[TEST] Running TC09 - Display Delete button (削除)');

        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2: Locate Delete button
        await summaryPage.clickMenuButton();
        const deleteButton = await summaryPage.findDeleteButton();

        // Step 3: Verify Delete button text is displayed
        const isTextDisplayed = await deleteButton.isVisible();
        if (isTextDisplayed) {
            console.log('[PASS] Delete button text "削除" is displayed');
        } else {
            console.error('[FAIL] Delete button text "削除" is NOT displayed');
        }
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify Delete button is active (enabled)
        const isEnabled = await deleteButton.isEnabled();
        if (isEnabled) {
            console.log('[PASS] Delete button is active (enabled)');
        } else {
            console.error('[FAIL] Delete button is NOT active (disabled)');
        }
        expect(isEnabled).toBeTruthy();

        console.log('[SUCCESS] Delete button (削除) is displayed and active');
    });

    test('TC10 - Display Clear button (クリア)', async ({ page, baseUrl }) => {
        console.log('[TEST] Running TC10 - Display Clear button (クリア)');

        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2: Locate Clear button
        await summaryPage.clickMenuButton();
        const clearButton = await summaryPage.findClearButton();

        // Step 3: Verify Clear button text is displayed
        const isTextDisplayed = await clearButton.isVisible();
        if (isTextDisplayed) {
            console.log('[PASS] Clear button text "クリア" is displayed');
        } else {
            console.error('[FAIL] Clear button text "クリア" is NOT displayed');
        }
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify Clear button is active (enabled)
        const isEnabled = await clearButton.isEnabled();
        if (isEnabled) {
            console.log('[PASS] Clear button is active (enabled)');
        } else {
            console.error('[FAIL] Clear button is NOT active (disabled)');
        }
        expect(isEnabled).toBeTruthy();

        console.log('[SUCCESS] Clear button (クリア) is displayed and active');
    });

    test('TC11 - Display List button (一覧)', async ({ page, baseUrl }) => {
        console.log('[TEST] Running TC11 - Display List button (一覧)');

        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2: Locate List button
        await summaryPage.clickMenuButton();
        const listButton = await summaryPage.findListButton();

        // Step 3: Verify List button text is displayed
        const isTextDisplayed = await listButton.isVisible();
        if (isTextDisplayed) {
            console.log('[PASS] List button text "一覧" is displayed');
        } else {
            console.error('[FAIL] List button text "一覧" is NOT displayed');
        }
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify List button is active (enabled)
        const isEnabled = await listButton.isEnabled();
        if (isEnabled) {
            console.log('[PASS] List button is active (enabled)');
        } else {
            console.error('[FAIL] List button is NOT active (disabled)');
        }
        expect(isEnabled).toBeTruthy();

        console.log('[SUCCESS] List button (一覧) is displayed and active');
    });

    test('TC12 - Display Confirm button (確定)', async ({ page, baseUrl }) => {
        console.log('[TEST] Running TC12 - Display Confirm button (確定)');

        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2: Locate Confirm button
        await summaryPage.clickMenuButton();
        const confirmButton = await summaryPage.findConfirmButton();

        // Step 3: Verify Confirm button text is displayed
        const isTextDisplayed = await confirmButton.isVisible();
        if (isTextDisplayed) {
            console.log('[PASS] Confirm button text "確定" is displayed');
        } else {
            console.error('[FAIL] Confirm button text "確定" is NOT displayed');
        }
        expect(isTextDisplayed).toBeTruthy();

        // Step 4: Verify Confirm button is active (enabled)
        const isEnabled = await confirmButton.isEnabled();
        if (isEnabled) {
            console.log('[PASS] Confirm button is active (enabled)');
        } else {
            console.error('[FAIL] Confirm button is NOT active (disabled)');
        }
        expect(isEnabled).toBeTruthy();

        console.log('[SUCCESS] Confirm button (確定) is displayed and active');
    });

    test('TC13 - Display toggle buttons and verify default state (radio)', async ({ page, baseUrl }) => {
        console.log('[TEST] Running TC13 - Toggle buttons default state verification');

        // Step 1: Navigate to WTY30301 screen
        await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await summaryPage.navigate();

        // Step 2: Locate Normal toggle
        const normalToggle = await summaryPage.findNormalToggle();
        const disposalToggle = await summaryPage.findDisposalToggle();
        console.log('[PASS] Toggle buttons "通常" and "処分品" are displayed');

        // Step 3: Verify both toggle buttons are displayed
        const isNormalTextDisplayed = await normalToggle.isVisible();
        if (isNormalTextDisplayed) {
            console.log('[PASS] Normal toggle text "通常" is displayed');
        } else {
            console.error('[FAIL] Normal toggle text "通常" is NOT displayed');
        }
        expect(isNormalTextDisplayed).toBeTruthy();

        const isDisposalTextDisplayed = await disposalToggle.isVisible();
        if (isDisposalTextDisplayed) {
            console.log('[PASS] Disposal toggle text "処分品" is displayed');
        } else {
            console.error('[FAIL] Disposal toggle text "処分品" is NOT displayed');
        }
        expect(isDisposalTextDisplayed).toBeTruthy();

        // Step 4: Verify default selected state
        const isNormalChecked = await normalToggle.isChecked();
        const isDisposalChecked = await disposalToggle.isChecked();

        if (isNormalChecked && !isDisposalChecked) {
            console.log('[PASS] Default selected toggle is "通常"');
        } else {
            console.error('[FAIL] Default toggle state is incorrect');
        }

        expect(isNormalChecked).toBe(true);
        expect(isDisposalChecked).toBe(false);

        console.log('[SUCCESS] Toggle buttons are displayed correctly with default state');
    });
});