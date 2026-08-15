import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Inquiry from '@/models/Inquiry';
import { verifyAdmin } from '@/lib/auth';

// GET: Fetch all B2B/B2C inquiries (Protected)
export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized system access' }, { status: 403 });
    }

    await dbConnect();
    // Populate the product details for the items
    const inquiries = await Inquiry.find({})
      .populate('items.product')
      .sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Submit a new inquiry (Public Checkout)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const { customerName, email, phone, company, message, items } = body;

    if (!customerName || !email || !phone || !items) {
      return NextResponse.json({ error: 'Missing required field details' }, { status: 400 });
    }

    const inquiry = await Inquiry.create({
      customerName,
      email,
      phone,
      company,
      message,
      items,
      status: 'pending',
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
