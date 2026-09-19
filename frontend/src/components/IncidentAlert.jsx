export default function IncidentAlert({ incident }) {
  return (
    <section className="card alert-card">
      <div className="card-head">
        <h2>Incident Alert</h2>
      </div>
      <dl className="facts">
        <div>
          <dt>Road Segment</dt>
          <dd>{incident.segment}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{incident.type}</dd>
        </div>
        <div>
          <dt>Confidence</dt>
          <dd>{incident.confidence}%</dd>
        </div>
      </dl>
    </section>
  );
}
