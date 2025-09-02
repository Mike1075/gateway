"use client";
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
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
    // Assumes email confirmation is disabled in Supabase project settings
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    // Attempt immediate sign-in to streamline onboarding
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      // Fallback to sign-in screen if auto sign-in fails
      router.push('/sign-in');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="container" style={{ maxWidth: 420 }}>
      <h2>注册</h2>
      <form onSubmit={onSubmit} className="card" style={{ display: 'grid', gap: 12 }}>
        <input placeholder="邮箱" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="密码" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div className="muted" style={{ color: '#ff8a8a' }}>{error}</div>}
        <button disabled={loading}>{loading ? '注册中...' : '创建账户'}</button>
      </form>
      <div className="space" />
      <div className="muted">已有账户？ <Link href="/sign-in">去登录</Link></div>
    </main>
  );
}

