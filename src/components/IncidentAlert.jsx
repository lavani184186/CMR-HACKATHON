function IncidentAlert({ incident }) {
  if (!incident) return null

  return (
    <div className="card incident-card">
      <div className="card-section-header">
        <span className="section-icon">🚨</span>
        <h2>Incident Alert</h2>
        <span className="alert-badge">LIVE</span>
      </div>
      <div className="incident-content">
        <div className="incident-detail">
          <div className="incident-row">
            <span className="incident-label">Segment</span>
            <span className="incident-value">{incident.segment}</span>
          </div>
          <div className="incident-row">
            <span className="incident-label">Type</span>
            <span className="incident-value">{incident.type}</span>
          </div>
        </div>
        <div className="confidence-meter">
          <div className="confidence-label">Confidence</div>
          <div className="confidence-ring">
            <svg viewBox="0 0 100 100" className="confidence-svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="#ef4444" strokeWidth="8"
                strokeDasharray={`${incident.confidence * 2.51} 251`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <span className="confidence-value">{incident.confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncidentAlert
