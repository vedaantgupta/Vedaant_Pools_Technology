import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import { verifyAdmin } from '@/lib/auth';

// GET: Fetch all projects (optional filtering by category or featured)
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Add a new project (Protected)
export async function POST(req) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized system access' }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, project });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
