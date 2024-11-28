import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { programSchema } from '@/lib/validations/program';
import { authConfig } from '@/lib/auth/config';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const body = programSchema.parse(json);

    const program = await prisma.program.create({
      data: {
        ...body,
        childcareCenterId: parseInt(params.id),
      },
    });

    return NextResponse.json(program);
  } catch (error: any) {
    console.error('Error creating program:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const programs = await prisma.program.findMany({
      where: { childcareCenterId: parseInt(params.id) },
    });
    
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}