import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin-oweek');
  
  if (isAdminPath) {
    const authCookie = request.cookies.get('oweek_session');
    
    // Jika tidak ada cookie oweek_session, redirect ke halaman login
    if (!authCookie?.value) {
      return NextResponse.redirect(new URL('/login-admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-oweek/:path*'],
};
