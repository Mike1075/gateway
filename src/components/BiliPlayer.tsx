"use client";
import { useMemo } from 'react';

function parseBvid(input: string): string | null {
  try {
    const url = new URL(input);
    const m = url.pathname.match(/\/video\/(BV[\w]+)/i);
    if (m) return m[1];
  } catch {}
  return null;
}

export default function BiliPlayer({ url, title }: { url: string; title?: string }) {
  const bvid = useMemo(() => parseBvid(url), [url]);
  const src = bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}&autoplay=0&fullscreen=1&high_quality=1` : '';
  return (
    <div className="card" style={{ padding: 0 }}>
      {title && <div style={{ padding: 12, fontWeight: 600 }}>{title}</div>}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        {bvid ? (
          <iframe
            title={title || 'Bilibili Player'}
            src={src}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            无效的 Bilibili 链接
          </div>
        )}
      </div>
    </div>
  );
}

