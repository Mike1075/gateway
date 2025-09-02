"use client";
import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tracks } from '@/data/tracks';
import AudioPlayer from '@/components/AudioPlayer';
import YouTubePlayer from '@/components/YouTubePlayer';
import BiliPlayer from '@/components/BiliPlayer';
import AuthGate from '@/components/AuthGate';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';
import { useWakeLock } from '@/hooks/useWakeLock';

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const t = useMemo(() => tracks.find(x => x.id === id), [id]);
  const [intention, setIntention] = useState('');
  const [started, setStarted] = useState(false);
  const { supported: wakeLockSupported, active: wakeActive, request: requestWake, release: releaseWake } = useWakeLock();

  if (!t) return <div className="container">音频未找到：{id}</div>;


  const onSaveIntent = async () => {
    // Store intention temporarily in localStorage; it will be prefilled on journal page
    localStorage.setItem('last_intention', intention);
    setStarted(true);
  };

  const onFinished = async () => {
    // Redirect to journal page with query params
    router.push(`/journal/new?track=${encodeURIComponent(t.id)}`);
  };

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
            {/bilibili\.com/.test(t.url) ? (
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
                    ) : (
                      '此设备不支持屏幕常亮 API，请手动关闭自动锁定以避免播放中断。'
                    )}
                  </div>
                  <button onClick={onFinished}>完成并记录日志</button>
                </div>
              </div>
            ) : /youtu\.?be|youtube\.com/.test(t.url) ? (
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
                    ) : (
                      '此设备不支持屏幕常亮 API，请手动关闭自动锁定以避免播放中断。'
                    )}
                  </div>
                  <button onClick={onFinished}>完成并记录日志</button>
                </div>
              </div>
            ) : (
              <>
                <AudioPlayer src={t.url} title={`${t.title || t.id}`} />
                <div className="space" />
                <button onClick={onFinished}>完成并记录日志</button>
              </>
            )}
          </section>
        )}
      </main>
    </AuthGate>
  );
}
