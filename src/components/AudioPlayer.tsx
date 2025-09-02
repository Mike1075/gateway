"use client";
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ src, title }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play();
      setPlaying(true);
    }
  };

  const mime = mimeFromUrl(src);

  return (
    <div className="card" style={{ padding: 24 }}>
      {title && <div style={{ marginBottom: 8, fontWeight: 600 }}>{title}</div>}
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        preload="auto"
        onTimeUpdate={e => setTime((e.target as HTMLAudioElement).currentTime)}
        onLoadedMetadata={e => setDuration((e.target as HTMLAudioElement).duration || 0)}
        onEnded={() => setPlaying(false)}
        onError={() => setError('音频无法播放。请确认浏览器支持该格式，或提供 mp3 / m4a 版本。')}
      >
        <source src={src} type={mime} />
      </audio>
      <div className="row" style={{ gap: 16 }}>
        <button onClick={toggle}>{playing ? '暂停' : '播放'}</button>
        <div className="muted">{formatTime(time)} / {formatTime(duration)}</div>
        <div className="row" style={{ gap: 8 }}>
          <span className="muted">音量</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="space" />
      <div className="muted">为保证最佳效果，已禁用进度拖拽。</div>
      {error && (
        <div className="muted" style={{ color: '#ff8a8a', marginTop: 8 }}>
          {error}
        </div>
      )}
    </div>
  );
}

function formatTime(s: number) {
  if (!Number.isFinite(s)) return '00:00';
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${ss}`;
}

function mimeFromUrl(u: string) {
  const m = u.toLowerCase().match(/\.([a-z0-9]+)(?:\?|#|$)/);
  const ext = m?.[1] || '';
  switch (ext) {
    case 'mp3': return 'audio/mpeg';
    case 'm4a': return 'audio/mp4';
    case 'aac': return 'audio/aac';
    case 'flac': return 'audio/flac';
    case 'wav': return 'audio/wav';
    case 'ogg': return 'audio/ogg';
    case 'opus': return 'audio/opus';
    case 'webm': return 'audio/webm';
    default: return 'audio/*';
  }
}
