import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_vpt_secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// GET: Validate current session
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('vpt_session')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.username === ADMIN_USERNAME) {
      return NextResponse.json({ authenticated: true, username: decoded.username });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

// POST: Login / Logout
export async function POST(req) {
  try {
    const body = await req.json();
    const { action, username, password } = body;

    // Logout Action
    if (action === 'logout') {
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'vpt_session',
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0), // Set expiration in the past
        path: '/',
      });
      return NextResponse.json({ success: true, message: 'Logged out successfully' });
    }

    // Login Action
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
      const cookieStore = await cookies();
      
      cookieStore.set({
        name: 'vpt_session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
