import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY } from "@/config/googleMaps";
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

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ saturation: -60 }, { lightness: 10 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ lightness: 30 }] },
  { featureType: "water", elementType: "geometry", stylers: [{ saturation: -40 }, { lightness: 20 }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
];

let optionsSet = false;

export function HomeMap({ jobs, center = [37.498, 127.027], onMapInteraction }: HomeMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    if (!optionsSet) {
      setOptions({ key: GOOGLE_MAPS_API_KEY, v: "weekly" });
      optionsSet = true;
    }

    Promise.all([
      importLibrary("maps"),
      importLibrary("marker"),
    ]).then(([mapsLib, markerLib]) => {
      if (!mapRef.current) return;

      const map = new mapsLib.Map(mapRef.current, {
        center: { lat: center[0], lng: center[1] },
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: MAP_STYLES,
      });

      // Notify parent when user interacts with map
      if (onMapInteraction) {
        map.addListener("dragstart", onMapInteraction);
        map.addListener("zoom_changed", onMapInteraction);
      }

      // Current location pulse
      const currentEl = document.createElement("div");
      currentEl.innerHTML = `
        <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
          <div style="position:absolute;width:40px;height:40px;background:rgba(59,130,246,0.15);border-radius:50%;animation:gmap-pulse 2s ease-out infinite;"></div>
          <div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);z-index:1;"></div>
        </div>
      `;

      new markerLib.AdvancedMarkerElement({
        position: { lat: center[0], lng: center[1] },
        map,
        content: currentEl,
      });

      // Job markers
      jobs.forEach((job) => {
        const color = JOB_MARKER_COLOR[job.request_source] || "#1e3a5f";
        const jobEl = document.createElement("div");
        jobEl.innerHTML = `
          <div style="width:32px;height:32px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <span style="color:white;font-size:12px;font-weight:700;">₩</span>
          </div>
        `;

        const marker = new markerLib.AdvancedMarkerElement({
          position: { lat: job.lat, lng: job.lng },
          map,
          content: jobEl,
        });

        const InfoWindow = (window as any).google?.maps?.InfoWindow;
        if (InfoWindow) {
          const infoWindow = new InfoWindow({
            content: `<div style="font-family:Pretendard,sans-serif;min-width:120px;padding:4px;">
              <strong style="font-size:13px;">${job.title}</strong><br/>
              <span style="color:#1e3a5f;font-weight:700;">${job.budget.toLocaleString()}원</span>
              <span style="color:#6b7280;font-size:11px;"> · ${job.distance_km?.toFixed(1)}km</span>
            </div>`,
          });

          marker.addListener("click", () => {
            infoWindow.open({ anchor: marker, map });
          });
        }
      });

      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes gmap-pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full" />
    </>
  );
}
