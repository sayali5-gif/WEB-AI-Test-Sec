import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA ---
const trafficData = [
  { time: '00:00', normal: 1200, suspicious: 12 },
  { time: '04:00', normal: 800, suspicious: 5 },
  { time: '08:00', normal: 2400, suspicious: 45 },
  { time: '12:00', normal: 3600, suspicious: 82 },
  { time: '16:00', normal: 3100, suspicious: 60 },
  { time: '20:00', normal: 1800, suspicious: 25 },
  { time: '24:00', normal: 1000, suspicious: 8 }
];

const attackDistribution = [
  { name: 'SQL Injection', value: 8, color: '#dc2626' },
  { name: 'Cross-Site Scripting', value: 6, color: '#ea580c' },
  { name: 'Brute Force', value: 12, color: '#eab308' },
  { name: 'Path Traversal', value: 3, color: '#8b5cf6' },
  { name: 'Other', value: 2, color: '#6b7280' }
];

const mockDetections = [
  { id: 'DET-001', type: 'SQL Injection', source: '192.168.1.20', target: '/login', severity: 'Critical', confidence: '98%', status: 'Blocked', time: '10:42' },
  { id: 'DET-002', type: 'Cross-Site Scripting', source: '192.168.1.25', target: '/search', severity: 'High', confidence: '94%', status: 'Blocked', time: '10:38' },
  { id: 'DET-003', type: 'Brute Force', source: '192.168.1.31', target: '/api/auth', severity: 'High', confidence: '91%', status: 'Investigating', time: '10:31' },
  { id: 'DET-004', type: 'Path Traversal', source: '192.168.1.18', target: '/files/download', severity: 'Medium', confidence: '87%', status: 'Blocked', time: '10:25' },
  { id: 'DET-005', type: 'SQL Injection', source: '10.0.0.45', target: '/products?id=', severity: 'Critical', confidence: '99%', status: 'Resolved', time: '09:15' },
  { id: 'DET-006', type: 'Suspicious Bot', source: '172.16.0.5', target: '/', severity: 'Low', confidence: '75%', status: 'Investigating', time: '08:50' },
  { id: 'DET-007', type: 'Brute Force', source: '192.168.1.31', target: '/login', severity: 'High', confidence: '92%', status: 'Blocked', time: '08:45' }
];

