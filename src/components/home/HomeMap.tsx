import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Job } from "@/types/job";

interface HomeMapProps {
  jobs: Job[];
  center?: [number, number];
  onMapInteraction?: () => void;
}

const JOB_MARKER_COLOR: Record<string, string> = {
  AI_AGENT: "#1e3a5f",
  HUMAN_WEB: "#22c55e",
  PARTNER_ROUTED: "#8b5cf6",
};

function createJobIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;">
      <span style="color:white;font-size:12px;font-weight:700;">₩</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function MapEvents({ onMapInteraction }: { onMapInteraction?: () => void }) {
  const map = useMap();
  useEffect(() => {
    if (!onMapInteraction) return;
    map.on("dragstart", onMapInteraction);
    map.on("zoomstart", onMapInteraction);
    return () => {
      map.off("dragstart", onMapInteraction);
      map.off("zoomstart", onMapInteraction);
    };
  }, [map, onMapInteraction]);
  return null;
}

export function HomeMap({ jobs, center = [37.498, 127.027], onMapInteraction }: HomeMapProps) {
  return (
    <div className="w-full h-full" style={{ filter: "saturate(0.75) brightness(1.02)" }}>
      <MapContainer
        center={center}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapEvents onMapInteraction={onMapInteraction} />

        {/* Current location */}
        <Circle center={center} radius={200} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 0 }} />
        <CircleMarker center={center} radius={8} pathOptions={{ color: "white", fillColor: "#3b82f6", fillOpacity: 1, weight: 3 }} />

        {/* Job markers */}
        {jobs.map((job) => {
          const color = JOB_MARKER_COLOR[job.request_source] || "#1e3a5f";
          return (
            <Marker key={job.id} position={[job.lat, job.lng]} icon={createJobIcon(color)}>
              <Popup>
                <div style={{ fontFamily: "Pretendard, sans-serif", minWidth: 120, padding: 4 }}>
                  <strong style={{ fontSize: 13 }}>{job.title}</strong><br />
                  <span style={{ color: "#1e3a5f", fontWeight: 700 }}>{job.budget.toLocaleString()}원</span>
                  <span style={{ color: "#6b7280", fontSize: 11 }}> · {job.distance_km?.toFixed(1)}km</span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
