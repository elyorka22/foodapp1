'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '@/types/food';
import { useCartStore } from '@/lib/store/cart-store';

export function ProductCard({ item }: { item: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <motion.article whileHover={{ y: -2 }} className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-soft)]">
      <Link href={`/product/${item.id}`}>
        <div className="relative h-36 w-full">
          <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
        </div>
      </Link>
      <div className="space-y-2 p-3">
        <p className="line-clamp-1 font-semibold">{item.title}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{item.price.toLocaleString()} so'm</span>
          {item.oldPrice ? <span className="text-neutral-400 line-through">{item.oldPrice.toLocaleString()} so'm</span> : null}
        </div>
        <button
          onClick={() => {
            addItem({ id: item.id, title: item.title, price: item.price });
            openCart();
          }}
          className="inline-flex items-center gap-2 rounded-2xl bg-[rgb(var(--primary))] px-3 py-2 text-sm font-medium text-white"
        >
          <Plus className="h-4 w-4" /> Savatchaga
        </button>
      </div>
    </motion.article>
  );
}
