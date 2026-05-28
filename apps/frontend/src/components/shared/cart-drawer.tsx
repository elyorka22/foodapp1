'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, subtotal } = useCartStore();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] rounded-t-3xl bg-white p-4 shadow-[var(--shadow-card)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Savatcha</h3>
              <button onClick={closeCart} className="rounded-full bg-neutral-100 p-2"><X className="h-4 w-4" /></button>
            </div>

            <div className="max-h-[48vh] space-y-3 overflow-y-auto pb-3">
              {items.length === 0 ? (
                <p className="text-sm text-neutral-500">Savatchangiz bo'sh.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-2xl bg-neutral-50 p-3">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-neutral-500">{item.price.toLocaleString()} so'm</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="rounded-full bg-white p-1"><Minus className="h-4 w-4" /></button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="rounded-full bg-white p-1"><Plus className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 rounded-2xl bg-neutral-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-neutral-600">Jami</span>
                <span className="font-semibold">{total.toLocaleString()} so'm</span>
              </div>
              <Link href="/checkout" onClick={closeCart} className="block rounded-2xl bg-[rgb(var(--primary))] py-3 text-center text-sm font-semibold text-white">
                Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
