import { describe, expect, it } from 'vitest';
import { calculateTotal, PRODUCTS } from './cart';

describe('cálculo do carrinho', () => {
  it('calcula corretamente uma unidade', () => {
    expect(calculateTotal([{ product: PRODUCTS[0], quantity: 1 }])).toBe(150);
  });

  it('multiplica preço pela quantidade (BUG-001)', () => {
    expect(calculateTotal([{ product: PRODUCTS[0], quantity: 2 }])).toBe(300);
  });

  it('soma produtos diferentes e quantidades (BUG-001)', () => {
    expect(calculateTotal([
      { product: PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS[2], quantity: 1 },
    ])).toBe(390);
  });
});
