'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/webeditor/Sidebar';
import Canvas from '@/components/webeditor/Canvas';
import PropertiesPanel from '@/components/webeditor/PropertiesPanel';

export default function Home() {
  // State to hold all the elements that are added to the canvas
  const [elements, setElements] = useState<any[]>([]);
  // State to track the currently selected element for editing in the properties panel
  const [selectedElement, setSelectedElement] = useState<any | null>(null);

  // Function to add a new section to the canvas
  const addSection = (section: any) => {
    setElements((prevElements) => [
      ...prevElements,
      { ...section, id: Math.random(), className: 'p-4 border mb-2' },
    ]);
  };

  // Function to update an existing element in the canvas
  const updateElement = (updatedElement: any) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === updatedElement.id ? updatedElement : el))
    );
    // Update the selected element state as well
    setSelectedElement(updatedElement);
  };

  return (
    <div className="flex h-screen">
      {/* First Column (15%) - Sidebar */}
      <div className="w-1/6 bg-gray-200 p-4">
        {/* Passing the addSection function to Sidebar */}
        <Sidebar addSection={addSection} />
      </div>

      {/* Second Column (70%) - Editable Canvas */}
      <div className="flex-1 bg-white p-4 border-l border-r border-gray-300">
        <Canvas elements={elements} setSelectedElement={setSelectedElement} />
      </div>

      {/* Third Column (15%) - Property Editor */}
      <div className="w-1/6 bg-gray-100 p-4">
        {selectedElement && (
          <PropertiesPanel
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        )}
        {!selectedElement && (
          <div>Select an element from the canvas to edit its properties</div>
        )}
      </div>
    </div>
  );
}
