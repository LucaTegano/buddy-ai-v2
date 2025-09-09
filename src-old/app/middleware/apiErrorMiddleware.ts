// API Error Middleware
import { NextRequest, NextResponse } from 'next/server';

export function apiErrorMiddleware(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error: any) {
      console.error('API Error:', error);
      
      // Handle different types of errors
      if (error.name === 'UnauthorizedError') {
        return NextResponse.json(
          { message: 'Unauthorized access' },
          { status: 401 }
        );
      }
      
      if (error.name === 'ValidationError') {
        return NextResponse.json(
          { message: 'Validation error', details: error.details },
          { status: 400 }
        );
      }
      
      // Default error response
      return NextResponse.json(
        { message: error.message || 'Internal server error' },
        { status: 500 }
      );
    }
  };
}