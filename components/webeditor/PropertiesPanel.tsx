import React from 'react';

interface PropertiesPanelProps {
  selectedElement: any;
  updateElement: (updatedElement: any) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedElement, updateElement }) => {
  if (!selectedElement) {
    return <div>Select an element to edit its properties</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Properties Editor</h2>

      {selectedElement.content.type === 'Hero' && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Title:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedElement.content.title}
              onChange={(e) => {
                const updatedElement = {
                  ...selectedElement,
                  content: {
                    ...selectedElement.content,
                    title: e.target.value,
                  },
                };
                updateElement(updatedElement);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Subtitle:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedElement.content.subtitle}
              onChange={(e) => {
                const updatedElement = {
                  ...selectedElement,
                  content: {
                    ...selectedElement.content,
                    subtitle: e.target.value,
                  },
                };
                updateElement(updatedElement);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Button Text:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedElement.content.buttonText}
              onChange={(e) => {
                const updatedElement = {
                  ...selectedElement,
                  content: {
                    ...selectedElement.content,
                    buttonText: e.target.value,
                  },
                };
                updateElement(updatedElement);
              }}
            />
          </div>
        </>
      )}
      {/* More fields for other section types can be added here */}
    </div>
  );
};

export default PropertiesPanel;
