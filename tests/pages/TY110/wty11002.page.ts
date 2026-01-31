/**
 * WTY11002 Check information
 * Page Object for 入荷予定情報詳細 screen
 */

import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { VALIDATION_ERROR_MESSAGES } from '../../constants/messages';


export class WTY11002Page extends BasePage {
    // Selectors
    protected readonly selectors = {
        headingTitle: '.text-heading-h6:has-text("入荷予定情報詳細")',
        rootKbnInput: '#rootKbn',
        arriveReasonInput: '#arriveReason',
        orderNoInput: '#orderNo',
        slipNoInput: '#slipNo',
        tanCdInput: '#tanCd',
        tanNmInput: '#tanNm',
        janCdInput: '#janCd',
        typeNoInput: '#typeNo',
        shnNmInput: '#shnNm',
        mkNmInput: '#mkNm',
        torihikiNmInput: '#torihikiNm',
        orderCntInput: '#orderCnt',
        arriveCntInput: '#arriveCnt',
        arriveDateInput: '#arriveDate',
        arriveTypeInput: '#arriveType',
        kokCdInput: '#kokCd',
        kokNmInput: 'textarea[name=kokNm]',
    };

    constructor(page: Page) {
        super(page);
    }

    get selectorsObj() {
      return {
        headingTitle: this.page.locator(this.selectors.headingTitle),
        rootKbnInput: this.page.locator(this.selectors.rootKbnInput),
        arriveReasonInput: this.page.locator(this.selectors.arriveReasonInput),
        orderNoInput: this.page.locator(this.selectors.orderNoInput),
        slipNoInput: this.page.locator(this.selectors.slipNoInput),
        tanCdInput: this.page.locator(this.selectors.tanCdInput),
        tanNmInput: this.page.locator(this.selectors.tanNmInput),
        janCdInput: this.page.locator(this.selectors.janCdInput),
        typeNoInput: this.page.locator(this.selectors.typeNoInput),
        shnNmInput: this.page.locator(this.selectors.shnNmInput),
        mkNmInput: this.page.locator(this.selectors.mkNmInput),
        torihikiNmInput: this.page.locator(this.selectors.torihikiNmInput),
        orderCntInput: this.page.locator(this.selectors.orderCntInput),
        arriveCntInput: this.page.locator(this.selectors.arriveCntInput),
        arriveDateInput: this.page.locator(this.selectors.arriveDateInput),
        arriveTypeInput: this.page.locator(this.selectors.arriveTypeInput),
        kokCdInput: this.page.locator(this.selectors.kokCdInput),
        kokNmInput: this.page.locator(this.selectors.kokNmInput),
      };
    }
    /**
     * Navigate to WTY11002 Check information screen
     */
    async navigate(pilotKey: string = 'prod'): Promise<void> {
        const url = `${this.baseUrl}/index.html?pilotkey=${pilotKey}#/WTY11002ArrivalPlanDetail`;
        await this.goto(url);
        await this.page.waitForTimeout(1000);
    }

    /**
     * Wait for page to be ready - check if heading title is visible
     */
    async waitForFormReady(): Promise<void> {
        const locator = this.page.locator(this.selectors.headingTitle);
        await this.waitForVisible(locator, 10000);
    }

    async scrollToBottom(): Promise<void> {
      await this.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      
    });
    }
}

