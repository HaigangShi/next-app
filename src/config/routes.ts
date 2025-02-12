// 添加路由配置
export const routes = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgot: '/auth/forgot',
  },
  dashboard: '/dashboard',
  profile: '/profile',
} as const;
