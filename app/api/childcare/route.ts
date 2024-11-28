import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { childcareSchema } from '@/lib/validations/childcare';
import { authConfig } from '@/lib/auth/config';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const body = childcareSchema.parse(json);

    // Create the childcare center and connect it with the current user
    const childcare = await prisma.childcareCenter.create({
      data: {
        ...body,
        user: {
          connect: { id: (session.user as any).id }, // Connect the childcareCenter to the user
        },
      },
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
  } catch (error: any) {
    console.error('Error creating childcare center:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authConfig);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all childcare centers where the current user is connected
    const childcareCenters = await prisma.childcareCenter.findMany({
      where: {
        user: {
          id: (session.user as any).id
        }
      },
      include: {
        programs: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(childcareCenters);
  } catch (error) {
    console.error('Error fetching childcare centers:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}