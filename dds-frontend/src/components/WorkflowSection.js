
import React from 'react';

const WorkflowSection = ({ stage }) => {
  const stages = ['To Do', 'Investigating', 'In Progress', 'Resolved'];
  return (
    <div className="card border-0 shadow mb-4">
      <div className="card-body">
        <h4 className="card-title">Incident Workflow Stage</h4>
        <div className="progress">
          {stages.map((s, i) => (
            <div key={i} className={`progress-bar ${s === stage ? 'bg-success' : 'bg-secondary'}`}
              role="progressbar"
              style={{ width: `${100 / stages.length}%` }}
              aria-valuenow={i + 1}
              aria-valuemin="0"
              aria-valuemax={stages.length}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;
