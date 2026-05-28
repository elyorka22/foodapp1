import Link from 'next/link';

export default function OfflinePage() {
  return (
    <main className="mx-auto mt-20 max-w-md rounded-3xl bg-white p-6 text-center shadow-[var(--shadow-card)]">
      <h1 className="text-2xl font-semibold">Internet yo'q</h1>
      <p className="mt-2 text-sm text-neutral-500">Tarmoq qayta tiklangach, davom etishingiz mumkin.</p>
      <Link href="/" className="mt-4 inline-block rounded-2xl bg-[rgb(var(--primary))] px-4 py-2 text-sm font-medium text-white">
        Qaytish
      </Link>
    </main>
  );
}
