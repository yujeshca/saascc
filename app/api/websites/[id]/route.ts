import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { authConfig } from '@/lib/auth/config';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const website = await prisma.website.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        webpages: true,
        header: true,
        footer: true,
        theme: true,
        menu: true,
      },
    });

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(website);
  } catch (error) {
    console.error('Error fetching website:', error);
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
    const website = await prisma.website.update({
      where: { id: parseInt(params.id) },
      data: json,
      include: {
        webpages: true,
        header: true,
        footer: true,
        theme: true,
        menu: true,
      },
    });

    return NextResponse.json(website);
  } catch (error) {
    console.error('Error updating website:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}