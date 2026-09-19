import { useState } from "react";

export default function SimulationCard({ simulation, route }) {
  const [simulated, setSimulated] = useState(false);
  const improvement = simulation.before - simulation.after;

  return (
    <section className="card">
      <div className="card-head">
        <h2>What-if Simulation</h2>
      </div>

      <div className="sim-row">
        <div className="sim-block">
          <span className="sim-label">Before</span>
          <span className="sim-value bad-text">{simulation.before}%</span>
          <span className="muted">congestion</span>
        </div>

        <div className="sim-block">
          <span className="sim-label">After</span>
          {simulated ? (
            <>
              <span className="sim-value ok-text">{simulation.after}%</span>
              <span className="muted">congestion</span>
            </>
          ) : (
            <span className="sim-placeholder">Run the simulation</span>
          )}
        </div>
      </div>

      {simulated && (
        <p className="sim-result" role="status">
          Diverting traffic through {route} lowers congestion by {improvement} points
          ({simulation.before}% to {simulation.after}%).
        </p>
      )}

      <div className="sim-actions">
        <button className="btn" onClick={() => setSimulated(true)} disabled={simulated}>
          Simulate Diversion
        </button>
        {simulated && (
          <button className="btn-link" onClick={() => setSimulated(false)}>
            Reset
          </button>
        )}
      </div>
    </section>
  );
}
