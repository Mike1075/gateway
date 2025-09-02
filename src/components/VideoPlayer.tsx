"use client";
import { useRef, useState } from 'react';

type Source = { url: string; type?: string };

export default function VideoPlayer({ sources, title }: { sources: Source[]; title?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="card" style={{ padding: 0 }}>
      {title && <div style={{ padding: 12, fontWeight: 600 }}>{title}</div>}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        <video
          ref={ref}
          controls
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onError={() => setError('视频无法播放，请检查链接或 CORS 设置。')}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {sources.map((s) => (
            <source key={s.url} src={s.url} type={s.type || 'video/mp4'} />
          ))}
        </video>
      </div>
      {error && (
        <div className="muted" style={{ color: '#ff8a8a', padding: 12 }}>{error}</div>
      )}
    </div>
  );
}

