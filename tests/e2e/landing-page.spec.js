import { expect, test } from '@playwright/test'

test('carrega a landing page e exibe secoes principais', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Sua voz merece ser descoberta.' }),
  ).toBeVisible()
  await expect(page.locator('a[href="#beneficios"]')).toBeVisible()
  await expect(page.locator('#modulos')).toBeVisible()
  await expect(page.locator('#duvidas')).toBeVisible()
})

test('ctas principais direcionam para a secao de modulos', async ({ page }) => {
  await page.goto('/')

  const heroCta = page.getByRole('link', { name: /Conhecer as aulas/ }).first()
  await heroCta.click()
  await expect(page).toHaveURL(/#modulos$/)

  const finalCta = page.locator('a[href="#modulos"]').filter({ hasText: 'Quero' })
  await finalCta.click()
  await expect(page).toHaveURL(/#modulos$/)
})
