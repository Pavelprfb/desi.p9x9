import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Movie from '@/models/Movie';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '8');
    let data;

    if (query) {
      data = await Movie.find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limit)
        .lean();
      if (!data.length) {
        data = await Movie.find({ hadding: { $regex: query.split(' ')[0], $options: 'i' } })
          .skip(skip)
          .limit(limit)
          .lean();
      }
    } else {
      data = await Movie.find({})
        .skip(skip)
        .limit(limit)
        .lean();
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching movies:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const title = String(body.title || '').trim();
    if (!title) {
      return NextResponse.json({ success: false, message: 'title is required' }, { status: 400 });
    }

    let routeName = String(body.routeName || '').toLowerCase().trim();
    if (!routeName) {
      routeName = title.toLowerCase().replace(/[^\w\s]/g, '').trim().replace(/\s+/g, '-');
    }

    const hadding = title;
    const img = String(body.imageLink || body.img || '').trim();
    const play = String(body.videoLink || body.video || body.play || '').trim();

    const existing = await Movie.findOne({ id: routeName });
    if (existing) {
      existing.hadding = hadding;
      existing.img = img;
      existing.play = play;
      await existing.save();
    } else {
      await Movie.create({ id: routeName, hadding, img, play });
    }

    return NextResponse.json({
      success: true,
      apiSuccess: true,
      message: 'Data saved successfully',
      routeName,
    });
  } catch (error) {
    console.error('Error saving movie:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}