"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="container">
      <header className="row" style={{ justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 700 }}>观音之旅 · 内在宇宙的探索者门户</div>
        <nav className="row" style={{ gap: 16 }}>
          <Link href="#journey">旅程介绍</Link>
          <Link href="#faq">常见问题</Link>
          <Link href="/sign-in">登录</Link>
        </nav>
      </header>
      <div className="space" />

      <section className="card" style={{ textAlign: 'center', padding: 32 }}>
        <h1>你准备好，聆听自己了吗？</h1>
        <p className="muted">克氏觉察智慧 × 门罗“网关体验” × 奥德赛日志</p>
        <div className="space" />
        <button onClick={() => router.push('/sign-up')}>立即开启我的奥德赛之旅</button>
      </section>

      <div id="journey" className="space" />
      <section className="card">
        <h2>你的探索地图</h2>
        <ul>
          <li>波段 I: 发现</li>
          <li>波段 II: 门槛</li>
          <li>波段 III: 自由</li>
          <li>波段 IV: 冒险</li>
          <li>波段 V: 探索</li>
          <li>波段 VI: 奥德赛</li>
          <li>波段 VII: 奥德赛</li>
        </ul>
      </section>

      <footer className="row" style={{ justifyContent: 'space-between', marginTop: 24 }}>
        <span className="muted">© 2025 观音之旅</span>
        <Link className="muted" href="/admin">后台管理</Link>
      </footer>
    </main>
  );
}

