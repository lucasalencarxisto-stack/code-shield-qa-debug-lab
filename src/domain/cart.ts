export type Product = {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
  category: string;
};

export type CartItem = { product: Product; quantity: number };

export const PRODUCTS: Product[] = [
  {
    id: 'keyboard', name: 'Teclado Mecânico', price: 150, icon: '⌨',
    description: 'Switch tátil • iluminação RGB', category: 'PERIFÉRICOS',
  },
  {
    id: 'headset', name: 'Headset Pro', price: 199, icon: '◉',
    description: 'Áudio espacial • microfone boom', category: 'ÁUDIO',
  },
  {
    id: 'mouse', name: 'Mouse Precision', price: 90, icon: '↖',
    description: '12.000 DPI • baixa latência', category: 'PERIFÉRICOS',
  },
];

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function money(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL',
  }).format(amount);
}
