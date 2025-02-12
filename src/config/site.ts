// 添加站点配置
export const siteConfig = {
  name: 'Next.js App',
  description: 'Modern web application template built with Next.js',
  url: process.env.NEXT_PUBLIC_SITE_URL,
  ogImage: '/og.jpg',
  links: {
    github: 'https://github.com/your-repo',
  },
} as const;
