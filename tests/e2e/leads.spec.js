
const { test, expect } = require('../Support')
const { faker } = require('@faker-js/faker')


test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message)


});

test("não deve cadastrar quando o email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  // estamos a fazer o pedido á API
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })
  // estamos a validar o sucesso do pedido
  expect(newLead.ok()).toBeTruthy()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message)
});

test("não deve fazer sign in com email incorreto", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Vasco Gomes', 'vasco.gmail.com')

  await page.landing.alertHaveText('Email incorreto');
});

test("não deve fazer sign quando o nome não é preenchido", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'vasco@gmail.com')

  await page.landing.alertHaveText('Campo obrigatório')
});

test("não deve fazer sign quando o email não é preenchido", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Vasco Gomes', '')

  await page.landing.alertHaveText('Campo obrigatório')
});

test("não deve fazer sign quando nenhum campo é preenchido", async ({ page }) => {
  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  await page.landing.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
  ]);
})
