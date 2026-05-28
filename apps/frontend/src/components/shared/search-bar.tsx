'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 shadow-[var(--shadow-soft)]"
    >
      <Search className="h-5 w-5 text-neutral-400" />
      <input
        className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
        placeholder="Taom yoki restoran qidiring..."
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <button className="rounded-2xl bg-neutral-100 p-2">
        <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
      </button>
    </motion.div>
  );
}
