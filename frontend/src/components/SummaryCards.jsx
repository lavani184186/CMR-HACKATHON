const statusClass = {
  Light: "ok",
  Moderate: "warn",
  Heavy: "bad",
};

export default function SummaryCards({ summary }) {
  const cards = [
    { label: "Congested Roads", value: summary.congestedRoads },
    { label: "Active Incidents", value: summary.activeIncidents },
    { label: "Average Speed", value: `${summary.averageSpeed} km/h` },
    {
      label: "Network Status",
      value: summary.networkStatus,
      dot: statusClass[summary.networkStatus],
    },
  ];

  return (
    <section className="summary-grid" aria-label="Network summary">
      {cards.map((card) => (
        <div className="card summary-card" key={card.label}>
          <span className="summary-label">{card.label}</span>
          <span className="summary-value">
            {card.dot && <span className={`dot ${card.dot}`} />}
            {card.value}
          </span>
        </div>
      ))}
    </section>
  );
}
