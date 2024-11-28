import { Element as ElementType } from '@/lib/types/webeditor';

const exportToHtml = (elements: ElementType[]): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported Page</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 p-4">
      ${elements
        .map((el) => {
          switch (el.type) {
            case 'text':
              return `<p>${el.content}</p>`;
            case 'image':
              return `<img src="${el.content}" alt="Image" />`;
            case 'button':
              return `<button class="bg-blue-500 text-white py-2 px-4 rounded">${el.content}</button>`;
            default:
              return '';
          }
        })
        .join('\n')}
    </body>
    </html>
  `;
};

export default exportToHtml;
