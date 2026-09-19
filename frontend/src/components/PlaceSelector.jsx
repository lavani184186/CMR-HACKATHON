import { places } from "../data/mockData";

export default function PlaceSelector({ selectedId, onSelect }) {
  return (
    <div className="place-selector" role="group" aria-label="Select a place">
      <span className="place-label">Place</span>
      {places.map((place) => (
        <button
          key={place.id}
          className={`place-btn${place.id === selectedId ? " active" : ""}`}
          aria-pressed={place.id === selectedId}
          onClick={() => onSelect(place.id)}
        >
          {place.name}
        </button>
      ))}
    </div>
  );
}
