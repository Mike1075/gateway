"use client";
import AuthGate from '@/components/AuthGate';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <AuthGate>
      <main className="container">
        <h2>我的奥德赛进程</h2>
        <div className="card">
          <div>你正在探索：<b>波段 I - 发现</b></div>
          <div className="space" />
          <Link href="/path"><button>开始练习</button></Link>
        </div>
        <div className="space" />
        <div className="card">
          <h3>最近的日志</h3>
          <div className="muted">暂无日志</div>
        </div>
      </main>
    </AuthGate>
  );
}

