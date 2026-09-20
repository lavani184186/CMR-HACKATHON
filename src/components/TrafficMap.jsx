import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function TrafficMap({ place }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    // Clean up previous map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    if (!place) return

    const map = L.map(mapRef.current, {
      center: place.center,
      zoom: place.zoom || 14,
      scrollWheelZoom: false,
    })
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19,
    }).addTo(map)

    // Draw road segments
    ;(place.roads || []).forEach((road) => {
      const polyline = L.polyline(road.path, {
        color: road.color || '#10b981',
        weight: 6,
        opacity: 0.85,
        lineCap: 'round',
      }).addTo(map)
      polyline.bindPopup(
        `<strong>${road.name}</strong><br/>Segment: ${road.id}<br/>Status: ${road.status}`
      )
    })

    // Incident marker on affected road
    if (place.incident) {
      const incidentRoad = (place.roads || []).find(
        (r) => r.id === place.incident.segment
      )
      if (incidentRoad && incidentRoad.path.length > 1) {
        const incidentIcon = L.divIcon({
          html: '<div style="background:#ef4444;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);">⚠️</div>',
          className: 'incident-marker',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        L.marker(incidentRoad.path[1], { icon: incidentIcon })
          .addTo(map)
          .bindPopup(
            `<strong>${place.incident.type}</strong><br/>Segment: ${place.incident.segment}<br/>Confidence: ${place.incident.confidence}%`
          )
      }
    }

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [place])

  return (
    <div className="card traffic-map-card">
      <div className="card-section-header">
        <span className="section-icon">🗺️</span>
        <h2>Traffic Map{place ? ` · ${place.name}` : ''}</h2>
      </div>
      <div className="map-legend">
        <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }}></span>Normal</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }}></span>Slow</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }}></span>Congested</span>
      </div>
      <div ref={mapRef} className="map-container"></div>
    </div>
  )
}

export default TrafficMap
