import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db/prisma';
import { webpageSchema } from '@/lib/validations/webpage';
import { authConfig } from '@/lib/auth/config';
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const page = await prisma.webPage.findUnique({
      where: { id: parseInt(params.id) },
    });


    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const body = webpageSchema.parse(json);

    // Update webpage
    const page = await prisma.webPage.update({
      where: { id: parseInt(params.id) },
      data: body,
    });

    // Fetch childcare center details
    const childcare = await prisma.childcareCenter.findUnique({
      where: { id: page.childcareCenterId },
    });

    if (!childcare) {
      return NextResponse.json(
        { error: "Childcare center not found" },
        { status: 404 }
      );
    }

    const childcareName = childcare.name.replace(/[^a-z0-9]/gi, "_").toLowerCase(); // Safe folder name

    // Create history record
    const history = await prisma.webPageHistory.create({
      data: {
        webPageId: page.id,
        version: 1, // You might want to implement version numbering logic
        content: page.content,
        changes: "Page updated",
      },
    });

    // Save the content to a file under the childcare center's folder
    const folderPath = path.join(
      process.cwd(),
      "public",
      "websites",
      childcareName
    );
    const fileName = `${page.slug}.html`;
    const filePath = path.join(folderPath, fileName);

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Write the file
    fs.writeFile(filePath, page.content, (err) => {
      if (err) {
        console.error("Error saving the file:", err);
        throw new Error("Failed to save the file");
      }
    });

    return NextResponse.json({ page, history });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await getServerSession(authConfig);
//     if (!session?.user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const json = await request.json();
//     const body = webpageSchema.parse(json);

//     const page = await prisma.webPage.update({
//       where: { id: parseInt(params.id) },
//       data: body,
//     });



//     // Create history record
//     const history = await prisma.webPageHistory.create({
//       data: {
//         webPageId: page.id,
//         version: 1, // You might want to implement version numbering logic
//         content: page.content,
//         changes: 'Page updated',
//       },
//     });

//     // console.log(history)

//     return NextResponse.json(page);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.webPage.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}