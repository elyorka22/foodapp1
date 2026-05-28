'use client';

import { Category } from '@/types/food';

export function CategorySlider({ items }: { items: Category[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex min-w-max gap-3">
        {items.map((item) => (
          <button key={item.id} className="flex w-20 flex-col items-center gap-2 rounded-2xl bg-white p-2 shadow-[var(--shadow-soft)]">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF4EA] text-xl">{item.emoji}</span>
            <span className="text-xs font-medium text-neutral-700">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
