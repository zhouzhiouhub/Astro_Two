import nodemailer from 'nodemailer';
import { getMailCreds, getMailFromName } from '@/lib/config';

type SendOptions = {
  to?: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const { user, pass } = getMailCreds();
  transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendMail(opts: SendOptions) {
  const { user } = getMailCreds();
  const tr = getTransporter();
  const fromName = opts.fromName ?? getMailFromName();
  const from = `${fromName} <${user}>`;
  const to = opts.to ?? user;
  await tr.sendMail({
    from,
    to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
    sender: user,
  });
}

export async function verifyTransport() {
  const tr = getTransporter();
  return tr.verify();
}

export function maskEmail(email: string) {
  const [name, domain] = email.split('@');
  const masked = name.length <= 2 ? name[0] + '*' : name[0] + '*'.repeat(Math.max(1, name.length - 2)) + name.slice(-1);
  return `${masked}@${domain}`;
}