const IntrusionDetection = () => {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Filtering Logic
  const filteredDetections = mockDetections.filter((event) => {
    const matchesSearch = 
      event.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'All Types' || event.type === typeFilter;
    const matchesSeverity = severityFilter === 'All Severities' || event.severity === severityFilter;
    const matchesStatus = statusFilter === 'All Statuses' || event.status === statusFilter;

    return matchesSearch && matchesType && matchesSeverity && matchesStatus;
  });

  // Badge Styling Helpers
  const getSeverityClass = (severity) => {
    if (severity === 'Critical' || severity === 'High') return 'severity-high';
    if (severity === 'Low') return 'severity-low';
    return ''; 
  };

  const getStatusBadge = (status) => {
    const styles = {
      'Blocked': { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
      'Investigating': { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
      'Resolved': { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' }
    };
    const style = styles[status] || { bg: '#f3f4f6', text: '#4b5563', border: '#e5e7eb' };
    
    return (
      <span style={{ 
        backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}`,
        padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600'
      }}>
        {status}
      </span>
    );
  };

  const filterStyles = {
    input: { padding: '10px 14px', fontSize: '14px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', width: '100%', minWidth: '150px' },
    select: { padding: '10px 14px', fontSize: '14px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#fff', outline: 'none', cursor: 'pointer', flex: '1 1 140px', minWidth: '140px' }
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      {/* 1. Page Header */}
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <div>
          <p className="page-label">SECURITY / INTRUSION DETECTION</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0 }}>Intrusion Detection</h1>
            <span style={{ 
              backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', 
              borderRadius: '9999px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #fde68a', whiteSpace: 'nowrap'
            }}>
              Detection System: Demo Mode
            </span>
          </div>
          <p className="page-description">Monitor suspicious activity and detected attack patterns.</p>
        </div>
      </div>

      {/* 2. Summary Statistics */}
      <section className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <p>Detected Attacks</p>
          <h2>8</h2>
          <span>In the last 24 hours</span>
        </div>
        <div className="stat-card">
          <p>Suspicious Requests</p>
          <h2>42</h2>
          <span>Flagged by ML model</span>
        </div>
        <div className="stat-card">
          <p>Blocked Requests</p>
          <h2 style={{ color: '#dc2626' }}>31</h2>
          <span>Auto-mitigated</span>
        </div>
        <div className="stat-card">
          <p>Detection Rate</p>
          <h2 style={{ color: '#16a34a' }}>94.2%</h2>
          <span>Confidence threshold</span>
        </div>
      </section>

      {/* 3, 4, 5. Middle Dashboard Layer (Responsive Flexbox Fix) */}
      <section style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left Column: Status & Pie Chart */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
          
          {/* 5. Detection Status */}
          <div className="dashboard-card">
             <div className="card-header" style={{ marginBottom: '12px' }}>
               <h3>Detection Status</h3>
             </div>
             <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>System Status</span>
                  <span style={{ fontWeight: 'bold', color: '#16a34a' }}>Active (Demo)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Monitoring</span>
                  <span style={{ fontWeight: 'bold', color: '#111827' }}>Enabled</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Last Analysis</span>
                  <span style={{ fontWeight: 'bold', color: '#111827' }}>Just now</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '10px', marginTop: '4px' }}>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>Detection Mode</span>
                  <span style={{ fontWeight: 'bold', color: '#2563eb' }}>AI/ML Classification (Demo)</span>
                </div>
             </div>
          </div>

          {/* 3. Attack Type Distribution */}
          <div className="dashboard-card" style={{ flexGrow: 1, minWidth: 0 }}>
            <div className="card-header">
              <div>
                <h3>Attack Categories</h3>
                <p>Distribution of detected signatures.</p>
              </div>
            </div>
            <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attackDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                    {attackDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  <Legend verticalAlign="bottom" height={24} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Traffic / Detection Activity */}
        <div className="dashboard-card" style={{ flex: '2 1 500px', minWidth: 0 }}>
          <div className="card-header">
            <div>
              <h3>Traffic & Detection Activity</h3>
              <p>Normal application traffic vs Suspicious events (24h)</p>
            </div>
          </div>
          <div style={{ height: '360px', width: '100%', marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#dc2626' }} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <Legend verticalAlign="top" height={36} />
                <Area yAxisId="left" type="monotone" dataKey="normal" name="Normal Traffic" stroke="#2563eb" fill="url(#colorNormal)" />
                <Area yAxisId="right" type="monotone" dataKey="suspicious" name="Suspicious Traffic" stroke="#dc2626" fill="url(#colorSuspicious)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* 9 & 10. Filters & Search */}
      <section className="dashboard-card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 200px', minWidth: 0 }}>
            <input 
              type="text" 
              placeholder="Search detected events by ID, IP, or target..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={filterStyles.input}
            />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={filterStyles.select}>
            <option value="All Types">All Types</option>
            <option value="SQL Injection">SQL Injection</option>
            <option value="Cross-Site Scripting">Cross-Site Scripting</option>
            <option value="Brute Force">Brute Force</option>
            <option value="Path Traversal">Path Traversal</option>
            <option value="Suspicious Bot">Suspicious Bot</option>
          </select>
          <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} style={filterStyles.select}>
            <option value="All Severities">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={filterStyles.select}>
            <option value="All Statuses">All Statuses</option>
            <option value="Blocked">Blocked</option>
            <option value="Investigating">Investigating</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </section>

      {/* 6. Recent Detections Table (Horizontal Scroll Fix) */}
      <section className="dashboard-card findings-card">
        <div className="card-header">
          <div>
            <h3>Recent Detected Events</h3>
            <p>Log of blocked and investigated intrusion attempts.</p>
          </div>
        </div>

        <div className="table-placeholder" style={{ overflowX: 'auto', width: '100%' }}>
          <div style={{ minWidth: '950px' }}>
            <div className="table-row table-header" style={{ gridTemplateColumns: '1fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr' }}>
              <span>ID</span>
              <span>Attack Type</span>
              <span>Source</span>
              <span>Target</span>
              <span>Severity</span>
              <span>Confidence</span>
              <span>Status</span>
              <span>Time</span>
            </div>

            {filteredDetections.length > 0 ? (
              filteredDetections.map((event) => (
                <div className="table-row" key={event.id} style={{ gridTemplateColumns: '1fr 1.5fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '13px' }}>{event.id}</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{event.type}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#4b5563' }}>{event.source}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#4b5563' }}>{event.target}</span>
                  <span className={getSeverityClass(event.severity)}>{event.severity}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{event.confidence}</span>
                  <span>{getStatusBadge(event.status)}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280' }}>{event.time}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🛡️</div>
                <p>No detected events found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntrusionDetection;