import React from 'react';

interface CanvasProps {
  elements: any[];
  setSelectedElement: (element: any) => void;
}

const Canvas: React.FC<CanvasProps> = ({ elements, setSelectedElement }) => {
  return (
    <div
      className="w-full h-full border-dashed border-2 border-gray-300 p-4"
      onClick={() => setSelectedElement(null)}
    >
      {elements.map((element) => (
        <div
          key={element.id}
          className={element.className} // Apply the class names edited in the Properties Panel
          onClick={(e) => {
            e.stopPropagation();
            setSelectedElement(element);
          }}
        >
          {/* Rendering different sections based on their type */}
          {element.content.type === 'Hero' && (
            <div className="text-center">
              <h1 className="text-4xl font-bold">{element.content.title}</h1>
              <p className="text-lg mt-2">{element.content.subtitle}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                {element.content.buttonText}
              </button>
            </div>
          )}
          {element.content.type === 'Nav' && (
            <nav className="flex justify-center space-x-4">
              {element.content.links.map((link: string, index: number) => (
                <a key={index} href="#" className="text-blue-500">
                  {link}
                </a>
              ))}
            </nav>
          )}
          {element.content.type === 'Footer' && (
            <footer className="text-center text-sm text-gray-600">
              {element.content.text}
            </footer>
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
