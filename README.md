# 观音之旅 · 内在宇宙的探索者门户

最小可运行网站，按 docs/PRD 要求实现核心流程：
- Supabase 邮箱密码登录/注册（默认假设项目已关闭邮件验证）
- 引导式学习路径（示例数据）
- 沉浸式播放器（禁用拖拽，音量调节）
- 练习前意图输入、练习后跳转日志录入
- 日志列表
- 资料库解锁（基于 `profiles.library_unlocked`）
- 后台管理入口 `/admin`（Basic Auth: 用户名 `admin` 密码 `Ly321*^$*`），可为指定用户解锁/锁定资料库

## 环境变量

参考 `docs/gateway环境变量.md` 与 `.env.local.example`：

```
NEXT_PUBLIC_SUPABASE_URL=https://mdtcofecutbqmoozqgfq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=... （docs 中提供）

# Cloudflare R2 公共访问
NEXT_PUBLIC_R2_PUBLIC_BASE=https://pub-5287116dd02746368327d89efe8ae146.r2.dev
NEXT_PUBLIC_R2_PREFIX=gateway/
NEXT_PUBLIC_AUDIO_EXT=flac
```

## 开发运行

1. 复制 `.env.local.example` 为 `.env.local` 并填入值。
2. 安装依赖并运行：
   - npm install
   - npm run dev
3. 打开 `http://localhost:3000`

## 数据库表（Supabase）

执行 `supabase/schema.sql` 以创建所需表与 RLS 策略：
- `profiles`（含 `library_unlocked`）
- `journals`（日志）
- `progress`（可选：进度）

注意：
- 由于使用 `anon` key，应用无法读取 `auth.users` 列表；后台通过用户ID（auth.users.id）操作 `profiles`。
- 若需自动创建 profile，可在前端首次登录后调用 upsert（本项目后台页面已支持手动 upsert）。

## 音频文件命名与访问

- 常规命名：`W{wave}CD{n}`，比如 `W1CD1.wav`、`W6CD3.wav`。
- 特例：Wave V 存在第二套（英文）在单独文件夹下（示例配置为 `WaveV_EN/CD1.wav` 等）。
- 访问 URL 由 `NEXT_PUBLIC_R2_PUBLIC_BASE` + `NEXT_PUBLIC_R2_PREFIX` + `文件名.扩展名` 拼接，扩展名可通过 `NEXT_PUBLIC_AUDIO_EXT` 配置（默认 `flac`）。
- 如实际路径/文件名不同，请修改 `src/data/tracks.ts` 中的条目。
- 浏览器兼容性提示：
  - 桌面 Chrome/Edge 对 FLAC 支持较好，但 Safari/iOS 普遍不支持 FLAC。
  - 若需全平台兼容，建议提供 `m4a(AAC)` 或 `mp3` 版本，并将 `NEXT_PUBLIC_AUDIO_EXT` 改为对应扩展；或在 R2 中同时上传多种格式并在前端按需切换。
  - 确认 R2 返回正确的 `Content-Type`（如 `audio/flac`、`audio/mpeg`），并开启 CORS 允许 `GET, HEAD`、`Range` 请求。

## 页面结构

- `/` 登陆页/概览
- `/sign-in` 登录；`/sign-up` 注册
- `/dashboard` 仪表盘
- `/path` 学习路径（示例数据）
- `/library` 资料库（需解锁）
- `/player/[id]` 播放器页（练习前意图、播放、完成后跳转日志）
- `/journal/new` 新建日志；`/journal` 日志列表
- `/admin` 后台（Basic Auth）

## 资源中心

docs/参考文档 下包含 PDF/MD 文件。若需线上访问，请将需要公开的文件复制到 `public/resources/` 并在页面中添加链接（当前未内置拷贝二进制文件）。

## 未来增强

- 完整音频清单与元数据填充
- 线性解锁逻辑与进度上报（利用 `progress`）
- Onboarding 引导页
- 更丰富的播放器与背景视觉
- RLS 与安全审查完善（mentor/group 权限等）
