function PlaceSelector({ places, selectedId, onSelect }) {
  return (
    <div className="place-selector">
      <span className="place-label">📍 Location</span>
      {places.map((place) => (
        <button
          key={place.id}
          className={`place-btn${place.id === selectedId ? ' active' : ''}`}
          onClick={() => onSelect(place.id)}
        >
          {place.name}
        </button>
      ))}
    </div>
  )
}

export default PlaceSelector
