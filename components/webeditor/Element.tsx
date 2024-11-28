import React, { useState } from 'react';
import { Element as ElementType }  from '@/lib/types/webeditor'

interface ElementProps {
  element: ElementType;
  updateElement: (id: string, content: string) => void;
}

const Element: React.FC<ElementProps> = ({ element, updateElement }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, e.target.value);
  };

  switch (element.type) {
    case 'text':
      return isEditing ? (
        <input
          value={element.content}
          onChange={handleContentChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="border-b focus:outline-none"
        />
      ) : (
        <p onClick={() => setIsEditing(true)} className="cursor-pointer">
          {element.content}
        </p>
      );
    case 'image':
      return (
        <img
          src={element.content}
          alt="Element"
          className="w-full cursor-pointer"
          onClick={() => {
            const newUrl = prompt('Enter image URL:', element.content) || element.content;
            updateElement(element.id, newUrl);
          }}
        />
      );
    case 'button':
      return (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => alert('Button Clicked!')}
        >
          {element.content}
        </button>
      );
    default:
      return null;
  }
};

export default Element;
