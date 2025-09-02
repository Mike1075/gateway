"use client";
import AuthGate from '@/components/AuthGate';
import { tracks, waves, tracksByWave } from '@/data/tracks';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';

export default function Library() {
  const [unlocked, setUnlocked] = useState(false);
  useEffect(() => {
    // Check profile flag for library unlock
    const supabase = createBrowserSupabaseClient();
    (async () => {
      const { data: session } = await supabase.auth.getSession();
      const userId = session.session?.user.id;
      if (!userId) return;
      const { data } = await supabase.from('profiles').select('library_unlocked').eq('id', userId).single();
      if (data?.library_unlocked) setUnlocked(true);
    })();
  }, []);

  return (
    <AuthGate>
      <main className="container">
        <h2>探索资料库</h2>
        {!unlocked && (
          <div className="card">
            恭喜你，探索者！当你完成整个奥德赛星图的旅程后，这里的“自由探索模式”将为你开启，届时你可以随时重访任何一颗已点亮的星球。
          </div>
        )}
        {unlocked && (
          <div>
            {waves.map(w => (
              <section key={w.key} className="card" style={{ marginBottom: 12 }}>
                <h3>波段 {w.key}: {w.name}</h3>
                <div className="row" style={{ flexWrap: 'wrap', gap: 8 }}>
                  {tracksByWave(w.key).map(t => (
                    <Link key={t.id} href={`/player/${t.id}`}>
                      <div style={{ padding: '8px 10px', border: '1px solid #223', borderRadius: 8 }}>
                        {t.title || t.id}
                      </div>
                    </Link>
                  ))}
                  {tracksByWave(w.key).length === 0 && <div className="muted">待配置音频</div>}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </AuthGate>
  );
}

