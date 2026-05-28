'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Promo } from '@/types/food';

export function PromoBanner({ promo }: { promo: Promo }) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="relative min-w-[88%] overflow-hidden rounded-3xl bg-[#FFF4EA] p-5 shadow-[var(--shadow-soft)] snap-start"
    >
      <div className="max-w-[55%] space-y-2">
        <h3 className="text-2xl font-semibold leading-7">{promo.title}</h3>
        <p className="text-sm text-neutral-600">{promo.subtitle}</p>
        <button className="rounded-2xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white">
          {promo.cta}
        </button>
      </div>
      <div className="absolute bottom-0 right-1 h-40 w-44">
        <Image src={promo.image} alt={promo.title} fill className="rounded-2xl object-cover" sizes="176px" />
      </div>
    </motion.article>
  );
}
