"use client";
import AuthGate from '@/components/AuthGate';
import { waves, tracksByWave } from '@/data/tracks';
import Link from 'next/link';

export default function GuidedPath() {
  return (
    <AuthGate>
      <main className="container">
        <h2>奥德赛星图（线性解锁示例）</h2>
        <div className="space" />
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
      </main>
    </AuthGate>
  );
}

