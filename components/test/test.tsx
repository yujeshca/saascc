import React from 'react';

const Test = () => {
    const saveToServer = async () => {
        // Example HTML content
        const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>My HTML File</title>
        </head>
        <body>
          <h1>Hello, this is a saved HTML file!</h1>
        </body>
      </html>
    `;

        try {

            const response = await fetch('/api/savehtml', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: 'my-file.html', // File name
                    content: htmlContent,    // HTML content
                }),
            });

            // console.log(response)
            if (response.ok) {
                const data = await response.json();
                alert(`File saved successfully at: ${data.filePath}`);
            } else {
                alert('Failed to save the file');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error saving the file');
        }
    };

    return <button onClick={saveToServer}>Save to Project Folder</button>;
};

export default Test;
