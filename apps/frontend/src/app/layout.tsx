import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Tezkor Food',
  description: 'Premium food delivery experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]"> 
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
