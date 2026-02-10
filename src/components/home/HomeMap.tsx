import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Circle, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { Job } from "@/types/job";

interface HomeMapProps {
  jobs: Job[];
  center?: [number, number];
  onMapInteraction?: () => void;
  onSearchArea?: () => void;
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

const AUTO_OPEN_COUNT = 3;

export function HomeMap({ jobs, center = [37.498, 127.027], onMapInteraction, onSearchArea }: HomeMapProps) {
  return (
    <div className="w-full h-full relative">
      <div style={{ filter: "saturate(0.65) brightness(1.0)", width: "100%", height: "100%" }}>
        <MapContainer
          center={center}
          zoom={14}
          zoomControl={false}
          attributionControl={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <MapEvents onMapInteraction={onMapInteraction} />

          {/* Current location */}
          <Circle center={center} radius={200} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 0 }} />
          <CircleMarker center={center} radius={8} pathOptions={{ color: "white", fillColor: "#3b82f6", fillOpacity: 1, weight: 3 }} />

          {/* Job markers */}
          {jobs.map((job, idx) => {
            const color = JOB_MARKER_COLOR[job.request_source] || "#1e3a5f";
            const showByDefault = idx < AUTO_OPEN_COUNT;
            return (
              <Marker key={job.id} position={[job.lat, job.lng]} icon={createJobIcon(color)}>
                {showByDefault && (
                  <Tooltip
                    permanent
                    direction="top"
                    offset={[0, -18]}
                    className="job-tooltip-permanent"
                  >
                    <span style={{ fontFamily: "Pretendard, sans-serif", fontSize: 12, fontWeight: 700 }}>
                      {job.budget.toLocaleString()}원
                    </span>
                  </Tooltip>
                )}
                <Popup closeButton={false}>
                  <div style={{ fontFamily: "Pretendard, sans-serif", padding: 0 }}>
                    <strong style={{ fontSize: 13 }}>{job.title}</strong><br />
                    <span style={{ color: "#1e3a5f", fontWeight: 700, fontSize: 13 }}>{job.budget.toLocaleString()}원</span>
                    <span style={{ color: "#6b7280", fontSize: 11, marginLeft: 3 }}>{job.distance_km?.toFixed(1)}km</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Search this area button */}
      {onSearchArea && (
        <button
          onClick={onSearchArea}
          className="absolute z-[600] left-1/2 -translate-x-1/2 bg-white border-2 border-primary text-primary text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
          style={{ bottom: 16 }}
        >
          이 지역에서 검색
        </button>
      )}
    </div>
  );
}
