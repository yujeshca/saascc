import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { childcareSchema } from '@/lib/validations/childcare';
import { authConfig } from '@/lib/auth/config';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const childcare = await prisma.childcareCenter.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        programs: true,
        webPages: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!childcare) {
      return NextResponse.json(
        { error: 'Childcare center not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(childcare);
  } catch (error) {
    console.error('Error fetching childcare:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const body = childcareSchema.parse(json);

    const childcare = await prisma.childcareCenter.update({
      where: { id: parseInt(params.id) },
      data: body,
      include: {
        programs: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(childcare);
  } catch (error) {
    console.error('Error updating childcare:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.childcareCenter.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting childcare:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}