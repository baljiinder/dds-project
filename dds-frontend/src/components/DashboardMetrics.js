
import React from 'react';

const DashboardMetrics = ({ totalIncidents, highRiskCount, unresolvedCount }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card text-white bg-primary shadow">
          <div className="card-body">Total Incidents: {totalIncidents}</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white bg-danger shadow">
          <div className="card-body">High Risk: {highRiskCount}</div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white bg-warning shadow">
          <div className="card-body">Unresolved: {unresolvedCount}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;
