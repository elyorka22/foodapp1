import { ReactNode } from 'react';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <AppFooter />
    </div>
  );
}
