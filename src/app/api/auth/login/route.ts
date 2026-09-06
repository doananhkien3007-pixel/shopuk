import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_PASSWORD || '123456';

    if (password === correctPassword) {
      // In Next 15, cookies() is awaited
      const cookieStore = await cookies();
      cookieStore.set('admin_token', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Sai mật khẩu!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Lỗi server' }, { status: 500 });
  }
}
