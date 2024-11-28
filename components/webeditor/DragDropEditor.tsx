import React from 'react';
import Sidebar from './Sidebar';

const DragDropEditor: React.FC = () => {
  // Function to add a section to the canvas
  const addSection = (sectionData: any) => {
    console.log('Adding section:', sectionData); // Debugging log to verify the function is called
  };

  // Log to confirm `addSection` existence before rendering `Sidebar`
  console.log('Passing addSection to Sidebar:', addSection);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-100 p-4 overflow-y-auto">
        <Sidebar addSection={addSection} />
      </div>
    </div>
  );
};

export default DragDropEditor;
