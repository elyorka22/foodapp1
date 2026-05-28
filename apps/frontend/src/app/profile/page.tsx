import Link from 'next/link';
import { CreditCard, Globe2, MapPin, Moon, Settings, User } from 'lucide-react';
import { PageShell } from '@/components/shared/page-shell';

const menu = [
  { title: 'Shaxsiy ma\'lumotlar', icon: User, href: '/profile' },
  { title: 'Saqlangan manzillar', icon: MapPin, href: '/checkout' },
  { title: 'To\'lovlar tarixi', icon: CreditCard, href: '/orders/r-1' },
  { title: 'Til sozlamalari', icon: Globe2, href: '/profile' },
  { title: 'Dark mode', icon: Moon, href: '/profile' },
  { title: 'Sozlamalar', icon: Settings, href: '/profile' },
];

export default function ProfilePage() {
  return (
    <PageShell title="Profil" subtitle="Hisobingiz va sozlamalaringiz">
      <section className="rounded-3xl bg-white p-5 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-neutral-500">Foydalanuvchi</p>
        <h2 className="mt-1 text-xl font-semibold">Elyor Yusufov</h2>
        <p className="mt-1 text-sm text-neutral-500">+998 90 111 22 33</p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} href={item.href} className="flex items-center gap-3 rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
              <span className="rounded-2xl bg-[#FFF4EA] p-2 text-[rgb(var(--primary))]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
      </section>
    </PageShell>
  );
}
