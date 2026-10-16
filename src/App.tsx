import { useState, type FormEvent } from 'react';
import { calculateTotal, money, PRODUCTS, type CartItem, type Product } from './domain/cart';

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [orders, setOrders] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const quantity = cart.reduce((count, item) => count + item.quantity, 0);
  const total = calculateTotal(cart);

  function addProduct(product: Product) {
    setCart((current) => {
      const exists = current.some((item) => item.product.id === product.id);
      if (!exists) return [...current, { product, quantity: 1 }];
      return current.map((item) => item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 } : item);
    });
  }

  function increaseQuantity(id: string) {
    setCart((current) => current.map((item) => item.product.id === id
      ? { ...item, quantity: item.quantity + 1 } : item));
  }

  async function checkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEmailError('');
    if (cart.length === 0) {
      setEmailError('Adicione um produto para continuar.');
      return;
    }
    if (!email.includes('@')) {
      setEmailError('Informe um e-mail válido.');
      return;
    }
    setSubmitting(true);
    await pause(450);
    setOrders((current) => [...current, Date.now()]);
    setSubmitting(false);
  }

  return (
    <div className="shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Code Shield QA Lab">
          <span className="brand-mark">◆</span>
          <span><strong>CODE SHIELD</strong><small>QUALITY ENGINEERING LAB</small></span>
        </a>
        <span className="environment"><span className="live-dot"/> AMBIENTE LOCAL · QA</span>
      </header>

      <main id="inicio">
        <section className="hero">
          <div>
            <span className="eyebrow">PORTFÓLIO INTERATIVO / 001</span>
            <h1>SHIELD<span>MART</span><span className="hero-period">.</span></h1>
            <p>Uma loja fictícia. Um fluxo real de checkout. Três defeitos controlados para investigar, testar e corrigir.</p>
            <div className="hero-tags"><span>REACT + TS</span><span>VITEST</span><span>PLAYWRIGHT</span></div>
          </div>
          <aside className="hero-status">
            <div className="pulse-ring">⌘</div>
            <span>TEST ENVIRONMENT</span>
            <strong>SIMULATED</strong>
            <small>Sandbox local · Sem transações reais</small>
          </aside>
        </section>

        <div className="workspace">
          <section className="catalog" aria-label="Catálogo de produtos">
            <div className="section-heading">
              <div><span className="eyebrow">01 / SISTEMA SOB TESTE</span><h2>Vitrine</h2></div>
              <span className="section-note">03 produtos disponíveis</span>
            </div>
            <div className="product-grid">
              {PRODUCTS.map((product, index) => (
                <article className="product" key={product.id}>
                  <div className={`product-visual visual-${index}`} aria-hidden="true"><span>{product.icon}</span></div>
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer"><strong>{money(product.price)}</strong>
                    <button type="button" aria-label={`Adicionar ${product.name}`} onClick={() => addProduct(product)}>+ Adicionar</button>
                  </div>
                </article>
              ))}
            </div>
            <div className="lab-callout">
              <span className="lab-icon">⌁</span>
              <div><strong>QA SCENARIO</strong><p>Adicione produtos, altere as quantidades e tente concluir pedidos. Observe o resultado, registre evidências e isole a causa dos defeitos.</p></div>
            </div>
          </section>

          <aside className="checkout" aria-label="Carrinho e checkout">
            <div className="section-heading"><div><span className="eyebrow">02 / FLUXO CRÍTICO</span><h2>Checkout</h2></div><span className="cart-count">{quantity} itens</span></div>
            <div className="cart-items">
              {cart.length === 0 ? <p className="empty">Seu carrinho está vazio.<br/>Adicione um item para iniciar o teste.</p> :
                cart.map(({product, quantity: itemQty}) => (
                  <div className="cart-row" key={product.id}>
                    <div><strong>{product.name}</strong><small>{money(product.price)} / un.</small></div>
                    <div className="qty"><span>{itemQty}</span><button aria-label={`Aumentar quantidade de ${product.name}`} type="button" onClick={() => increaseQuantity(product.id)}>+</button></div>
                  </div>
                ))}
            </div>
            <div className="summary"><span>Total estimado</span><strong data-testid="total">{money(total)}</strong></div>
            <form onSubmit={checkout} noValidate>
              <label htmlFor="customer-email">E-mail do cliente</label>
              <input id="customer-email" type="text" inputMode="email" autoComplete="off" placeholder="cliente@exemplo.com" value={email} onChange={(event) => setEmail(event.target.value)} />
              {emailError && <p className="form-error" role="alert">{emailError}</p>}
              <button className="checkout-button" type="submit" aria-busy={submitting}>Finalizar pedido <span>↗</span></button>
            </form>
            <div className="order-info">
              <span>Pedidos simulados registrados</span>
              <strong data-testid="orders-count">{orders.length}</strong>
            </div>
            {orders.length > 0 && <p className="success" role="status">Pedido recebido no ambiente simulado.</p>}
            <div className="checkout-footnote">Nenhuma cobrança é realizada. Dados não são enviados para servidor.</div>
          </aside>
        </div>
      </main>
      <footer><span>CODE SHIELD / QA DEBUG LAB</span><span>BUILD 0.1 · CONTROLLED DEFECTS</span></footer>
    </div>
  );
}
