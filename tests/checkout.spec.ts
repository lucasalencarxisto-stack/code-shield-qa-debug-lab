import { test, expect } from '@playwright/test';

test('SMOKE: a vitrine carrega com três produtos', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Vitrine' })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Adicionar / })).toHaveCount(3);
});

test('BUG-001: o total considera a quantidade', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Adicionar Teclado Mecânico' }).click();
  await page.getByRole('button', { name: 'Aumentar quantidade de Teclado Mecânico' }).click();
  await expect(page.getByTestId('total')).toHaveText('R$ 300,00');
});

test('BUG-002: um e-mail inválido impede checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Adicionar Teclado Mecânico' }).click();
  await page.getByLabel('E-mail do cliente').fill('cliente@');
  await page.getByRole('button', { name: 'Finalizar pedido' }).click();
  await expect(page.getByRole('alert')).toHaveText('Informe um e-mail válido.');
  await expect(page.getByTestId('orders-count')).toHaveText('0');
});

test('BUG-003: dupla submissão não duplica pedidos', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Adicionar Teclado Mecânico' }).click();
  await page.getByLabel('E-mail do cliente').fill('cliente@exemplo.com');
  await page.getByRole('button', { name: 'Finalizar pedido' }).dblclick({ delay: 80 });
  // Aguarda a conclusão das duas requisições simuladas antes de verificar o total.
  await page.waitForTimeout(800);
  await expect(page.getByTestId('orders-count')).toHaveText('1');
});
