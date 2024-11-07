import { NextResponse } from 'next/server';

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Wrapper for API handlers with timeout and error handling
export async function withTimeout<T>(
  handler: () => Promise<T>,
  timeoutMs: number = 30000 // 30 seconds default
): Promise<T> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new APIError('Request timeout', 504, 'TIMEOUT'));
      }, timeoutMs);
    });

    // Race between the handler and timeout
    return await Promise.race([handler(), timeoutPromise]);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    console.error('API Error:', error);
    throw new APIError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}

// Helper to handle API responses
export async function handleAPIRoute(handler: () => Promise<any>) {
  try {
    const result = await withTimeout(handler);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Route Error:', error);

    if (error instanceof APIError) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// Database connection helper with timeout
export async function withDBTimeout<T>(
  operation: () => Promise<T>,
  timeoutMs: number = 5000 // 5 seconds default for DB operations
): Promise<T> {
  return withTimeout(async () => {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof Error) {
        throw new APIError(
          'Database operation failed: ' + error.message,
          503,
          'DB_ERROR'
        );
      }
      throw error;
    }
  }, timeoutMs);
}

// Example usage in an API route:
/*
export async function GET(request: Request) {
  return handleAPIRoute(async () => {
    const data = await withDBTimeout(() => prisma.user.findMany());
    return data;
  });
}
*/
