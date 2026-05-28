import Link from 'next/link';
import { Bike, Clock3, Wallet } from 'lucide-react';
import { PageShell } from '@/components/shared/page-shell';
import { StatCard } from '@/components/shared/stat-card';

const stats = [
  { title: 'Bugungi yetkazishlar', value: '14', icon: Bike },
  { title: 'O\'rtacha vaqt', value: '27 daqiqa', icon: Clock3 },
  { title: 'Daromad', value: '368 000 so\'m', icon: Wallet },
];

export default function CourierPage() {
  return (
    <PageShell
      title="Courier panel"
      subtitle="Buyurtmalar, yo'nalish va daromadlar"
      actions={<button className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">Online</button>}
    >
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
        <h2 className="text-lg font-semibold">Yangi yetkazish so'rovlari</h2>
        <div className="mt-3 space-y-3">
          {['#9248', '#9249', '#9250'].map((id) => (
            <div key={id} className="flex flex-col gap-3 rounded-2xl bg-neutral-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Order {id}</p>
                <p className="text-sm text-neutral-500">2.4 km • 24 000 so'm</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl border border-neutral-200 px-3 py-2 text-sm">Rad etish</button>
                <Link href="/orders/r-1" className="rounded-xl bg-[rgb(var(--primary))] px-3 py-2 text-sm font-medium text-white">Qabul qilish</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
