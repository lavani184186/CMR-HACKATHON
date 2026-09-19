import { useState } from "react";
import Header from "./components/Header";
import PlaceSelector from "./components/PlaceSelector";
import SummaryCards from "./components/SummaryCards";
import TrafficMap from "./components/TrafficMap";
import ForecastChart from "./components/ForecastChart";
import IncidentAlert from "./components/IncidentAlert";
import RecommendationCard from "./components/RecommendationCard";
import SimulationCard from "./components/SimulationCard";
import { places, defaultPlaceId } from "./data/mockData";

export default function App() {
  const [placeId, setPlaceId] = useState(defaultPlaceId);
  const place = places.find((p) => p.id === placeId);

  return (
    <div className="app">
      <Header />
      <main className="dashboard">
        <PlaceSelector selectedId={placeId} onSelect={setPlaceId} />
        <SummaryCards summary={place.summary} />

        <div className="row row-map">
          <TrafficMap place={place} />
          <div className="stack">
            <IncidentAlert incident={place.incident} />
            <RecommendationCard recommendation={place.recommendation} />
          </div>
        </div>

        <div className="row row-two">
          <ForecastChart forecast={place.forecast} />
          {/* key resets the simulation when the place changes */}
          <SimulationCard
            key={place.id}
            simulation={place.simulation}
            route={place.recommendation.route}
          />
        </div>
      </main>
    </div>
  );
}
