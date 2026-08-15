import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/models/Testimonial';
import { verifyAdmin } from '@/lib/auth';

// GET: Fetch testimonials (approved only for public, all for admin)
export async function GET() {
  try {
    await dbConnect();
    const isAdmin = await verifyAdmin();

    const query = isAdmin ? {} : { status: 'approved' };
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(testimonials);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Submit a new testimonial (Public - goes to pending)
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    // Force status to pending for security
    const testimonialData = {
      ...body,
      status: 'pending',
    };

    const testimonial = await Testimonial.create(testimonialData);
    return NextResponse.json({ success: true, testimonial });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
