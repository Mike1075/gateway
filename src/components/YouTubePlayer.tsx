"use client";
import { useMemo } from 'react';

function parseYouTubeId(input: string): string | null {
  // Supports youtu.be/<id> and youtube.com/watch?v=<id>
  try {
    const url = new URL(input);
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace(/^\//, '') || null;
    }
    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v) return v;
      const paths = url.pathname.split('/').filter(Boolean);
      const idx = paths.indexOf('embed');
      if (idx >= 0 && paths[idx + 1]) return paths[idx + 1];
    }
  } catch {}
  return null;
}

export default function YouTubePlayer({ url, title }: { url: string; title?: string }) {
  const id = useMemo(() => parseYouTubeId(url), [url]);
  const src = id
    ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
    : '';
  return (
    <div className="card" style={{ padding: 0 }}>
      {title && <div style={{ padding: 12, fontWeight: 600 }}>{title}</div>}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        {id ? (
          <iframe
            title={title || 'YouTube Player'}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            无效的 YouTube 链接
          </div>
        )}
      </div>
    </div>
  );
}

