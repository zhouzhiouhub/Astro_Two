export const seo = (p: { title: string; desc: string; url?: string }) => ({
  title: `${p.title} · zhouzhiou`,
  description: p.desc,
  og: { type: 'website', url: p.url ?? '', image: '/og/default.svg' },
});

