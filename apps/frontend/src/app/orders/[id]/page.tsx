'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { PhoneCall, ShieldCheck } from 'lucide-react';

const statuses = ['Restoran qabul qildi', 'Tayyorlanmoqda', 'Kuryer yo\'lda', 'Yetkazildi'];

export default function OrderTrackingPage() {
  const params = useParams<{ id: string }>();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < statuses.length ? prev + 1 : prev));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-4 pb-24">
      <h1 className="text-2xl font-semibold">Buyurtma #{params.id}</h1>
      <p className="text-sm text-neutral-500">ETA: 18 daqiqa</p>

      <section className="overflow-hidden rounded-3xl bg-white p-4 shadow-[var(--shadow-card)]">
        <div className="h-56 rounded-2xl bg-gradient-to-br from-[#FFE7D5] to-[#FFF8F1] p-4">
          <p className="text-sm font-medium text-neutral-600">Map placeholder (Yandex/Google)</p>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
        <h2 className="mb-3 font-semibold">Delivery timeline</h2>
        <div className="space-y-3">
          {statuses.map((status, index) => (
            <div key={status} className="flex items-center gap-3">
              <motion.div animate={{ scale: step > index ? 1.05 : 1 }} className={`h-3 w-3 rounded-full ${step > index ? 'bg-[rgb(var(--primary))]' : 'bg-neutral-300'}`} />
              <p className={`text-sm ${step > index ? 'text-neutral-900' : 'text-neutral-500'}`}>{status}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
        <div>
          <p className="font-semibold">Azizbek Nurmatov</p>
          <p className="text-sm text-neutral-500">Courier • Scooter</p>
        </div>
        <button className="rounded-2xl bg-[rgb(var(--primary))] p-3 text-white"><PhoneCall className="h-4 w-4" /></button>
      </section>

      <button className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white">
        <ShieldCheck className="h-4 w-4" /> Support bilan bog'lanish
      </button>
    </main>
  );
}
