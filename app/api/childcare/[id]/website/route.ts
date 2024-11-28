import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { authConfig } from '@/lib/auth/config';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const website = await prisma.website.findFirst({
      where: { childcare_id: parseInt(params.id) },
      include: {
        webpages: true,
        header: true,
        footer: true,
        theme: true,
        menu: true,
      },
    });

    if (!website) {
      // Create a new website if one doesn't exist
      const newWebsite = await prisma.website.create({
        data: {
          childcare_id: parseInt(params.id),
        },
        include: {
          webpages: true,
          header: true,
          footer: true,
          theme: true,
          menu: true,
        },
      });
      return NextResponse.json(newWebsite);
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
    const website = await prisma.website.findFirst({
      where: { childcare_id: parseInt(params.id) },
    });

    if (!website) {
      return NextResponse.json(
        { error: 'Website not found' },
        { status: 404 }
      );
    }

    const updatedWebsite = await prisma.website.update({
      where: { id: website.id },
      data: json,
      include: {
        webpages: true,
        header: true,
        footer: true,
        theme: true,
        menu: true,
      },
    });

    return NextResponse.json(updatedWebsite);
  } catch (error) {
    console.error('Error updating website:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}