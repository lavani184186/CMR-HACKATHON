import { useState } from 'react'
import { simulationData } from '../data/mockData'

function SimulationCard() {
  const [simulated, setSimulated] = useState(false)

  return (
    <div className="card simulation-card">
      <div className="card-section-header">
        <span className="section-icon">🧪</span>
        <h2>What-If Simulation</h2>
      </div>
      <div className="simulation-content">
        <div className="simulation-bars">
          <div className="sim-bar-group">
            <div className="sim-bar-label">Before Diversion</div>
            <div className="sim-bar-track">
              <div
                className="sim-bar-fill before"
                style={{ width: `${simulationData.before}%` }}
              ></div>
            </div>
            <span className="sim-bar-value">{simulationData.before}%</span>
          </div>
          <div className="sim-bar-group">
            <div className="sim-bar-label">After Diversion</div>
            <div className="sim-bar-track">
              <div
                className="sim-bar-fill after"
                style={{ width: simulated ? `${simulationData.after}%` : '0%' }}
              ></div>
            </div>
            <span className="sim-bar-value">
              {simulated ? `${simulationData.after}%` : '—'}
            </span>
          </div>
        </div>
        <div className="simulation-actions">
          {simulated && (
            <div className="sim-result">
              <span className="sim-result-icon">✅</span>
              <span>
                Diverting via <strong>{simulationData.route}</strong> reduces congestion by{' '}
                <strong>{simulationData.improvement}%</strong>
              </span>
            </div>
          )}
          <button
            className="sim-button"
            onClick={() => setSimulated(!simulated)}
          >
            {simulated ? 'Reset Simulation' : 'Simulate Diversion'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimulationCard
