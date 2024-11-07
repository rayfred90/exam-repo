import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test database connection
    const result = await db.$queryRaw`SELECT 1 + 1 as test`;
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Database connection successful'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to database'
    }, { status: 500 });
  }
}
