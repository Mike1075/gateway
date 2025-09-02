"use client";
import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tracks } from '@/data/tracks';
import AudioPlayer from '@/components/AudioPlayer';
import YouTubePlayer from '@/components/YouTubePlayer';
import VideoPlayer from '@/components/VideoPlayer';
import BiliPlayer from '@/components/BiliPlayer';
import AuthGate from '@/components/AuthGate';
import { useWakeLock } from '@/hooks/useWakeLock';

type Mode = 'platform' | 'r2video' | 'audio';

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const t = useMemo(() => tracks.find(x => x.id === id), [id]);
  const [intention, setIntention] = useState('');
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<Mode>('platform');
  const { supported: wakeLockSupported, active: wakeActive, request: requestWake, release: releaseWake } = useWakeLock();

  if (!t) return <div className="container">未找到练习：{id}</div>;

  const onSaveIntent = () => {
    localStorage.setItem('last_intention', intention);
    setStarted(true);
  };

  const onFinished = () => {
    router.push(`/journal/new?track=${encodeURIComponent(t.id)}`);
  };

  const isBili = /bilibili\.com/.test(t.url);
  const isYT = /youtu\.?be|youtube\.com/.test(t.url);

  return (
    <AuthGate>
      <main className="container">
        {!started ? (
          <section className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
            <h3>练习准备：{t.title || t.id}</h3>
            <div className="muted">为获得最佳体验，请佩戴立体声耳机，选择安静、昏暗的环境。</div>
            <div className="space" />
            <label className="muted">本次探索的意图</label>
            <textarea rows={4} placeholder="写下你的意图或期望..." value={intention} onChange={e=>setIntention(e.target.value)} />
            <div className="space" />
            <button onClick={onSaveIntent}>进入沉浸式练习</button>
          </section>
        ) : (
          <section style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
            {mode === 'audio' ? (
              <>
                <AudioPlayer
                  title={`${t.title || t.id}`}
                  src={buildR2AudioSources(t.id)[0] || ''}
                  sources={buildR2AudioSources(t.id)}
                  debugLinks={buildR2AudioSources(t.id).slice(0, 3)}
                />
                <div className="space" />
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="muted">
                    {wakeLockSupported ? (
                      <>
                        屏幕常亮：{wakeActive ? '已开启' : '未开启'}
                        <span style={{ marginLeft: 8 }} />
                        {!wakeActive ? (
                          <button onClick={requestWake}>开启</button>
                        ) : (
                          <button onClick={releaseWake}>关闭</button>
                        )}
                      </>
                    ) : '此设备不支持屏幕常亮 API'}
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <button onClick={() => setMode('platform')}>切换到平台视频</button>
                    <button onClick={() => setMode('r2video')}>切换到 R2 视频</button>
                    <button onClick={onFinished}>完成并记录日志</button>
                  </div>
                </div>
              </>
            ) : mode === 'r2video' ? (
              <div style={{ width: '100%', maxWidth: 960 }}>
                <VideoPlayer title={`${t.title || t.id}`} sources={buildR2VideoSources(t.id)} />
                <div className="space" />
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="muted">
                    {wakeLockSupported ? (
                      <>
                        屏幕常亮：{wakeActive ? '已开启' : '未开启'}
                        <span style={{ marginLeft: 8 }} />
                        {!wakeActive ? (
                          <button onClick={requestWake}>开启</button>
                        ) : (
                          <button onClick={releaseWake}>关闭</button>
                        )}
                      </>
                    ) : '此设备不支持屏幕常亮 API'}
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <button onClick={() => setMode('platform')}>切换到平台视频</button>
                    <button onClick={() => setMode('audio')}>切换到音频</button>
                    <button onClick={onFinished}>完成并记录日志</button>
                  </div>
                </div>
              </div>
            ) : isBili ? (
              <div style={{ width: '100%', maxWidth: 960 }}>
                <BiliPlayer url={t.url} title={`${t.title || t.id}`} />
                <div className="space" />
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="muted">
                    {wakeLockSupported ? (
                      <>
                        屏幕常亮：{wakeActive ? '已开启' : '未开启'}
                        <span style={{ marginLeft: 8 }} />
                        {!wakeActive ? (
                          <button onClick={requestWake}>开启</button>
                        ) : (
                          <button onClick={releaseWake}>关闭</button>
                        )}
                      </>
                    ) : '此设备不支持屏幕常亮 API'}
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <button onClick={() => setMode('audio')}>切换到音频</button>
                    <button onClick={() => setMode('r2video')}>切换到 R2 视频</button>
                    <button onClick={onFinished}>完成并记录日志</button>
                  </div>
                </div>
              </div>
            ) : isYT ? (
              <div style={{ width: '100%', maxWidth: 960 }}>
                <YouTubePlayer url={t.url} title={`${t.title || t.id}`} />
                <div className="space" />
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <div className="muted">
                    {wakeLockSupported ? (
                      <>
                        屏幕常亮：{wakeActive ? '已开启' : '未开启'}
                        <span style={{ marginLeft: 8 }} />
                        {!wakeActive ? (
                          <button onClick={requestWake}>开启</button>
                        ) : (
                          <button onClick={releaseWake}>关闭</button>
                        )}
                      </>
                    ) : '此设备不支持屏幕常亮 API'}
                  </div>
                  <div className="row" style={{ gap: 8 }}>
                    <button onClick={() => setMode('audio')}>切换到音频</button>
                    <button onClick={() => setMode('r2video')}>切换到 R2 视频</button>
                    <button onClick={onFinished}>完成并记录日志</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <AudioPlayer src={t.url} title={`${t.title || t.id}`} />
                <div className="space" />
                <div className="row" style={{ gap: 8 }}>
                  <button onClick={() => setMode('audio')}>切换到音频</button>
                  <button onClick={() => setMode('r2video')}>切换到 R2 视频</button>
                  <button onClick={onFinished}>完成并记录日志</button>
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </AuthGate>
  );
}

// Compose candidate R2 video URLs (Wave I naming quirks included)
function buildR2VideoSources(id: string) {
  const base = (process.env.NEXT_PUBLIC_R2_PUBLIC_BASE || '').replace(/\/$/, '');
  const prefix = process.env.NEXT_PUBLIC_R2_PREFIX || '';
  const names = [`${id}.mp4`, `Gateway ${id}.mp4`];
  if (id === 'W1CD1') names.unshift('Gatewat W1CD1.mp4');
  const enc = (s: string) => encodeURIComponent(s).replace(/%2F/g, '/');
  const urls: { url: string; type?: string }[] = [];
  for (const n of names) {
    urls.push({ url: `${base}/${enc(n)}`, type: 'video/mp4' });
    urls.push({ url: `${base}/${prefix}${enc(n)}`, type: 'video/mp4' });
  }
  const seen = new Set<string>();
  return urls.filter(u => (seen.has(u.url) ? false : (seen.add(u.url), true)));
}

// Compose candidate R2 audio URLs with extension fallback (m4a,flac,mp3)
function buildR2AudioSources(id: string) {
  const base = (process.env.NEXT_PUBLIC_R2_PUBLIC_BASE || '').replace(/\/$/, '');
  const prefix = process.env.NEXT_PUBLIC_R2_PREFIX || '';
  const exts = (process.env.NEXT_PUBLIC_AUDIO_CANDIDATES || 'm4a,flac,mp3')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  // Known directories that可能包含音频（根据你的描述与截图）
  const dirs = [
    '',
    prefix,
    '中英文双语引导无损音频/',
    `${prefix}中英文双语引导无损音频/`,
    'gatewaym4a/',
    `${prefix}gatewaym4a/`,
  ];

  const urls: string[] = [];
  for (const ext of exts) {
    for (const dir of dirs) {
      const encodedDir = encodePath(dir);
      const file = encodeURIComponent(`${id}.${ext}`);
      urls.push(`${base}/${encodedDir}${file}`);
    }
  }
  const seen = new Set<string>();
  return urls.filter(u => (seen.has(u) ? false : (seen.add(u), true)));
}

function encodePath(p: string) {
  if (!p) return '';
  const parts = p.split('/').filter(Boolean).map(encodeURIComponent);
  return parts.length ? parts.join('/') + '/' : '';
}
