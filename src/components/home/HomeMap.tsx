import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Job } from "@/types/job";
import { getBudgetColor } from "@/lib/budget";

interface HomeMapProps {
  jobs: Job[];
  center?: [number, number];
  onMapInteraction?: () => void;
  onPopupClick?: (jobId: string) => void;
}

const JOB_MARKER_COLOR: Record<string, string> = {
  AI_AGENT: "#1e3a5f",
  HUMAN_WEB: "#22c55e",
  PARTNER_ROUTED: "#8b5cf6",
};

function createJobIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:24px;height:24px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;">
      <span style="color:white;font-size:10px;font-weight:700;">₩</span>
    </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -16],
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

const AUTO_OPEN_COUNT = 3;

function AutoOpenMarker({ job, color, autoOpen, onPopupClick }: { job: Job; color: string; autoOpen: boolean; onPopupClick?: (jobId: string) => void }) {
  const markerRef = useRef<L.Marker>(null);
  const map = useMap();

  useEffect(() => {
    if (autoOpen && markerRef.current) {
      setTimeout(() => {
        markerRef.current?.openPopup();
      }, 500);
    }
  }, [autoOpen]);

  const handleMarkerClick = () => {
    map.panTo([job.lat, job.lng]);
  };

  const budgetColor = getBudgetColor(job.budget);

  return (
    <Marker ref={markerRef} position={[job.lat, job.lng]} icon={createJobIcon(color)} eventHandlers={{ click: handleMarkerClick }}>
      <Popup closeButton={false} autoClose closeOnClick>
        <div
          onClick={() => onPopupClick?.(job.id)}
          style={{ fontFamily: "Pretendard, sans-serif", padding: 0, minWidth: 140, cursor: "pointer" }}
        >
          <strong style={{ fontSize: 13, display: "block", marginBottom: 2 }}>{job.title}</strong>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline", gap: 4 }}>
            <span style={{ color: budgetColor, fontWeight: 700, fontSize: 13 }}>{job.budget.toLocaleString()}원</span>
            <span style={{ color: "#9ca3af", fontSize: 11 }}>{job.distance_km?.toFixed(1)}km</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export function HomeMap({ jobs, center = [37.498, 127.027], onMapInteraction, onPopupClick }: HomeMapProps) {
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
              onPopupClick={onPopupClick}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
