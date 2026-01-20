import { Page, Route } from '@playwright/test';

export class ApiMockHelper {
    constructor(private page: Page) {}

    async mockApiResponse(urlPattern: string, mockData: any, status: number = 200) {
        await this.page.route(urlPattern, async (route: Route) => {
            await route.fulfill({
                status: status,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async mockApiError(urlPattern: string, status: number = 500, errorMessage: string = 'Internal Server Error') {
        await this.page.route(urlPattern, async (route: Route) => {
            await route.fulfill({
                status: status,
                contentType: 'application/json',
                body: JSON.stringify({ error: errorMessage })
            });
        });
    }

    async mockApiWithDelay(urlPattern: string, mockData: any, delayMs: number = 1000) {
        await this.page.route(urlPattern, async (route: Route) => {
            await new Promise(resolve => setTimeout(resolve, delayMs));
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async abortApi(urlPattern: string) {
        await this.page.route(urlPattern, route => route.abort());
    }

    async passThrough(urlPattern: string) {
        await this.page.route(urlPattern, route => route.continue());
    }
}