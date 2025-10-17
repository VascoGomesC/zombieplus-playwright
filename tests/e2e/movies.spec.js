const { test } = require('../Support')

const data = require('../Support/fixtures/movies.json')
const { executeSQL } = require('../Support/database')



test('should be able to register a new movie', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE From movies WHERE title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie)

    const message = 'Cadastro realizado com sucesso!'
    await page.toast.containText(message)
})