import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Movie from '@/models/Movie';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const excludeId = searchParams.get('excludeId') || '';
    const skip = parseInt(searchParams.get('skip') || '0');

    const videos = await Movie.aggregate([
      { $match: { id: { $ne: excludeId } } },
      { $skip: skip },
      { $limit: 8 },
    ]);

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching suggested:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}