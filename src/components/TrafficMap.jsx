import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { roadSegments, incidentData } from '../data/mockData'

function TrafficMap() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapInstanceRef.current) return

    const map = L.map(mapRef.current).setView([12.9416, 77.6200], 13)
    mapInstanceRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19,
    }).addTo(map)

    roadSegments.forEach((segment) => {
      const polyline = L.polyline(segment.positions, {
        color: segment.color,
        weight: 5,
        opacity: 0.8,
      }).addTo(map)
      polyline.bindPopup(
        `<strong>${segment.name}</strong><br/>Segment: ${segment.id}<br/>Status: ${segment.status}`
      )
    })

    const incidentIcon = L.divIcon({
      html: '<div style="background:#ef4444;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4);">⚠️</div>',
      className: 'incident-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })

    L.marker(incidentData.position, { icon: incidentIcon })
      .addTo(map)
      .bindPopup(
        `<strong>${incidentData.type}</strong><br/>Location: ${incidentData.location}<br/>Confidence: ${incidentData.confidence}%`
      )

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  return (
    <div className="card traffic-map-card">
      <div className="card-section-header">
        <span className="section-icon">🗺️</span>
        <h2>Traffic Map</h2>
      </div>
      <div className="map-legend">
        <span className="legend-item"><span className="legend-dot" style={{background:'#10b981'}}></span>Normal</span>
        <span className="legend-item"><span className="legend-dot" style={{background:'#f59e0b'}}></span>Slow</span>
        <span className="legend-item"><span className="legend-dot" style={{background:'#ef4444'}}></span>Congested</span>
      </div>
      <div ref={mapRef} className="map-container"></div>
    </div>
  )
}

export default TrafficMap
