import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_vpt_secret';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('vpt_session')?.value;

    if (!token) return false;

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.username === ADMIN_USERNAME) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}
