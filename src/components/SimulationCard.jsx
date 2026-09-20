import { useState } from 'react'
import { simulate } from '../data/api'

function SimulationCard({ simulation, route, placeId }) {
  const [simulated, setSimulated] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const before = simulation?.before ?? 82
  const after = result?.after ?? simulation?.after ?? 61
  const improvement = before - after
  const displayRoute = result?.route ?? route

  async function handleSimulate() {
    setLoading(true)
    // Try backend first
    const apiResult = await simulate(placeId)
    if (apiResult && !apiResult.error) {
      setResult(apiResult)
    }
    setSimulated(true)
    setLoading(false)
  }

  function handleReset() {
    setSimulated(false)
    setResult(null)
  }

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
                style={{ width: `${before}%` }}
              ></div>
            </div>
            <span className="sim-bar-value">{before}%</span>
          </div>
          <div className="sim-bar-group">
            <div className="sim-bar-label">After Diversion</div>
            <div className="sim-bar-track">
              <div
                className="sim-bar-fill after"
                style={{ width: simulated ? `${after}%` : '0%' }}
              ></div>
            </div>
            <span className="sim-bar-value">
              {simulated ? `${after}%` : '—'}
            </span>
          </div>
        </div>
        <div className="simulation-actions">
          {simulated && (
            <div className="sim-result">
              <span className="sim-result-icon">✅</span>
              <span>
                Diverting via <strong>{displayRoute}</strong> reduces congestion by{' '}
                <strong>{improvement}%</strong>
              </span>
            </div>
          )}
          <button
            className="sim-button"
            onClick={simulated ? handleReset : handleSimulate}
            disabled={loading}
          >
            {loading ? 'Running...' : simulated ? 'Reset Simulation' : 'Simulate Diversion'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimulationCard
