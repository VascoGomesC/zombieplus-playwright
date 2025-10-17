const { expect } = require('@playwright/test')

export class Toast {

    constructor(page) {
        this.page = page
    }


    async containText(message) {
        // locator com nome da classe "toast" (quando queremos por o nome de uma classe, temos que usar o ponto ".")
        const toast = this.page.locator('.toast')

        await expect(toast).toContainText(message);
        await expect(toast).not.toBeVisible({ timeout: 8000 });
    }
}