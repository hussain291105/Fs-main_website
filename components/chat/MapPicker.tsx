"use client";

import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
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

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

function SearchBar({
  onSelect,
}: {
  onSelect: (lat: number, lng: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
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

  async function searchCoordinates() {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      alert("Please enter valid coordinates.");
      return;
    }

    map.flyTo([lat, lng], 17, {
      duration: 1.5,
    });

    onSelect(lat, lng);
  }

  return (
    <div
      className="
        absolute
        top-4
        left-1/2
        z-[1000]
        w-[calc(100%-24px)]
        max-w-[540px]
        -translate-x-1/2
        rounded-xl
        bg-white
        p-3
        shadow-xl
        space-y-3
      "
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      {/* Address Search */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchLocation();
          }}
          placeholder="Search location..."
          className="flex-1 rounded-lg border px-4 py-2"
        />

        <button
          onClick={searchLocation}
          className="shrink-0 rounded-lg bg-primary px-5 py-2 text-white"
        >
          Search
        </button>
      </div>
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
      className="w-full h-full rounded-2xl"
    >
      <ResizeMap />

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
            bottom-4
            left-1/2
            z-[1000]
            flex
            w-[calc(100%-20px)]
            max-w-md
            -translate-x-1/2
            flex-col
            gap-2
            rounded-2xl
            bg-white
            p-3
            shadow-2xl
            sm:flex-row
          "
        >
          <button
            onClick={() => setPosition(null)}
            className="flex-1 rounded-lg border py-2 hover:bg-gray-100 cursor-pointer"
          >
            Change
          </button>

          <button
            onClick={onDone}
            className="flex-1 rounded-lg bg-primary py-2 text-white hover:opacity-90 cursor-pointer"
          >
            ✓ Confirm Location
          </button>
        </div>
      )}
    </MapContainer>
  );
}
