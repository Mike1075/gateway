"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabaseClient';

export default function NewJournalPage() {
  const router = useRouter();
  const params = useSearchParams();
  const track = params.get('track') || '';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [intention, setIntention] = useState('');
  const [privacy, setPrivacy] = useState<'private'|'mentor'|'group'>('private');
  const [saving, setSaving] = useState(false);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    setIntention(localStorage.getItem('last_intention') || '');
  }, []);

  const onSave = async () => {
    setSaving(true);
    const { data: session } = await supabase.auth.getSession();
    const userId = session.session?.user.id;
    if (!userId) return;
    const { error } = await supabase.from('journals').insert({
      user_id: userId,
      title,
      content,
      intention,
      privacy,
      track_id: track
    });
    setSaving(false);
    if (!error) {
      router.push('/journal');
    } else {
      alert(error.message);
    }
  };

  return (
    <main className="container" style={{ maxWidth: 720 }}>
      <h2>记录你的星际航行</h2>
      <div className="card" style={{ display: 'grid', gap: 12 }}>
        <div className="muted">练习：{track}</div>
        <input placeholder="为这次体验命名…" value={title} onChange={e=>setTitle(e.target.value)} />
        <label className="muted">我的意图</label>
        <textarea rows={3} value={intention} onChange={e=>setIntention(e.target.value)} />
        <label className="muted">体验记录</label>
        <textarea rows={10} placeholder="你看到了什么？听到了什么？有什么洞见？" value={content} onChange={e=>setContent(e.target.value)} />
        <div className="row" style={{ gap: 16 }}>
          <label className="row"><input type="radio" name="privacy" checked={privacy==='private'} onChange={()=>setPrivacy('private')} /> 仅自己可见</label>
          <label className="row"><input type="radio" name="privacy" checked={privacy==='mentor'} onChange={()=>setPrivacy('mentor')} /> 与导师分享</label>
          <label className="row"><input type="radio" name="privacy" checked={privacy==='group'} onChange={()=>setPrivacy('group')} /> 小组匿名分享</label>
        </div>
        <button onClick={onSave} disabled={saving}>{saving ? '保存中…' : '保存这篇日志'}</button>
      </div>
    </main>
  );
}
