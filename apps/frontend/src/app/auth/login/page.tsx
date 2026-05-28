'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { http } from '@/lib/api/http';
import { useAuthStore } from '@/lib/store/auth-store';

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    role: 'USER' | 'ADMIN' | 'RESTAURANT' | 'COURIER';
  };
};

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuthStore();
  const [phone, setPhone] = useState('+998900000001');
  const [password, setPassword] = useState('Admin12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await http.post<LoginResponse>('/auth/login', { phone, password });
      setSession(data.accessToken, data.user.role);

      document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${60 * 15}; samesite=lax`;
      document.cookie = `role=${data.user.role}; path=/; max-age=${60 * 15}; samesite=lax`;
      document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;

      if (data.user.role === 'ADMIN') router.push('/admin');
      else if (data.user.role === 'RESTAURANT') router.push('/restaurant');
      else if (data.user.role === 'COURIER') router.push('/courier');
      else router.push('/');
    } catch {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[rgb(var(--bg))] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[1.1fr,1fr]">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden rounded-3xl bg-gradient-to-br from-[#FFE9D6] via-[#FFF4EA] to-white p-8 shadow-[var(--shadow-soft)] lg:block"
        >
          <h1 className="text-4xl font-semibold leading-tight">Premium Food Delivery Platform</h1>
          <p className="mt-3 text-neutral-600">Fast orders, polished UX, and real-time logistics in one dashboard.</p>
        </motion.section>

        <Card className="rounded-3xl border-0 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-2xl">Kirish</CardTitle>
            <CardDescription>Telefon raqam va parol orqali akkauntga kiring</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={onSubmit}>
              <Input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone number" />
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                type="password"
              />
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <Button className="h-11 w-full rounded-2xl" disabled={loading} type="submit">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
