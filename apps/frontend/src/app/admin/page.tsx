import { Activity, Bike, Store, Wallet } from 'lucide-react';

const metrics = [
  { title: 'Bugungi buyurtmalar', value: '1,284', icon: Activity },
  { title: 'Aktiv restoranlar', value: '326', icon: Store },
  { title: 'Online kuryerlar', value: '142', icon: Bike },
  { title: 'Kunlik aylanma', value: '124 mln so\'m', icon: Wallet },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[rgb(var(--bg))] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-3xl font-semibold">Admin Analytics Dashboard</h1>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article key={metric.title} className="glass rounded-3xl border border-white/50 p-5 shadow-[var(--shadow-soft)]">
                <div className="mb-4 inline-flex rounded-2xl bg-[rgb(var(--primary))]/15 p-2 text-[rgb(var(--primary))]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm text-neutral-500">{metric.title}</p>
                <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <article className="rounded-3xl bg-white p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-xl font-semibold">Realtime Orders</h2>
            <div className="space-y-3">
              {['#9241', '#9240', '#9239', '#9238'].map((id, index) => (
                <div key={id} className="flex items-center justify-between rounded-2xl bg-neutral-50 p-3 text-sm">
                  <span>{id}</span>
                  <span>{['New', 'Preparing', 'On way', 'Delivered'][index]}</span>
                  <span>{['22 000', '55 000', '37 000', '48 000'][index]} so'm</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-white p-5 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-xl font-semibold">Courier Status</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between rounded-2xl bg-neutral-50 p-3"><span>Online</span><span className="font-medium">142</span></div>
              <div className="flex justify-between rounded-2xl bg-neutral-50 p-3"><span>Busy</span><span className="font-medium">87</span></div>
              <div className="flex justify-between rounded-2xl bg-neutral-50 p-3"><span>Offline</span><span className="font-medium">214</span></div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
