import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Function to get the base URL from the request
function getBaseUrl(request: NextRequest): string {
     const host = request.headers.get('host');
     const protocol = request.headers.get('x-forwarded-proto') || 'https';
     return `${protocol}://${host}`;
}

// Function to generate sitemap XML content
function generateSitemapContent(baseUrl: string): string {
     const currentDate = new Date().toISOString();
     const domain = process.env.NEXT_PUBLIC_DOMAIN || baseUrl;

     // Define your site's URLs with their priorities and change frequencies
     const urls = [
          {
               url: '',
               priority: '1.0',
               changefreq: 'weekly',
               lastmod: currentDate
          },
          {
               url: '/handscan',
               priority: '0.8',
               changefreq: 'monthly',
               lastmod: currentDate
          }
     ];

     const urlEntries = urls.map(({ url, priority, changefreq, lastmod }) => `
  <url>
    <loc>${domain}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

     return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

export async function GET(request: NextRequest) {
     try {
          const baseUrl = getBaseUrl(request);
          const sitemapContent = generateSitemapContent(baseUrl);

          return new NextResponse(sitemapContent, {
               status: 200,
               headers: {
                    'Content-Type': 'application/xml',
                    'Cache-Control': 'public, max-age=3600, s-maxage=3600',
               },
          });
     } catch (error) {
          console.error('Error generating sitemap:', error);

          return new NextResponse('Error generating sitemap', {
               status: 500,
               headers: {
                    'Content-Type': 'text/plain',
               },
          });
     }
}
