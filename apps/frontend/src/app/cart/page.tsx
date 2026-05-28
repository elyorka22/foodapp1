'use client';

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart-store';

export default function CartPage() {
  const { items, updateQuantity, subtotal } = useCartStore();
  const deliveryFee = items.length ? 10000 : 0;
  const total = subtotal() + deliveryFee;

  return (
    <main className="mx-auto max-w-2xl space-y-4 px-4 py-4 pb-24">
      <h1 className="text-2xl font-semibold">Savatcha</h1>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-3xl bg-white p-6 text-sm text-neutral-500 shadow-[var(--shadow-soft)]">Savatchada mahsulot yo'q.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-neutral-500">{item.price.toLocaleString()} so'm</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full bg-neutral-100 px-2 py-1">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full bg-neutral-100 px-2 py-1">+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
        <div className="flex justify-between text-sm text-neutral-600"><span>Subtotal</span><span>{subtotal().toLocaleString()} so'm</span></div>
        <div className="mt-2 flex justify-between text-sm text-neutral-600"><span>Delivery</span><span>{deliveryFee.toLocaleString()} so'm</span></div>
        <div className="mt-3 flex justify-between font-semibold"><span>Jami</span><span>{total.toLocaleString()} so'm</span></div>
      </div>

      <Link href="/checkout" className="block rounded-2xl bg-[rgb(var(--primary))] py-3 text-center text-sm font-semibold text-white">
        Buyurtmani rasmiylashtirish
      </Link>
    </main>
  );
}
