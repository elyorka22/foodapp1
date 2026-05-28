import { BarChart3, ClipboardList, PackageSearch } from 'lucide-react';
import { PageShell } from '@/components/shared/page-shell';
import { StatCard } from '@/components/shared/stat-card';

const stats = [
  { title: 'Bugungi buyurtmalar', value: '86', icon: ClipboardList },
  { title: 'Menyudagi mahsulotlar', value: '124', icon: PackageSearch },
  { title: 'Konversiya', value: '18.7%', icon: BarChart3 },
];

export default function RestaurantPage() {
  return (
    <PageShell title="Restaurant panel" subtitle="Menyu, buyurtmalar va analytics boshqaruvi">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} icon={item.icon} />
        ))}
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
        <h2 className="text-lg font-semibold">Order queue</h2>
        <div className="mt-3 space-y-3">
          {['#9101', '#9102', '#9103', '#9104'].map((id, index) => (
            <div key={id} className="flex flex-col gap-2 rounded-2xl bg-neutral-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">Order {id}</p>
                <p className="text-sm text-neutral-500">{['Yangi', 'Tayyorlanmoqda', 'Ready', 'Yopildi'][index]}</p>
              </div>
              <button className="rounded-xl bg-[rgb(var(--primary))] px-3 py-2 text-sm font-medium text-white">Statusni yangilash</button>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
