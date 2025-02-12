import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routes } from '@/config/routes';

export function middleware(request: NextRequest) {
  // 获取当前路径
  const path = request.nextUrl.pathname;

  // 获取 token
  const token = request.cookies.get('token');

  // 需要认证的路径
  const authRoutes = ['/dashboard', '/profile'];

  // 公开路径
  const publicRoutes = [routes.auth.login, routes.auth.register];

  // 如果访问需要认证的路径但没有 token，重定向到登录页
  if (authRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL(routes.auth.login, request.url));
  }
  // 如果已登录用户访问登录/注册页，重定向到首页
  if (publicRoutes.includes(path as any) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
