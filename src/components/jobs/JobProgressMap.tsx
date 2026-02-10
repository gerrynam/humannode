import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface JobProgressMapProps {
  lat: number;
  lng: number;
  label?: string;
}

const pinIcon = L.divIcon({
  className: "",
  html: `<div style="width:36px;height:36px;background:#ef4444;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <span style="color:white;font-size:16px;">📍</span>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

export function JobProgressMap({ lat, lng, label }: JobProgressMapProps) {
  return (
    <div className="w-full h-full" style={{ filter: "saturate(0.75) brightness(1.02)" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={16}
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={pinIcon}>
          {label && <Popup>{label}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
