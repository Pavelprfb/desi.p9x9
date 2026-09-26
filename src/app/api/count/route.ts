import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import CountModel, { ICount } from '@/models/Count';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const countDoc = await CountModel.findOne().lean<ICount>();
    return NextResponse.json({
      random: countDoc?.random || 1,
      count: countDoc?.count || 0,
    });
  } catch (error) {
    console.error('Error fetching count:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const count = body.count;

    let doc = await CountModel.findOne();

    if (!doc) {
      doc = new CountModel({ count, random: 1 });
    } else {
      doc.count = count;
      doc.random = doc.random + 1;
      if (doc.random > 5) {
        doc.random = 1;
      }
    }

    await doc.save();
    return NextResponse.json({ success: true, message: 'Count updated successfully' });
  } catch (error) {
    console.error('Error updating count:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}