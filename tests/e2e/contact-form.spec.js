import { expect, test } from '@playwright/test'

test.describe('Formulario de contato academico', () => {
  test('mostra erros especificos ao tentar enviar com campos vazios', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Enviar mensagem' }).click()

    await expect(page.locator('#fullName-error')).toHaveText('Informe seu nome completo.')
    await expect(page.locator('#email-error')).toHaveText('Informe seu e-mail.')
    await expect(page.locator('#message-error')).toHaveText('Escreva sua mensagem.')
  })

  test('remove erro do campo corrigido', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Enviar mensagem' }).click()
    await expect(page.locator('#fullName-error')).toBeVisible()

    await page.getByLabel('Nome completo').fill('Ana')
    await expect(page.locator('#fullName-error')).toHaveCount(0)

    await expect(page.locator('#email-error')).toBeVisible()
    await expect(page.locator('#message-error')).toBeVisible()
  })

  test('valida formato de e-mail', async ({ page }) => {
    await page.goto('/')

    await page.getByLabel('Nome completo').fill('Ana Clara')
    await page.getByLabel('E-mail').fill('email-invalido')
    await page.getByLabel('Mensagem').fill('Mensagem com tamanho valido.')
    await page.getByRole('button', { name: 'Enviar mensagem' }).click()

    await expect(page.locator('#email-error')).toHaveText(
      'Informe um e-mail valido, como nome@dominio.com.',
    )
  })

  test('envio valido mostra sucesso, limpa campos e nao recarrega a pagina', async ({ page }) => {
    await page.goto('/')

    const initialUrl = page.url()

    await page.getByLabel('Nome completo').fill('Ana Clara')
    await page.getByLabel('E-mail').fill('ana@dominio.com')
    await page
      .getByLabel('Mensagem')
      .fill('Gostaria de entender melhor a proposta do Vocalis.')
    await page.getByRole('button', { name: 'Enviar mensagem' }).click()

    await expect(page.getByRole('status')).toHaveText(
      'Mensagem enviada com sucesso! Em breve entraremos em contato.',
    )

    await expect(page.getByLabel('Nome completo')).toHaveValue('')
    await expect(page.getByLabel('E-mail')).toHaveValue('')
    await expect(page.getByLabel('Mensagem')).toHaveValue('')

    await expect(page).toHaveURL(initialUrl)
  })
})
