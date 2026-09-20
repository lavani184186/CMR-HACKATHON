const cardConfig = [
  { key: 'congestedRoads', title: 'Congested Roads', icon: '🚧', color: '#ef4444', suffix: '' },
  { key: 'activeIncidents', title: 'Active Incidents', icon: '⚠️', color: '#f59e0b', suffix: '' },
  { key: 'averageSpeed', title: 'Average Speed', icon: '⚡', color: '#10b981', suffix: ' km/h' },
  { key: 'networkStatus', title: 'Network Status', icon: '📊', color: '#3b82f6', suffix: '' },
]

function SummaryCards({ summary }) {
  return (
    <div className="summary-cards">
      {cardConfig.map((card) => (
        <div key={card.key} className="summary-card">
          <div className="card-top-border" style={{ backgroundColor: card.color }}></div>
          <div className="card-header">
            <span className="card-title">{card.title}</span>
            <span className="card-icon">{card.icon}</span>
          </div>
          <div className="card-value">
            {summary[card.key]}{card.suffix}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
