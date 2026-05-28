'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto mt-20 max-w-md rounded-3xl bg-white p-6 text-center shadow-[var(--shadow-card)]">
      <h2 className="text-xl font-semibold">Nimadir xato ketdi</h2>
      <p className="mt-2 text-sm text-neutral-500">Sahifa yuklanmadi. Qaytadan urinib ko'ring.</p>
      <button onClick={reset} className="mt-4 rounded-2xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white">
        Qayta yuklash
      </button>
    </div>
  );
}
