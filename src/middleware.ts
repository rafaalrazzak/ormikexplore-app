// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const BYPASS_COOKIE = "ormik_maintenance_bypass";
const API_URL = "https://oktaa.my.id/api/maintenance-ormik";

interface MaintenanceResponse {
     maintenanceMode: boolean;
     endtime: string;
     password: string;
     message: string;
}

export async function middleware(request: NextRequest) {
     const url = request.nextUrl.pathname;

     const isMaintenancePage = url === "/maintenance";
     const isHandscanPage = url === "/handscan";
     const isApiRoute = url.startsWith("/api");
     const isStaticAsset =
          url.startsWith("/_next") ||
          url.startsWith("/assets") ||
          url.includes(".");

     let data: MaintenanceResponse | null = null;

     try {
          const res = await fetch(API_URL, { method: "GET" });
          data = await res.json();
     } catch (e) {
          console.warn("maintenance check error", e);
          return NextResponse.next();
     }

     const isMaintenanceMode = Boolean(data?.maintenanceMode);

     // cek apakah maintenance sudah selesai berdasarkan endtime
     const isOver =
          data?.endtime && new Date(data.endtime).getTime() < Date.now();

     // Jika maintenance selesai => treat as non-maintenance
     if (isOver) return NextResponse.next();

     // jika masih maintenance dan punya bypass cookie yang valid
     const bypassCookie = request.cookies.get(BYPASS_COOKIE)?.value;
     if (
          isMaintenanceMode &&
          bypassCookie &&
          bypassCookie === data?.password
     ) {
          // jika user buka /maintenance tapi sudah bypass => redirect ke home
          if (isMaintenancePage) {
               return NextResponse.redirect(new URL("/", request.url));
          }
          return NextResponse.next();
     }

     // jika maintenance aktif dan akses halaman biasa
     if (
          isMaintenanceMode &&
          !isMaintenancePage &&
          !isHandscanPage &&
          !isApiRoute &&
          !isStaticAsset
     ) {
          return NextResponse.redirect(new URL("/maintenance", request.url));
     }

     // jika maintenance off tapi user masih berada di halaman /maintenance
     if (!isMaintenanceMode && isMaintenancePage) {
          return NextResponse.redirect(new URL("/", request.url));
     }

     return NextResponse.next();
}

export const config = {
     matcher: [
          "/((?!api|_next/static|_next/image|favicon.ico).*)"
     ]
};
