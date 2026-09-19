import { summaryData } from '../data/mockData'

function SummaryCards() {
  return (
    <div className="summary-cards">
      {summaryData.map((card) => (
        <div key={card.id} className="summary-card">
          <div className="card-top-border" style={{ backgroundColor: card.color }}></div>
          <div className="card-header">
            <span className="card-title">{card.title}</span>
            <span className="card-icon">{card.icon}</span>
          </div>
          <div className="card-value">{card.value}</div>
          <div className={`card-change ${card.trend}`}>
            <span>{card.trend === 'up' ? '↗' : card.trend === 'down' ? '↘' : '→'}</span>
            {card.change}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
