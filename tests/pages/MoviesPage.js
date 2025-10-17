import { test, expect } from "@playwright/test"

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        // espera que todo o trafego de rede seja terminado, ou seja, que a pag seja toda carregada
        await this.page.waitForLoadState('networkidle')

        // valida se o URL contem a string "admin"
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create({ title, overview, company, release_year }) {
        await this.page.locator('a[href$="register"]').click()

        // quando usamos # nos locators, estamos a utilizar o id do mesmo
        // await this.page.locator('#title').fill(title)

        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        // clica no elemento dropdown "Distribuido por:"
        await this.page.locator('#select_company_id .react-select__indicator').click()
        // filtra o valor e clica nele
        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        // clica no elemento dropdown "Ano de lançamento:"
        await this.page.locator('#select_year .react-select__indicator').click()
        // filtra o valor e clica nele
        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click()

        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }
}