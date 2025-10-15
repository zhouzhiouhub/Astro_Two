# 邮件收集与 163 邮箱配置（Astro）

本项目已内置一个邮箱收集端点与联系表单，访客可在站点“联系”页提交信息，系统通过 163 SMTP 将内容转发到你的邮箱。所有凭证存放在环境变量，避免泄露。

—

## 环境变量（必须）

在部署环境中设置以下变量（不要提交到仓库）：

- `MAIL_USER`：你的 163 邮箱账号，例如 `zhouzhiou9588@163.com`
- `MAIL_PASS`：163 邮箱“客户端授权码”
- `AUTH_ISSUED_AT`：授权码签发时间（UTC），例如 `2025-01-01T00:00:00Z`
- `AUTH_VALID_DAYS`：授权码有效天数，默认 `180`
- `ALERT_DAYS`：到期提醒触发的“剩余天数”，默认 `14,7,3,1,0,-1`
- （可选）`MAIL_FROM_NAME`：发件显示名，默认 `Contact`

本地开发可用 PowerShell 临时设置（不写入仓库）：

```
$env:MAIL_USER="zhouzhiou9588@163.com"
$env:MAIL_PASS="PCet2pdBv92Q4bhh"
$env:AUTH_ISSUED_AT="2025-01-01T00:00:00Z"
$env:AUTH_VALID_DAYS="180"
$env:ALERT_DAYS="14,7,3,1,0,-1"
```

—

## 功能说明

- 提交入口：`/[lang]/contact` 页面自带表单，提交到 `POST /api/contact`。
- 邮件转发：内容通过 163 SMTP 从 `MAIL_USER` 发送至 `MAIL_USER`，同时设置 `replyTo` 为访客的邮箱。
- 到期提醒：服务启动后每日检测授权码到期日，当“剩余天数”命中 `ALERT_DAYS` 时，向 `MAIL_USER` 发送提醒邮件（例如还剩 14/7/3/1/0 天，及过期后第 1 天）。

—

## 使用步骤

1) 在 163 邮箱开启“客户端授权码”，复制授权码。
2) 在部署平台配置上述环境变量。
3) 启动服务：

```
npm install
npm run dev
```

4) 访问 `http://localhost:4321/zh/contact`（或 `en`），填写并提交表单。
5) 到 `MAIL_USER` 收件箱查看邮件。

—

## 安全 & 提示

- 切勿将 `MAIL_PASS` 写入仓库，统一使用部署平台的环境变量功能保存。
- 建议增加：消息长度限制、人机验证（hCaptcha/Turnstile）、速率限制等防滥用措施。
- 若部署在无长驻进程的平台（纯静态/仅函数），可以改用“外部定时任务请求一个提醒 API”的方式实现到期提醒；当前实现基于 Node 运行时的定时器。

