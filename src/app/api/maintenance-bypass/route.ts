import { NextRequest, NextResponse } from 'next/server';
import { fetchMaintenanceConfig } from "@/utils/maintenance";

export async function POST(req: NextRequest) {
     const { password } = await req.json();
     const config = await fetchMaintenanceConfig();
     const bypassPassword = config.password;
     if (password && bypassPassword && password === bypassPassword) {
          // Set cookie for 1 day
          const res = NextResponse.json({ success: true });
          res.cookies.set('ormik_maintenance_bypass', password, {
               httpOnly: true,
               sameSite: 'lax',
               maxAge: 60 * 60 * 24,
               path: '/',
          });
          return res;
     }
     return NextResponse.json({ success: false }, { status: 401 });
}
