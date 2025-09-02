"use client";
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    router.push('/dashboard');
  };

  return (
    <main className="container" style={{ maxWidth: 420 }}>
      <h2>登录</h2>
      <form onSubmit={onSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
        <input placeholder="邮箱" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="密码" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div className="muted" style={{ color: '#ff8a8a' }}>{error}</div>}
        <button disabled={loading}>{loading ? '登录中...' : '登录'}</button>
      </form>
      <div className="space" />
      <div className="muted">没有账户？ <Link href="/sign-up">注册</Link></div>
    </main>
  );
}

