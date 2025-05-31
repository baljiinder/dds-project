
import React from 'react';
import './AISection.css';

const AISection = ({ riskScore, predictedTag, resolution }) => {
  const getRiskLevel = (score) => {
    if (score >= 80) return 'High';
    if (score >= 50) return 'Medium';
    return 'Low';
  };

  return (
    <div className="card shadow mb-4 border-0">
      <div className="card-body">
        <h4 className="card-title mb-3">AI & ML Analysis</h4>
        <p><strong>Predicted Risk Score:</strong> {riskScore} ({getRiskLevel(riskScore)})</p>
        <p><strong>Incident Category:</strong> {predictedTag}</p>
        <p><strong>Suggested Resolution:</strong> {resolution}</p>
      </div>
    </div>
  );
};

export default AISection;
