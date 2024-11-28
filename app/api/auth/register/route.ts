import { NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/service';
import { registerSchema } from '@/lib/auth/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);
    
    const user = await AuthService.createUser(validatedData);
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: error.status || 500 }
    );
  }
}