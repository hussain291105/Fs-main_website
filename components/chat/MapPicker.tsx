"use client";

import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function SearchBar({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState("");
  const map = useMap();

  async function searchLocation() {
    if (!query.trim()) return;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();

    if (!data.length) {
      alert("Location not found.");
      return;
    }

    const place = data[0];

    const lat = Number(place.lat);
    const lng = Number(place.lon);

    map.flyTo([lat, lng], 16, {
      duration: 1.5,
    });
    onSelect(lat, lng);
  }

  return (
    <div
      className="absolute left-1/2 top-4 z-[1000] flex w-[420px] -translate-x-1/2 rounded-xl bg-white p-2 shadow-xl"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >

      <input
        type="text"
        value={query}
        onClick={(e) => e.stopPropagation()}
        onFocus={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            searchLocation();
          }
        }}
        placeholder="Search location as (Country, State, City, Area)..."
        className="flex-1 rounded-lg border px-4 py-2 outline-none"
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          searchLocation();
        }}
        className="ml-2 rounded-lg bg-primary px-5 text-white"
      >
        Search
      </button>

    </div>
  );
}

function LocationMarker({
  position,
  setPosition,
  onSelect,
}: {
  position: [number, number] | null;
  setPosition: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
  onSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      const pos: [number, number] = [
        e.latlng.lat,
        e.latlng.lng,
      ];
 
      setPosition(pos);
      onSelect(pos[0], pos[1]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({
  onSelect,
  onDone,
}: {
  onSelect: (lat: number, lng: number) => void;
  onDone: () => void;
}) {
  console.log("MapPicker Render");
  const [position, setPosition] = useState<[number, number] | null>(null);

  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={13}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <SearchBar
        onSelect={(lat, lng) => {
          setPosition([lat, lng]);
          onSelect(lat, lng);
        }}
      />

      <LocationMarker
        position={position}
        setPosition={setPosition}
        onSelect={onSelect}
      />

      {position && (
        <div
          className="
            absolute
            bottom-5
            left-1/2
            z-[1000]
            flex
            -translate-x-1/2
            gap-4
            rounded-2xl
            bg-white
            p-3
            shadow-2xl
          "
        >
          <button
            onClick={() => setPosition(null)}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Change
          </button>

          <button
            onClick={onDone}
            className="rounded-lg bg-primary px-6 py-2 text-white hover:opacity-90"
          >
            ✓ Confirm Location
          </button>
        </div>
      )}
    </MapContainer>
  );
}
