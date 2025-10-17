import { test, expect } from '../Support';


test('must log in as admin', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()
});


test('shouldnt log in with incorrect password', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'ABCD')

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.toast.containText(message)
});

test('shouldnt log in when the email is invalid', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('www.abc.com', 'pwd123')
    await page.login.alertHaveText('Email incorreto')
});

test('shouldnt log in when the email is not filled in', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'pwd123')
    await page.login.alertHaveText('Campo obrigatório')
});

test('shouldnt log in when the password is not filled in', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    await page.login.alertHaveText('Campo obrigatório')
});

test('shouldnt log in when when no field is filled in', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
});