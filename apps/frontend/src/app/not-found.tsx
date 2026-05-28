import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto mt-24 max-w-md rounded-3xl bg-white p-6 text-center shadow-[var(--shadow-card)]">
      <h2 className="text-xl font-semibold">Sahifa topilmadi</h2>
      <p className="mt-2 text-sm text-neutral-500">Kechirasiz, bu manzil mavjud emas.</p>
      <Link href="/" className="mt-4 inline-block rounded-2xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
