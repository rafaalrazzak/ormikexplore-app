import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
     const { password } = await req.json();
     const bypassPassword = process.env.NEXT_PUBLIC_MAINTENANCE_BYPASS_PASSWORD;
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
