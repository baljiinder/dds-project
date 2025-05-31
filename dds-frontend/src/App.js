import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AISection from './components/AISection';
import ComplianceSection from './components/ComplianceSection';
import DashboardMetrics from './components/DashboardMetrics';
import WorkflowSection from './components/WorkflowSection';
import ChatAssistant from './components/ChatAssistant';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];
const views = ['school', 'hospital', 'retail', 'corporate'];
const sidebarSections = ['Overview', 'Risk Analysis', 'AI/ML', 'Compliance', 'Feedback', 'Workflow'];

function App() {
  const [activeSection, setActiveSection] = useState('Overview');
  const [view, setView] = useState('');
  const [viewSelected, setViewSelected] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartKey, setChartKey] = useState('');
  const [tableKeys, setTableKeys] = useState([]);
  const [availableViews, setAvailableViews] = useState(views);
  const [riskScore, setRiskScore] = useState(null);
  const [isoTags, setIsoTags] = useState([]);
  const [predictedTag, setPredictedTag] = useState('');
  const [resolution, setResolution] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [severity, setSeverity] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/data`, {
        params: { view, startDate, endDate, searchText, severity, state: stateFilter }
      });
      const incoming = res.data;
      setData(incoming);

      if (incoming.length > 0) {
        const sample = incoming[0];
        const validKeys = Object.entries(sample)
          .filter(([_, val]) => typeof val === 'string' || typeof val === 'number')
          .map(([key]) => key);

        setTableKeys(validKeys.slice(0, 4));
        const smartKey = validKeys.find(k =>
          /type|category|status|label|incident|risk|level|facility|procedure|name/i.test(k)
        ) || validKeys[0] || '_id';
        setChartKey(smartKey);

        // ML Calls
        await fetchRiskScore(sample);
        await fetchClassification(sample);
        await fetchCompliance(sample);
        await fetchResolution(sample);
      } else {
        setChartKey('');
        setTableKeys([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/filters?view=${view}`);
      setFilters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRiskScore = async (sample) => {
    const res = await axios.post('http://localhost:8000/predict-risk', sample);
    setRiskScore(res.data.score || res.data.risk_score);
  };

  const fetchClassification = async (sample) => {
    const res = await axios.post('http://localhost:8000/classify-incident', { description: sample.description });
    setPredictedTag(res.data.tag || res.data.predicted_tag);
  };

  const fetchCompliance = async (sample) => {
    const res = await axios.post('http://localhost:8000/check-compliance', sample);
    setIsoTags(res.data.tags || res.data.iso_matches || []);
  };

  const fetchResolution = async (sample) => {
    const res = await axios.post('http://localhost:8000/suggest-resolution', sample);
    setResolution(res.data.resolution || '');
  };

  useEffect(() => {
    if (viewSelected) {
      fetchFilters();
      fetchData();
    }
  }, [view]);

  const addNewView = () => {
    const newView = prompt('Enter new view name:');
    if (newView && !availableViews.includes(newView)) {
      setAvailableViews([...availableViews, newView]);
      setView(newView);
    }
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSearchText('');
    setSeverity('');
    setStateFilter('');
  };

  if (!viewSelected) {
    return (
      <div className="d-flex flex-wrap justify-content-center align-items-center vh-100 bg-dark text-white">
        {availableViews.map((v, i) => (
          <div key={i} className="card m-3 p-4 bg-secondary" style={{ cursor: 'pointer' }} onClick={() => { setView(v); setViewSelected(true); }}>
            <h4>{v.toUpperCase()}</h4>
          </div>
        ))}
        <div className="card m-3 p-4 bg-success" style={{ cursor: 'pointer' }} onClick={addNewView}>
          <h4>+ Add New View</h4>
        </div>
      </div>
    );
  }

  const chartData = Object.entries(
    data.reduce((acc, item) => {
      const key = item[chartKey] || 'Unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="d-flex vh-100">
      <div className="bg-light border-end p-3" style={{ minWidth: '220px' }}>
        <h5 className="fw-bold text-primary">Deep Defence Solutions</h5>
        <ul className="nav flex-column">
          {sidebarSections.map(sec => (
            <li className="nav-item" key={sec}>
              <button className={`nav-link btn btn-link text-start w-100 ${activeSection === sec ? 'fw-bold text-primary' : ''}`} onClick={() => setActiveSection(sec)}>{sec}</button>
            </li>
          ))}
          <li className="mt-3">
            <a href="http://localhost:8000/download-iso" className="btn btn-outline-dark w-100">Download ISO JSON</a>
          </li>
        </ul>
      </div>

      <div className="flex-fill p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">{activeSection}</h4>
          {riskScore && <span className="badge bg-warning text-dark">Risk Score: {riskScore}</span>}
          {predictedTag && <span className="badge bg-info text-dark">Predicted Type: {predictedTag}</span>}
          {isoTags.length > 0 && <span className="badge bg-success">ISO: {isoTags.join(', ')}</span>}
        </div>

        {activeSection === 'Overview' && (
          <div className="card p-3 mb-4">
            <h6>Filters for “{view}” View:</h6>
            <div className="d-flex flex-wrap gap-2">
              <input type="date" className="form-control w-auto" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <input type="date" className="form-control w-auto" value={endDate} onChange={e => setEndDate(e.target.value)} />
              <input type="text" className="form-control w-auto" placeholder="Search location..." value={searchText} onChange={e => setSearchText(e.target.value)} />
              <select className="form-select w-auto" value={severity} onChange={e => setSeverity(e.target.value)}>
                <option value="">All Severities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <select className="form-select w-auto" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
                <option value="">All States</option>
                <option>TX</option>
                <option>CA</option>
                <option>NY</option>
              </select>
              <button className="btn btn-primary" onClick={fetchData}>Apply</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        )}

        {(activeSection === 'Overview' || activeSection === 'Risk Analysis' || activeSection === 'AI/ML' || activeSection === 'Compliance') && (
          <>
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card p-3">
                  <h6 className="fw-semibold">Bar Chart ({chartKey})</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h6 className="fw-semibold">Pie Chart</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                        {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3">
                  <h6 className="fw-semibold">Trend Line</h6>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="card p-3">
              <h6 className="fw-semibold">Recent Incidents</h6>
              <div className="table-responsive">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>{tableKeys.map((f, i) => <th key={i}>{f}</th>)}</tr>
                  </thead>
                  <tbody>
                    {data.map((row, i) => (
                      <tr key={i}>
                        {tableKeys.map((f, j) => (
                          <td key={j}>{typeof row[f] === 'object' ? '[object]' : String(row[f])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeSection === 'AI/ML' && (
          <>
            <DashboardMetrics totalIncidents={data.length} highRiskCount={riskScore >= 70 ? 1 : 0} unresolvedCount={3} />
            <AISection riskScore={riskScore} predictedTag={predictedTag} resolution={resolution} />
          </>
        )}

        {activeSection === 'Compliance' && <ComplianceSection isoTags={isoTags} />}
        {activeSection === 'Workflow' && <WorkflowSection stage={'Investigating'} />}
        {activeSection === 'Feedback' && <ChatAssistant />}
      </div>
    </div>
  );
}

export default App;
