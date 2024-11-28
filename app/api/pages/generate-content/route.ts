import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs';
import { prisma } from '@/lib/db/prisma';
import { generatePageContent } from '@/lib/openai';
import { authConfig } from '@/lib/auth/config';
import path from 'path';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pageType, title, childcareId } = await request.json();

    if (!pageType || !title || !childcareId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get childcare center info for context
    const childcare = await prisma.childcareCenter.findUnique({
      where: { id: childcareId },
      include: {
        programs: true,
      },
    });

    if (!childcare) {
      return NextResponse.json(
        { error: 'Childcare center not found' },
        { status: 404 }
      );
    }

    // Generate content using OpenAI
    const content = await generatePageContent(pageType, title, {
      name: childcare.name,
      description: childcare.tagline || undefined,
      mission: childcare.mission || undefined,
      services: childcare.programs.map(p => p.name),
    });

    // const content = "<h1>AKDJasodja asdoijasdo ij asdoij ajosd</h1>"


    const slug = title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    // Save data
    const saveData = await prisma.webPage.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        seoMetaTitle: "",
        seoMetaDescription: "",
        seoKeywords: "",
        pageType: pageType,
        childcareCenterId: childcareId,
        jsonLd: ""
      }
    })


    const childCareCenter = await prisma.childcareCenter.findUnique({
      where: {
        id: childcareId
      }
    })

    const childCareCenterTitle = childCareCenter?.name as string

    // Save In File 
    // Define the folder where files will be saved
    const folderPath = path.join(process.cwd(), 'public', 'saved_files', childCareCenterTitle);

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `${slug}.html`

    // Path to save the file
    const filePath = path.join(folderPath, fileName);

    // Write the file to the folder
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error('Error saving the file:', err);
        // return NextResponse.status(500).json({ message: 'Failed to save file' });
        return NextResponse.json(
          { message: 'Failed to save file' },
          { status: 500 }
        );
      }
    });


    return NextResponse.json({ saveData, content });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate content' },
      { status: error.status || 500 }
    );
  }
}