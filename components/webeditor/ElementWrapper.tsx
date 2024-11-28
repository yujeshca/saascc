import React from 'react';
import { EditorElement } from '@/lib/types/editor';

interface ElementWrapperProps {
  element: EditorElement;
}

const ElementWrapper: React.FC<ElementWrapperProps> = ({ element }) => {
  if (!element) {
    console.error('ElementWrapper received an undefined element:', element);
    return null;
  }

  // Debugging statement to log received element
  console.log('Rendering ElementWrapper with element:', element);

  // Render content based on the type of section
  switch (element.type) {
    case 'Hero':
      return (
        <div className={element.className}>
          <h1 className="text-4xl font-bold">{element.content.heading}</h1>
          <p className="text-lg mt-4">{element.content.subheading}</p>
          <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
            {element.content.buttonText}
          </button>
        </div>
      );

    case 'Features':
      return (
        <div className={element.className}>
          <h2 className="text-3xl font-bold text-center">{element.content.title}</h2>
          <ul className="mt-4 space-y-2">
            {element.content.features &&
              element.content.features.map((feature: string, index: number) => (
                <li key={index}>✔ {feature}</li>
              ))}
          </ul>
        </div>
      );

    case 'FAQ':
      return (
        <div className={element.className}>
          <h2 className="text-3xl font-bold text-center">{element.content.title}</h2>
          <div className="mt-4 space-y-3">
            {element.content.questions &&
              element.content.questions.map((qa: any, index: number) => (
                <div key={index}>
                  <h3 className="font-semibold">{qa.question}</h3>
                  <p>{qa.answer}</p>
                </div>
              ))}
          </div>
        </div>
      );

    default:
      console.error('ElementWrapper received an unsupported element type:', element.type);
      return <div className="bg-red-100 p-4 rounded-md">Unsupported Section Type</div>;
  }
};

export default ElementWrapper;
