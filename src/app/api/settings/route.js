import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';
import { verifyAdmin } from '@/lib/auth';

// GET: Fetch setting by key
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (!key) {
      // If no key is provided, return all settings
      const settings = await Setting.find({});
      return NextResponse.json(settings);
    }

    const setting = await Setting.findOne({ key });
    if (!setting) {
      return NextResponse.json({ key, value: null });
    }

    return NextResponse.json(setting);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Save or update a setting (Protected)
export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized system access' }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const { key, value } = body;

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    const setting = await Setting.findOneAndUpdate(
      { key },
      { key, value },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, setting });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
