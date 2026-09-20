function RecommendationCard({ recommendation }) {
  if (!recommendation) return null

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
            <h3>Divert traffic through Route {recommendation.route}</h3>
            <p>{recommendation.reason}</p>
          </div>
        </div>
        <div className="recommendation-stats">
          <div className="rec-stat">
            <span className="rec-stat-label">Confidence</span>
            <span className="rec-stat-value">{recommendation.confidence}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendationCard
