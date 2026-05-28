'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { Restaurant } from '@/types/food';

export function RestaurantCard({ item }: { item: Restaurant }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)]"
    >
      <Link href={`/restaurant/${item.id}`}>
        <div className="relative h-40 w-full">
          <Image src={item.cover} alt={item.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">{item.deliveryTime}</span>
          <button className="absolute right-3 top-3 rounded-full bg-white/85 p-2">
            <Heart className="h-4 w-4" fill={item.favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>

      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 text-base font-semibold">{item.name}</h3>
          <span className={`rounded-full px-2 py-0.5 text-xs ${item.open ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-100 text-neutral-500'}`}>
            {item.open ? 'Open' : 'Closed'}
          </span>
        </div>

        <p className="text-sm text-neutral-500">{item.category} • {item.distance}</p>

        <div className="flex items-center justify-between text-sm">
          <p className="inline-flex items-center gap-1 font-medium">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {item.rating}
          </p>
          <p className="text-emerald-600">{item.deliveryFee}</p>
        </div>
      </div>
    </motion.article>
  );
}
