"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';

type Journal = { id: string; created_at: string; title: string; track_id: string };

export default function JournalListPage() {
  const [items, setItems] = useState<Journal[]>([]);
  useEffect(() => {
    (async () => {
      const supabase = createBrowserSupabaseClient();
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;
      if (!userId) return;
      const { data } = await supabase.from('journals').select('id,created_at,title,track_id').eq('user_id', userId).order('created_at', { ascending: false });
      setItems(data || []);
    })();
  }, []);

  return (
    <main className="container">
      <h2>我的日志</h2>
      <div className="card">
        {items.length === 0 && <div className="muted">暂无日志</div>}
        {items.map(j => (
          <div key={j.id} style={{ padding: '8px 0', borderBottom: '1px solid #1a2238' }}>
            <div style={{ fontWeight: 600 }}>{j.title || '(未命名)'}</div>
            <div className="muted">{new Date(j.created_at).toLocaleString()} · {j.track_id}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
