import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditorElement } from '@/lib/types/editor';
import ElementWrapper from './ElementWrapper'; // Handles rendering each element
import PropertiesPanel from './PropertiesPanel'; // Handles element editing
import Sidebar from './Sidebar'; // Sidebar for adding elements
import { ElementType } from '@/lib/types/editor';

interface EditorCanvasProps {
  elements: EditorElement[];
  setElements: React.Dispatch<React.SetStateAction<EditorElement[]>>;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ elements, setElements }) => {
  const [selectedElement, setSelectedElement] = useState<EditorElement | null>(null);
  const [showPanel, setShowPanel] = useState<boolean>(false);

  // Handle updates to an element (e.g., changing text or other properties)
  const updateElement = (id: string, updatedContent: string, field: string) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              [field]: updatedContent,
            }
          : el
      )
    );
  };

  // Handle element click to show the properties panel
  const handleElementClick = (element: EditorElement) => {
    setSelectedElement(element);
    setShowPanel(true);
  };

  // Handle drag and drop logic
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = elements.findIndex((el) => el.id === active.id);
      const newIndex = elements.findIndex((el) => el.id === over.id);
      setElements(arrayMove(elements, oldIndex, newIndex));
    }
  };

  // Add new element from sidebar (e.g., text, image, etc.)
  const addElement = (type: ElementType) => {
    const newElement: EditorElement = {
      id: `${type}-${Math.random()}`,
      type,
      content: type === ElementType.TEXT ? 'New Text Element' : '',
      className: 'text-center',
    };
    setElements((prevElements) => [...prevElements, newElement]);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Sidebar */}
      <div className="w-1/6 bg-gray-200 p-4">
        <Sidebar addElement={addElement} />
      </div>

      {/* Center Canvas */}
      <div className="flex-1 bg-gray-50 p-4">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={elements} strategy={verticalListSortingStrategy}>
            {elements.map((element) => (
              <div
                key={element.id}
                onClick={() => handleElementClick(element)} // Trigger the properties panel
                className="cursor-pointer"
              >
                {/* Render element without editable fields */}
                <ElementWrapper element={element} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Right Properties Panel */}
      {showPanel && (
        <div className="w-1/6 bg-gray-100 p-4">
          <PropertiesPanel
            selectedElement={selectedElement}
            updateElement={updateElement}
            closePanel={() => setShowPanel(false)}
          />
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
