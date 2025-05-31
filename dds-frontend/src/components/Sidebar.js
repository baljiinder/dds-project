import React from 'react';
import { FaChartBar, FaShieldAlt, FaRobot, FaGavel, FaCommentDots, FaProjectDiagram } from 'react-icons/fa';

const Sidebar = ({ currentSection, onSelect }) => {
  const sections = [
    { key: 'overview', label: 'Overview', icon: <FaChartBar /> },
    { key: 'risk', label: 'Risk Analysis', icon: <FaShieldAlt /> },
    { key: 'ai', label: 'AI/ML', icon: <FaRobot /> },
    { key: 'compliance', label: 'Compliance', icon: <FaGavel /> },
    { key: 'feedback', label: 'Feedback', icon: <FaCommentDots /> },
    { key: 'workflow', label: 'Workflow', icon: <FaProjectDiagram /> }
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg p-4">
      <h1 className="text-lg font-bold mb-6 text-blue-800">Deep Defence Solutions</h1>
      {sections.map(section => (
        <button
          key={section.key}
          className={`w-full flex items-center gap-2 px-4 py-2 mb-2 text-left rounded transition ${
            currentSection === section.key ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
          }`}
          onClick={() => onSelect(section.key)}
        >
          {section.icon} {section.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
