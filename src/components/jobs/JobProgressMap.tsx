import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface JobProgressMapProps {
  lat: number;
  lng: number;
  label?: string;
}

export function JobProgressMap({ lat, lng, label }: JobProgressMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
    }).setView([lat, lng], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const icon = L.divIcon({
      className: "destination-marker",
      html: `<div style="width:36px;height:36px;background:hsl(0,84%,60%);border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
        <span style="color:white;font-size:16px;">📍</span>
      </div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
    const marker = L.marker([lat, lng], { icon }).addTo(map);
    if (label) marker.bindPopup(label).openPopup();

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}
