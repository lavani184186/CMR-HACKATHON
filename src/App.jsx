import Header from './components/Header'
import SummaryCards from './components/SummaryCards'
import TrafficMap from './components/TrafficMap'
import ForecastChart from './components/ForecastChart'
import IncidentAlert from './components/IncidentAlert'
import RecommendationCard from './components/RecommendationCard'
import SimulationCard from './components/SimulationCard'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="dashboard">
        <SummaryCards />
        <div className="dashboard-grid">
          <TrafficMap />
          <ForecastChart />
        </div>
        <div className="dashboard-grid">
          <IncidentAlert />
          <RecommendationCard />
        </div>
        <SimulationCard />
      </main>
    </div>
  )
}

export default App
