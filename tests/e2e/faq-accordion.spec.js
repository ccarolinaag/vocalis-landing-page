import { expect, test } from '@playwright/test'

test.describe('FAQ em acordeao', () => {
  test('inicia com todas as respostas fechadas', async ({ page }) => {
    await page.goto('/')

    const faqButtons = page.locator('#duvidas button[aria-controls]')
    await expect(faqButtons).toHaveCount(4)

    const count = await faqButtons.count()
    for (let index = 0; index < count; index += 1) {
      await expect(faqButtons.nth(index)).toHaveAttribute('aria-expanded', 'false')
    }
  })

  test('abre e fecha a mesma pergunta ao clicar', async ({ page }) => {
    await page.goto('/')

    const firstButton = page.getByRole('button', {
      name: /Preciso ter experi.* com canto\?/i,
    })

    await firstButton.click()
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true')

    await firstButton.click()
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('mantem apenas uma resposta aberta por vez', async ({ page }) => {
    await page.goto('/')

    const firstButton = page.getByRole('button', {
      name: /Preciso ter experi.* com canto\?/i,
    })
    const secondButton = page.getByRole('button', { name: 'Preciso de um instrumento?' })

    await firstButton.click()
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true')

    await secondButton.click()
    await expect(secondButton).toHaveAttribute('aria-expanded', 'true')
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('suporta teclado com Enter e Espaco', async ({ page }) => {
    await page.goto('/')

    const firstButton = page.getByRole('button', {
      name: /Preciso ter experi.* com canto\?/i,
    })

    await firstButton.focus()
    await page.keyboard.press('Enter')
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true')

    await page.keyboard.press('Space')
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  test('vinculos de acessibilidade entre botao e painel estao corretos', async ({ page }) => {
    await page.goto('/')

    const faqButtons = page.locator('#duvidas button[aria-controls]')
    const count = await faqButtons.count()

    for (let index = 0; index < count; index += 1) {
      const button = faqButtons.nth(index)
      const buttonId = await button.getAttribute('id')
      const controlsId = await button.getAttribute('aria-controls')

      expect(buttonId).toBeTruthy()
      expect(controlsId).toBeTruthy()

      const panel = page.locator(`#${controlsId}`)
      await expect(panel).toHaveAttribute('aria-labelledby', buttonId)
    }
  })
})
