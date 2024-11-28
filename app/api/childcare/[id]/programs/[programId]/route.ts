import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { programSchema } from '@/lib/validations/program';
import { authConfig } from '@/lib/auth/config';

export async function PUT(
  request: Request,
  { params }: { params: { id: string; programId: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const body = programSchema.parse(json);

    const program = await prisma.program.update({
      where: { 
        id: parseInt(params.programId),
        childcareCenterId: parseInt(params.id),
      },
      data: body,
    });

    return NextResponse.json(program);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string; programId: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.program.delete({
      where: {
        id: parseInt(params.programId),
        childcareCenterId: parseInt(params.id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}