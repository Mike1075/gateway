"use client";
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';

export default function AdminPage() {
  const supabase = createBrowserSupabaseClient();
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const toggleLibrary = async (value: boolean) => {
    if (!userId) return setStatus('请输入用户ID');
    const { data, error } = await supabase.from('profiles').upsert({ id: userId, library_unlocked: value }, { onConflict: 'id' }).select();
    if (error) setStatus('失败：' + error.message);
    else setStatus('已更新: ' + JSON.stringify(data?.[0] || {}));
  };

  return (
    <main className="container" style={{ maxWidth: 720 }}>
      <h2>后台管理</h2>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <label className="muted">用户ID（auth.users.id）</label>
        <input placeholder="用户ID" value={userId} onChange={e=>setUserId(e.target.value)} />
        <div className="row" style={{ gap: 8 }}>
          <button onClick={() => toggleLibrary(true)}>解锁资料库</button>
          <button onClick={() => toggleLibrary(false)}>锁定资料库</button>
        </div>
        {status && <div className="muted">{status}</div>}
      </div>
      <div className="space" />
      <div className="card">
        若用户首次登录后未生成 profile，可通过此面板以用户ID创建/更新。
      </div>
    </main>
  );
}

