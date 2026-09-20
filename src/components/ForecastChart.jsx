import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

function ForecastChart({ forecast }) {
  if (!forecast || forecast.length === 0) return null

  const data = {
    labels: forecast.map((p) => p.label),
    datasets: [
      {
        label: 'Congestion Index',
        data: forecast.map((p) => p.value),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (ctx) => `Congestion: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: { color: '#94a3b8' },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: 'rgba(148, 163, 184, 0.1)' },
        ticks: {
          color: '#94a3b8',
          callback: (value) => value + '%',
        },
      },
    },
  }

  return (
    <div className="card forecast-card">
      <div className="card-section-header">
        <span className="section-icon">📈</span>
        <h2>Traffic Forecast</h2>
        <span className="ml-badge">ML-Powered</span>
      </div>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default ForecastChart
