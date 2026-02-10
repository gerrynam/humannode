import { useEffect, useRef } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { GOOGLE_MAPS_API_KEY } from "@/config/googleMaps";

interface JobProgressMapProps {
  lat: number;
  lng: number;
  label?: string;
}

const MAP_STYLES = [
  { elementType: "geometry", stylers: [{ saturation: -60 }, { lightness: 10 }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ lightness: 30 }] },
  { featureType: "water", elementType: "geometry", stylers: [{ saturation: -40 }, { lightness: 20 }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
];

export function JobProgressMap({ lat, lng, label }: JobProgressMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    Promise.all([
      importLibrary("maps"),
      importLibrary("marker"),
    ]).then(([mapsLib, markerLib]) => {
      if (!mapRef.current) return;

      const map = new mapsLib.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 16,
        disableDefaultUI: true,
        gestureHandling: "none",
        styles: MAP_STYLES,
      });

      const markerEl = document.createElement("div");
      markerEl.innerHTML = `
        <div style="width:36px;height:36px;background:#ef4444;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
          <span style="color:white;font-size:16px;">📍</span>
        </div>
      `;

      const marker = new markerLib.AdvancedMarkerElement({
        position: { lat, lng },
        map,
        content: markerEl,
      });

      if (label) {
        const InfoWindow = (window as any).google?.maps?.InfoWindow;
        if (InfoWindow) {
          const infoWindow = new InfoWindow({ content: label });
          infoWindow.open({ anchor: marker, map });
        }
      }

      mapInstanceRef.current = map;
    });

    return () => {
      mapInstanceRef.current = null;
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}
