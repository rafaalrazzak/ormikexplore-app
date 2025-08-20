import { NextRequest, NextResponse } from 'next/server';
import { RobotsService } from '@/utils/robotsService';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    
    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Invalid content provided' },
        { status: 400 }
      );
    }

    const robotsService = RobotsService.getInstance();
    
    // Validate the content
    const validation = robotsService.validateRobotsContent(content);
    
    // Get statistics
    const stats = robotsService.getStatistics(content);
    
    return NextResponse.json({
      validation,
      stats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error validating robots.txt:', error);
    
    return NextResponse.json(
      { error: 'Internal server error during validation' },
      { status: 500 }
    );
  }
}
