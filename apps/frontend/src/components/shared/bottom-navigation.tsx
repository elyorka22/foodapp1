'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Home, Search, ShoppingCart, User } from 'lucide-react';

const items = [
  { href: '/', label: 'Bosh sahifa', icon: Home },
  { href: '/search', label: 'Qidirish', icon: Search },
  { href: '/cart', label: 'Savatcha', icon: ShoppingCart },
  { href: '/orders/r-1', label: 'Buyurtmalar', icon: ClipboardList },
  { href: '/profile', label: 'Profil', icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 px-3 py-2 backdrop-blur lg:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-between">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link href={item.href} className={`flex flex-col items-center gap-1 rounded-xl px-2 py-1 text-xs ${isActive ? 'text-[rgb(var(--primary))]' : 'text-neutral-500'}`}>
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
