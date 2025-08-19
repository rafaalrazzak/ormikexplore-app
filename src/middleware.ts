import { NextRequest, NextResponse } from 'next/server';

const BYPASS_COOKIE = 'ormik_maintenance_bypass';
const BYPASS_PASSWORD = process.env.NEXT_PUBLIC_MAINTENANCE_BYPASS_PASSWORD;
export function middleware(request: NextRequest) {
     const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
     const isMaintenancePage = request.nextUrl.pathname === '/maintenance';
     const isHandscanPage = request.nextUrl.pathname === '/handscan';
     const isApiRoute = request.nextUrl.pathname.startsWith('/api');
     const isStaticAsset = request.nextUrl.pathname.startsWith('/_next') ||
          request.nextUrl.pathname.startsWith('/assets') ||
          request.nextUrl.pathname.includes('.');

     // Allow bypass if user has valid cookie
     const bypassCookie = request.cookies.get(BYPASS_COOKIE)?.value;
     if (isMaintenanceMode && bypassCookie && BYPASS_PASSWORD && bypassCookie === BYPASS_PASSWORD) {
          // Allow access to all except /maintenance (redirect ke home jika sudah login)
          if (isMaintenancePage) {
               const homeUrl = new URL('/', request.url);
               return NextResponse.redirect(homeUrl);
          }
          return NextResponse.next();
     }

     // If maintenance mode is enabled and user is not on maintenance page or handscan page
     if (isMaintenanceMode && !isMaintenancePage && !isHandscanPage && !isApiRoute && !isStaticAsset) {
          const maintenanceUrl = new URL('/maintenance', request.url);
          return NextResponse.redirect(maintenanceUrl);
     }

     // If maintenance mode is disabled and user is on maintenance page
     if (!isMaintenanceMode && isMaintenancePage) {
          const homeUrl = new URL('/', request.url);
          return NextResponse.redirect(homeUrl);
     }

     return NextResponse.next();
}

export const config = {
     matcher: [
          /*
           * Match all request paths except for the ones starting with:
           * - api (API routes)
           * - _next/static (static files)
           * - _next/image (image optimization files)
           * - favicon.ico (favicon file)
           */
          '/((?!api|_next/static|_next/image|favicon.ico).*)',
     ],
};
