'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCartStore } from '@/lib/store/cart-store';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCartStore();
  const [address, setAddress] = useState('Toshkent, Chilonzor tumani, 20-mavze');
  const [promo, setPromo] = useState('');

  const deliveryFee = items.length ? 10000 : 0;
  const discount = promo.toUpperCase() === 'HELLO20' ? Math.round(subtotal() * 0.2) : 0;
  const total = subtotal() + deliveryFee - discount;

  return (
    <main className="mx-auto max-w-2xl space-y-4 px-4 py-4 pb-24">
      <h1 className="text-2xl font-semibold">Checkout</h1>

      <section className="space-y-3 rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
        <label className="text-sm font-medium">Manzil</label>
        <input value={address} onChange={(event) => setAddress(event.target.value)} className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-sm outline-none" />

        <label className="text-sm font-medium">Promo code</label>
        <input value={promo} onChange={(event) => setPromo(event.target.value)} className="w-full rounded-2xl border border-neutral-200 px-3 py-2 text-sm outline-none" placeholder="HELLO20" />

        <p className="text-xs text-neutral-500">To'lov turi: Naqd pul (cash only)</p>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
        <div className="flex justify-between text-sm text-neutral-600"><span>Subtotal</span><span>{subtotal().toLocaleString()} so'm</span></div>
        <div className="mt-2 flex justify-between text-sm text-neutral-600"><span>Delivery</span><span>{deliveryFee.toLocaleString()} so'm</span></div>
        <div className="mt-2 flex justify-between text-sm text-emerald-600"><span>Chegirma</span><span>-{discount.toLocaleString()} so'm</span></div>
        <div className="mt-3 flex justify-between font-semibold"><span>Jami</span><span>{total.toLocaleString()} so'm</span></div>
      </section>

      <button
        onClick={() => {
          toast.success('Buyurtma qabul qilindi');
          router.push('/orders/r-1');
        }}
        className="w-full rounded-2xl bg-[rgb(var(--primary))] py-3 text-sm font-semibold text-white"
      >
        Buyurtma berish
      </button>
    </main>
  );
}
