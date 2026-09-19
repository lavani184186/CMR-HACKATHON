import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { statusColors } from "../data/mockData";

export default function TrafficMap({ place }) {
  const containerRef = useRef(null);

  // Rebuild the map whenever the selected place changes.
  useEffect(() => {
    const map = L.map(containerRef.current, {
      center: place.center,
      zoom: place.zoom,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    place.roads.forEach((road) => {
      L.polyline(road.path, {
        color: statusColors[road.status],
        weight: 7,
        opacity: 0.9,
        lineCap: "round",
      })
        .bindTooltip(`${road.id} · ${road.name} · ${road.status}`, {
          sticky: true,
        })
        .addTo(map);
    });

    // The incident marker sits on the middle point of the affected road.
    const incidentRoad = place.roads.find((r) => r.id === place.incident.segment);
    if (incidentRoad) {
      // divIcon avoids Leaflet's default image assets, which break under bundlers.
      const incidentIcon = L.divIcon({
        className: "incident-icon",
        html: "!",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker(incidentRoad.path[1], { icon: incidentIcon })
        .bindPopup(`${place.incident.type} on ${place.incident.segment}`)
        .addTo(map);
    }

    return () => map.remove();
  }, [place]);

  return (
    <section className="card map-card">
      <div className="card-head">
        <h2>Traffic Map · {place.name}</h2>
        <ul className="legend">
          <li><span className="swatch normal" />Normal</li>
          <li><span className="swatch slow" />Slow</li>
          <li><span className="swatch congested" />Congested</li>
        </ul>
      </div>
      <div ref={containerRef} className="map" />
    </section>
  );
}
