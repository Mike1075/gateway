"use client";
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/sign-in');
      } else {
        setReady(true);
      }
    });
  }, [router]);
  if (!ready) return null;
  return <>{children}</>;
}

