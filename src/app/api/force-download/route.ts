import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get('video');
    let name = searchParams.get('name') || 'video';

    if (!videoUrl) {
      return new NextResponse('Invalid request', { status: 400 });
    }

    name = name.replace(/[^\w\d]/g, '_').substring(0, 40);

    const response = await axios({
      method: 'GET',
      url: videoUrl,
      responseType: 'stream',
    });

    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${name}.mp4"`);
    headers.set('Content-Type', 'video/mp4');

    return new NextResponse(response.data as any, { headers });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Download failed', { status: 500 });
  }
}