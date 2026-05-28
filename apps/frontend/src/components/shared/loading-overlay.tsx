'use client';

import { Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/25 backdrop-blur-sm"
        >
          <div className="glass rounded-3xl px-6 py-4 shadow-[var(--shadow-card)]">
            <p className="inline-flex items-center gap-2 text-sm font-medium">
              <Loader2 className="h-4 w-4 animate-spin" /> Yuklanmoqda...
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
