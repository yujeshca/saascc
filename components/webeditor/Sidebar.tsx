import React from 'react';

interface SidebarProps {
  addSection: (section: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ addSection }) => {
  const sections = [
    {
      id: 'hero',
      name: 'Hero Section',
      content: {
        type: 'Hero',
        title: 'Welcome to Our Platform',
        subtitle: 'We make everything easier.',
        buttonText: 'Get Started',
      },
    },
    {
      id: 'nav',
      name: 'Navigation Section',
      content: {
        type: 'Nav',
        links: ['Home', 'About', 'Services', 'Contact'],
      },
    },
    {
      id: 'features',
      name: 'Features Section',
      content: {
        type: 'Features',
        features: ['Feature One', 'Feature Two', 'Feature Three'],
      },
    },
    {
      id: 'footer',
      name: 'Footer Section',
      content: {
        type: 'Footer',
        text: '© 2024 All rights reserved.',
      },
    },
  ];

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Library</h2>
      {sections.map((section) => (
        <div key={section.id} className="mb-4">
          <button
            onClick={() => addSection(section)}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            {section.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
