import { NextRequest, NextResponse } from 'next/server';
import { RobotsService } from '@/utils/robotsService';

export const dynamic = 'force-dynamic';

// Function to get the base URL from the request
function getBaseUrl(request: NextRequest): string {
     const host = request.headers.get('host');
     const protocol = request.headers.get('x-forwarded-proto') ||
          (host?.includes('localhost') ? 'http' : 'https');
     return `${protocol}://${host}`;
}

export async function GET(request: NextRequest) {
     try {
          const baseUrl = getBaseUrl(request);
          const robotsService = RobotsService.getInstance();

          // Determine environment and get appropriate configuration
          const isProduction = process.env.NODE_ENV === 'production';
          const domain = process.env.NEXT_PUBLIC_DOMAIN || baseUrl;

          let config;
          if (isProduction) {
               config = robotsService.getProductionConfig(domain);
          } else {
               config = robotsService.getDevelopmentConfig();
          }

          // Generate robots.txt content
          const robotsContent = robotsService.generateRobotsContent(config);

          // Validate the generated content
          const validation = robotsService.validateRobotsContent(robotsContent);
          if (!validation.isValid) {
               console.error('Generated robots.txt has errors:', validation.errors);
          }

          // Log statistics in development
          if (!isProduction) {
               const stats = robotsService.getStatistics(robotsContent);
               console.log('Robots.txt generated with stats:', stats);
          }

          return new NextResponse(robotsContent, {
               status: 200,
               headers: {
                    'Content-Type': 'text/plain',
                    'Cache-Control': isProduction
                         ? 'public, max-age=3600, s-maxage=3600'
                         : 'public, max-age=300',
                    'X-Robots-Tag': 'noindex',
                    'X-Generated-At': new Date().toISOString(),
                    'X-Environment': isProduction ? 'production' : 'development'
               },
          });
     } catch (error) {
          console.error('Error generating robots.txt:', error);

          // Fallback robots.txt that blocks all crawling
          const fallbackContent = `# ORMIK Explore 2025 - Fallback Robots.txt
# Error occurred during generation

User-agent: *
Disallow: /
`;

          return new NextResponse(fallbackContent, {
               status: 200,
               headers: {
                    'Content-Type': 'text/plain',
                    'Cache-Control': 'public, max-age=300',
                    'X-Fallback': 'true'
               },
          });
     }
}
