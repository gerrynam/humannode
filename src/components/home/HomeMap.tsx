import { useEffect, useRef } from "react";
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

function getBudgetColor(budget: number): string {
  if (budget >= 50000) return "#0ea5e9"; // sky-500
  if (budget >= 30000) return "#38bdf8"; // sky-400
  if (budget >= 15000) return "#7dd3fc"; // sky-300
  return "#bae6fd"; // sky-200
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

const AUTO_OPEN_COUNT = 3;

function AutoOpenMarker({ job, color, autoOpen }: { job: Job; color: string; autoOpen: boolean }) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    if (autoOpen && markerRef.current) {
      setTimeout(() => {
        markerRef.current?.openPopup();
      }, 500);
    }
  }, [autoOpen]);

  const budgetColor = getBudgetColor(job.budget);

  return (
    <Marker ref={markerRef} position={[job.lat, job.lng]} icon={createJobIcon(color)}>
      <Popup closeButton={false} autoClose closeOnClick>
        <div style={{ fontFamily: "Pretendard, sans-serif", padding: 0 }}>
          <strong style={{ fontSize: 13 }}>{job.title}</strong><br />
          <span style={{ color: budgetColor, fontWeight: 700, fontSize: 13 }}>{job.budget.toLocaleString()}원</span>
          <span style={{ color: "#6b7280", fontSize: 11, marginLeft: 3 }}>{job.distance_km?.toFixed(1)}km</span>
        </div>
      </Popup>
    </Marker>
  );
}

export function HomeMap({ jobs, center = [37.498, 127.027], onMapInteraction }: HomeMapProps) {
  return (
    <div className="w-full h-full" style={{ filter: "saturate(0.65) brightness(1.0)" }}>
      <MapContainer
        center={center}
        zoom={14}
        zoomControl={false}
        attributionControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <MapEvents onMapInteraction={onMapInteraction} />

        <Circle center={center} radius={200} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 0 }} />
        <CircleMarker center={center} radius={8} pathOptions={{ color: "white", fillColor: "#3b82f6", fillOpacity: 1, weight: 3 }} />

        {jobs.map((job, idx) => {
          const color = JOB_MARKER_COLOR[job.request_source] || "#1e3a5f";
          return (
            <AutoOpenMarker
              key={job.id}
              job={job}
              color={color}
              autoOpen={idx < AUTO_OPEN_COUNT}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
