export default function RecommendationCard({ recommendation }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>AI Recommendation</h2>
      </div>
      <p className="rec-action">Divert traffic through Route {recommendation.route}</p>
      <p className="rec-reason">
        <strong>Reason: </strong>
        {recommendation.reason}
      </p>
      <p className="rec-confidence">
        <strong>Confidence: </strong>
        {recommendation.confidence}%
      </p>
    </section>
  );
}
