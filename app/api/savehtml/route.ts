import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';


export async function POST(request: Request) {
    const { filename, content } = await request.json();

    // Define the folder where files will be saved
    const folderPath = path.join(process.cwd(), 'public', 'saved_files');

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Path to save the file
    const filePath = path.join(folderPath, filename);

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
    // return NextResponse.json({ message: 'File saved successfully', filePath, status: 200 });
    return NextResponse.json({ message: 'File saved successfully', status: 200 });
} 