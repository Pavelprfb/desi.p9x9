import { connectDB } from '@/lib/mongodb';
import Movie from '@/models/Movie';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const movies = await Movie.find({}).lean();

    const baseUrl = 'https://desi.p9x9.com';

    const escapeXml = (unsafe: string) => {
      return String(unsafe)
        .replace(/&/g, '&')
        .replace(/</g, '<')
        .replace(/>/g, '>')
        .replace(/"/g, '"')
        .replace(/'/g, '&apos;');
    };

    let urls = `
  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

    movies.forEach((movie) => {
      try {
        if (movie.id && typeof movie.id === 'string') {
          const safeUrl = escapeXml(`${baseUrl}/movie/${encodeURIComponent(movie.id.trim())}`);
          urls += `
  <url>
    <loc>${safeUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
        }
      } catch (e) {
        console.log('Error processing movie:', movie, e);
      }
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
      },
    });
  } catch (error) {
    console.error('Sitemap error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}