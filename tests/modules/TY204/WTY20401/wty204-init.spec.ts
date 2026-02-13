/**
 * WTY20401 Test Suite
 */

import { test, expect, loadTestDataTS } from "../../../base/base-test";
import { WTY20401Page } from "../../../pages/TY204/WTY20401/wty20401.page";
import { takeScreenshotOnFailure } from "../../../utils/common-helper";

test.describe("WTY20401 - 販売区分選択 Test Suite", () => {
  let salesCategoryPage: WTY20401Page;

  test.beforeEach(async ({ page, baseUrl }) => {
    salesCategoryPage = new WTY20401Page(page);
  });

  test.afterEach(async ({ page }, testInfo) => {
    await takeScreenshotOnFailure(page, testInfo);
  });

  test("WTY20401_1", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    const testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_1');
   
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    await page.waitForTimeout(1000);

    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify: Page title displays
    const pageTitle = await salesCategoryPage.getPageTitle(); //getSectionTitle
    expect(pageTitle).toBe(true);

    // Inspec section-title: 販売区分
    const hanTypeTitle = await salesCategoryPage.getSectionTitle("han-type");
    expect(hanTypeTitle).toBe(true);

    // Inspec section-title: 会員申請
    const memberTypeTitle = await salesCategoryPage.getSectionTitle("member-type");
    expect(memberTypeTitle).toBe(true);

    // Inspec section-title: ＴＥＬフォロー
    const telTypeTitle = await salesCategoryPage.getSectionTitle("tel-type");
    expect(telTypeTitle).toBe(true);

    // Check button 確定 enabled
    const isDisabled = await salesCategoryPage.isConfirmButtonDisabled();
    expect(isDisabled).toBe(false);

    await snapExpect();
  });

  test("WTY20401_2", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    const testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_2');
   
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });
    await page.waitForTimeout(1000);

    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    // Verify error dialog appears
    await salesCategoryPage.waitForErrorDialog();
    
    // Verify error dialog is visible
    const isErrorDialogVisible = await salesCategoryPage.isErrorDialogVisible();
    expect(isErrorDialogVisible).toBe(true);

    // Get and verify error message
    const errorMessage = await salesCategoryPage.getErrorDialogMessage();
    expect(errorMessage).toContain('照会モードのため、販売区分は変更できません。');

    // Get OK button text
    const okButtonText = await salesCategoryPage.getErrorDialogOkButtonText();
    expect(okButtonText).toBe('OK');

    await snapExpect();
  });

  test("WTY20401_3", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    const testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_3');
   
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(800);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    const isSingleLifeSelected = await salesCategoryPage.isSingleLifeSelected()
    expect(isSingleLifeSelected).toBe(true);

    const isMemberTypeYesSelected = await salesCategoryPage.isMemberTypeYesSelected()
    expect(isMemberTypeYesSelected).toBe(true);

    const isTelTypeNotRequiredSelected = await salesCategoryPage.isTelTypeNotRequiredSelected()
    expect(isTelTypeNotRequiredSelected).toBe(true); 

    await snapExpect();
  });

  test("WTY20401_4", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    const testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_4');
   
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);

    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    const isGeneralPurchaseSelected = await salesCategoryPage.isGeneralPurchaseSelected()
    expect(isGeneralPurchaseSelected).toBe(true);

    const isMemberTypeNoSelected = await salesCategoryPage.isMemberTypeNoSelected()
    expect(isMemberTypeNoSelected).toBe(true);

    const selectTelTypeRequired = await salesCategoryPage.selectTelTypeRequired()
    expect(selectTelTypeRequired).toBe(true); 

    await snapExpect();
  });

  test("WTY20401_6", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_6');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    const isMemberSectionHidden  = await salesCategoryPage.isMemberTypeSectionHidden()
    expect(isMemberSectionHidden).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_7", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_7');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    const containsText = await salesCategoryPage.isMemberTypeTitleContains100ManVolt();
    expect(containsText).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_8", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_8');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    const containsText = await salesCategoryPage.isMemberTypeTitleEdionMember();
    expect(containsText).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_9", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_9');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    await salesCategoryPage.selectGeneralPurchase();

    const isSelected = await salesCategoryPage.isGeneralPurchaseSelected();
    await page.waitForTimeout(3000);
    expect(isSelected).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_10", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_9');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    await salesCategoryPage.selectGiftLabel();

    const isSelected = await salesCategoryPage.isGiftSelected();
    await page.waitForTimeout(3000);
    expect(isSelected).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_11", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_9');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    await salesCategoryPage.selectMemberTypeNo();

    const isSelected = await salesCategoryPage.isMemberTypeNoSelected();
    await page.waitForTimeout(3000);
    expect(isSelected).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_16", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_3');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    await salesCategoryPage.clickTelTypeRequired();

    const isSelected = await salesCategoryPage.selectTelTypeRequired();
    await page.waitForTimeout(3000);
    expect(isSelected).toBe(true);
  
    await snapExpect();
  });

  test("WTY20401_17", async ({ page, baseUrl, indexedDBHelper, snapInput, snapExpect }) => {

    let testData = loadTestDataTS('TY204/wty20401', 'wty20401', 'TC_17');
    
    // Login to system
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    
    await indexedDBHelper.initializeDB({
      sessionData: testData.sessionData,
      commonData: testData.commonData
    });

    await page.waitForTimeout(1000);
   
    // Open WTY20401 screen
    await salesCategoryPage.navigate();
    await page.waitForTimeout(1000);

    await snapInput();

    await salesCategoryPage.clickTelTypeNotRequired();

    const isSelected = await salesCategoryPage.isTelTypeNotRequiredSelected();
    await page.waitForTimeout(3000);
    expect(isSelected).toBe(true);
  
    await snapExpect();
  });

});
