
import React from 'react';

const ComplianceSection = ({ isoTags }) => {
  return (
    <div className="card shadow border-0 mb-4">
      <div className="card-body">
        <h4 className="card-title">ISO Compliance Matches</h4>
        <ul className="list-group list-group-flush">
          {isoTags && isoTags.length > 0 ? (
            isoTags.map((tag, index) => (
              <li key={index} className="list-group-item">{tag}</li>
            ))
          ) : (
            <li className="list-group-item text-muted">No ISO matches found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ComplianceSection;
