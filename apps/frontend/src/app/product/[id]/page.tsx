'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fetchProductById } from '@/lib/mock/api';
import { useCartStore } from '@/lib/store/cart-store';
import { Product } from '@/types/food';

const extras = [
  { id: 'e1', title: 'Extra cheese', price: 6000 },
  { id: 'e2', title: 'Sauce set', price: 3000 },
  { id: 'e3', title: 'Fresh salad', price: 7000 },
];

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    fetchProductById(params.id).then(setProduct);
  }, [params.id]);

  if (product === null) {
    return <div className="p-4">Yuklanmoqda...</div>;
  }

  if (!product) {
    return <div className="p-4 text-sm text-neutral-500">Mahsulot topilmadi.</div>;
  }

  const extrasTotal = extras
    .filter((item) => selectedExtras.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const total = (product.price + extrasTotal) * quantity;

  return (
    <main className="mx-auto max-w-3xl space-y-5 px-4 py-4 pb-32">
      <Link href="/" className="text-sm text-[rgb(var(--primary))]">← Ortga</Link>
      <div className="relative h-72 w-full overflow-hidden rounded-3xl">
        <Image src={product.image} alt={product.title} fill className="object-cover" sizes="100vw" />
      </div>

      <section className="rounded-3xl bg-white p-4 shadow-[var(--shadow-card)]">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p className="mt-2 text-sm text-neutral-500">{product.description}</p>

        <div className="mt-4 space-y-2">
          <h2 className="font-semibold">Extras</h2>
          {extras.map((item) => (
            <label key={item.id} className="flex items-center justify-between rounded-2xl bg-neutral-50 px-3 py-2 text-sm">
              <span>{item.title}</span>
              <div className="flex items-center gap-2">
                <span>{item.price.toLocaleString()} so'm</span>
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(item.id)}
                  onChange={() =>
                    setSelectedExtras((prev) =>
                      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id],
                    )
                  }
                />
              </div>
            </label>
          ))}
        </div>
      </section>

      <motion.div layout className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white p-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-full bg-neutral-100 px-3 py-2">-</button>
            <span className="font-semibold">{quantity}</span>
            <button onClick={() => setQuantity((value) => value + 1)} className="rounded-full bg-neutral-100 px-3 py-2">+</button>
          </div>
          <button
            onClick={() => {
              for (let index = 0; index < quantity; index += 1) {
                addItem({ id: product.id, title: product.title, price: product.price + extrasTotal });
              }
              openCart();
            }}
            className="rounded-2xl bg-[rgb(var(--primary))] px-4 py-3 text-sm font-semibold text-white"
          >
            Savatchaga qo'shish • {total.toLocaleString()} so'm
          </button>
        </div>
      </motion.div>
    </main>
  );
}
