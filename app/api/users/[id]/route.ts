import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await AuthService.getUserById(params.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}