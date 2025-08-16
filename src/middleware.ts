import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
     // Check if maintenance mode is enabled
     const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

     // Skip maintenance check for maintenance page, API routes, and static assets
     const isMaintenancePage = request.nextUrl.pathname === '/maintenance';
     const isApiRoute = request.nextUrl.pathname.startsWith('/api');
     const isStaticAsset = request.nextUrl.pathname.startsWith('/_next') ||
          request.nextUrl.pathname.startsWith('/assets') ||
          request.nextUrl.pathname.includes('.');

     // If maintenance mode is enabled and user is not on maintenance page
     if (isMaintenanceMode && !isMaintenancePage && !isApiRoute && !isStaticAsset) {
          // Redirect to maintenance page
          const maintenanceUrl = new URL('/maintenance', request.url);
          return NextResponse.redirect(maintenanceUrl);
     }

     // If maintenance mode is disabled and user is on maintenance page
     if (!isMaintenanceMode && isMaintenancePage) {
          // Redirect to home page
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
