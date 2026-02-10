import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Job } from "@/types/job";

interface HomeMapProps {
  jobs: Job[];
  center?: [number, number];
}

const JOB_MARKER_COLOR: Record<string, string> = {
  AI_AGENT: "#1e3a5f",
  HUMAN_WEB: "#22c55e",
  PARTNER_ROUTED: "#8b5cf6",
};

export function HomeMap({ jobs, center = [37.498, 127.027] }: HomeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView(center, 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Current location marker
    const currentIcon = L.divIcon({
      className: "current-location-marker",
      html: `<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 0 3px rgba(59,130,246,0.3),0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
    L.marker(center, { icon: currentIcon }).addTo(map);

    // Pulse ring
    const pulseIcon = L.divIcon({
      className: "pulse-ring",
      html: `<div style="width:40px;height:40px;background:rgba(59,130,246,0.15);border-radius:50%;animation:pulse-ring 2s ease-out infinite;"></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
    L.marker(center, { icon: pulseIcon, interactive: false }).addTo(map);

    // Job markers
    jobs.forEach((job) => {
      const color = JOB_MARKER_COLOR[job.request_source] || "#1e3a5f";
      const jobIcon = L.divIcon({
        className: "job-marker",
        html: `<div style="width:32px;height:32px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
          <span style="color:white;font-size:12px;font-weight:700;">₩</span>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
      L.marker([job.lat, job.lng], { icon: jobIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:Pretendard,sans-serif;min-width:120px;">
            <strong style="font-size:13px;">${job.title}</strong><br/>
            <span style="color:#1e3a5f;font-weight:700;">${job.budget.toLocaleString()}원</span>
            <span style="color:#6b7280;font-size:11px;"> · ${job.distance_km?.toFixed(1)}km</span>
          </div>`
        );
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />
    </>
  );
}
