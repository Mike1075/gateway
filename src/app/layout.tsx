import './globals.css'
import React from 'react'

export const metadata = {
  title: '观音之旅 · 内在宇宙的探索者门户',
  description: '宁静、沉浸、引导、安全',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  )
}

