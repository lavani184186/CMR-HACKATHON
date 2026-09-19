import { recommendationData } from '../data/mockData'

function RecommendationCard() {
  return (
    <div className="card recommendation-card">
      <div className="card-section-header">
        <span className="section-icon">🤖</span>
        <h2>AI Recommendation</h2>
      </div>
      <div className="recommendation-content">
        <div className="recommendation-action">
          <div className="action-icon">↗️</div>
          <div>
            <h3>{recommendationData.action}</h3>
            <p>{recommendationData.reason}</p>
          </div>
        </div>
        <div className="recommendation-stats">
          <div className="rec-stat">
            <span className="rec-stat-label">Confidence</span>
            <span className="rec-stat-value">{recommendationData.confidence}%</span>
          </div>
          <div className="rec-stat">
            <span className="rec-stat-label">Est. Impact</span>
            <span className="rec-stat-value">{recommendationData.estimatedImpact}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard
