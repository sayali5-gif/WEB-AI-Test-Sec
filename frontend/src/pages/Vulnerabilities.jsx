import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api, { apiError } from '../services/api';

const Vulnerabilities = () => {
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedFinding, setSelectedFinding] = useState(null);

  const loadFindings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/findings');
      const list = Array.isArray(response.data) ? response.data : response.data?.items || [];
      setFindings(list);
    } catch (err) {
      setError(apiError(err, 'Unable to retrieve vulnerabilities from the backend.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFindings();
  }, [loadFindings]);

  const filteredFindings = findings.filter((f) => {
    const title = (f.title || f.name || '').toLowerCase();
    const type = (f.vulnerability_type || '').toLowerCase();
    const target = (f.affected_url || f.target || '').toLowerCase();
    const idStr = String(f.id || '').toLowerCase();

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      type.includes(searchTerm.toLowerCase()) ||
      target.includes(searchTerm.toLowerCase()) ||
      idStr.includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === 'All Severities' ||
      (f.severity || '').toLowerCase() === severityFilter.toLowerCase();

    const matchesStatus =
      statusFilter === 'All Statuses' ||
      (f.status || 'open').toLowerCase() === statusFilter.toLowerCase().replace(' ', '_');

    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const countSeverity = (sev) =>
    findings.filter((f) => (f.severity || '').toLowerCase() === sev.toLowerCase()).length;

  const getSeverityBadge = (severity) => {
    const s = (severity || 'low').toLowerCase();
    const map = {
      critical: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
      high: { bg: '#fff7ed', text: '#ea580c', border: '#fed7aa' },
      medium: { bg: '#fefce8', text: '#ca8a04', border: '#fef08a' },
      low: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
    };
    const style = map[s] || map.low;
    return (
      <span
        style={{
          backgroundColor: style.bg,
          color: style.text,
          border: `1px solid ${style.border}`,
          padding: '3px 10px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'capitalize',
        }}
      >
        {severity || 'Low'}
      </span>
    );
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <div
        className="page-header"
        style={{
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <p className="page-label">SECURITY / VULNERABILITIES</p>
          <h1 style={{ margin: '0 0 6px 0' }}>Vulnerabilities</h1>
          <p className="page-description">
            Review, classify, and prioritize detected web application security findings.
          </p>
        </div>
        <button
          onClick={loadFindings}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
            color: '#09090b',
            border: '1px solid #d4d4d8',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ↻ Refresh Findings
        </button>
      </div>

      {/* Summary Statistics */}
      <section
        className="stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="stat-card" style={{ borderTop: '3px solid #09090b' }}>
          <p>Total Findings</p>
          <h2>{findings.length}</h2>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid #dc2626' }}>
          <p>Critical</p>
          <h2 style={{ color: '#dc2626' }}>{countSeverity('critical')}</h2>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid #ea580c' }}>
          <p>High</p>
          <h2 style={{ color: '#ea580c' }}>{countSeverity('high')}</h2>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid #eab308' }}>
          <p>Medium</p>
          <h2 style={{ color: '#ca8a04' }}>{countSeverity('medium')}</h2>
        </div>
        <div className="stat-card" style={{ borderTop: '3px solid #16a34a' }}>
          <p>Low</p>
          <h2 style={{ color: '#16a34a' }}>{countSeverity('low')}</h2>
        </div>
      </section>

      {/* Filters */}
      <section className="dashboard-card" style={{ marginBottom: '24px', padding: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px' }}>
            <input
              type="text"
              placeholder="Search by vulnerability title, category, URL, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid #d4d4d8',
                outline: 'none',
              }}
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #d4d4d8',
              backgroundColor: '#ffffff',
            }}
          >
            <option value="All Severities">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              fontSize: '14px',
              borderRadius: '8px',
              border: '1px solid #d4d4d8',
              backgroundColor: '#ffffff',
            }}
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </section>

      {error && (
        <div style={{ padding: '12px 16px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
          ⚠ {error}
        </div>
      )}

      {/* Selected Finding Detail Drawer/Card */}
      {selectedFinding && (
        <section
          className="dashboard-card"
          style={{
            marginBottom: '24px',
            border: '2px solid #09090b',
            backgroundColor: '#fafafa',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a' }}>
                DETAILED VULNERABILITY INSPECTION
              </span>
              <h3 style={{ margin: '4px 0', fontSize: '18px' }}>
                {selectedFinding.title || selectedFinding.name}
              </h3>
            </div>
            <button
              onClick={() => setSelectedFinding(null)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #d4d4d8',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              ✕ Close
            </button>
          </div>
          <p style={{ fontSize: '14px', color: '#3f3f46', lineHeight: 1.6 }}>
            {selectedFinding.description || 'No additional description provided for this finding.'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginTop: '14px', fontSize: '13px' }}>
            <div><strong>Category:</strong> {selectedFinding.vulnerability_type || 'N/A'}</div>
            <div><strong>CWE:</strong> {selectedFinding.cwe_id || 'N/A'}</div>
            <div><strong>CVSS Score:</strong> {selectedFinding.cvss_score ?? 'N/A'}</div>
            <div>
              <strong>AI Confidence:</strong>{' '}
              {selectedFinding.ai_confidence ? `${Math.round(selectedFinding.ai_confidence * 100)}%` : 'N/A'}
            </div>
          </div>
        </section>
      )}

      {/* Findings Table */}
      <section className="dashboard-card findings-card">
        <div className="card-header">
          <div>
            <h3>Security Findings ({filteredFindings.length})</h3>
            <p>Live vulnerability records retrieved from the FastAPI backend.</p>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#52525b' }}>
            Loading vulnerability records...
          </div>
        ) : filteredFindings.length > 0 ? (
          <div className="table-placeholder" style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: '820px' }}>
              <div
                className="table-row table-header"
                style={{ gridTemplateColumns: '2fr 1.4fr 1fr 1fr 1fr 1.2fr 1.2fr' }}
              >
                <span>Vulnerability</span>
                <span>Category / CWE</span>
                <span>Severity</span>
                <span>CVSS / AI</span>
                <span>Status</span>
                <span>Detected</span>
                <span>Action</span>
              </div>

              {filteredFindings.map((finding) => (
                <div
                  className="table-row"
                  key={finding.id}
                  style={{
                    gridTemplateColumns: '2fr 1.4fr 1fr 1fr 1fr 1.2fr 1.2fr',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#09090b' }}>
                      {finding.title || finding.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#71717a', fontFamily: 'monospace' }}>
                      {finding.affected_url || finding.target || String(finding.id).slice(0, 8)}
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', color: '#3f3f46' }}>
                    {finding.vulnerability_type || 'General'}
                    {finding.cwe_id ? ` · ${finding.cwe_id}` : ''}
                  </span>
                  <span>{getSeverityBadge(finding.severity)}</span>
                  <span style={{ fontSize: '12px', color: '#3f3f46', fontWeight: 600 }}>
                    {finding.cvss_score ?? '—'}
                    {finding.ai_confidence ? ` (${Math.round(finding.ai_confidence * 100)}%)` : ''}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'capitalize' }}>
                    {(finding.status || 'open').replace('_', ' ')}
                  </span>
                  <span style={{ fontSize: '12px', color: '#71717a' }}>
                    {finding.detected_at ? new Date(finding.detected_at).toLocaleDateString() : '—'}
                  </span>
                  <span style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setSelectedFinding(finding)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        border: '1px solid #d4d4d8',
                        backgroundColor: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Inspect
                    </button>
                    {finding.scan_id && (
                      <Link
                        to={`/scan/${finding.scan_id}`}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '6px',
                          backgroundColor: '#09090b',
                          color: '#ffffff',
                          fontSize: '12px',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        Scan
                      </Link>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#71717a', fontSize: '14px' }}>
            No vulnerabilities found matching your criteria.
          </div>
        )}
      </section>
    </div>
  );
};

export default Vulnerabilities;