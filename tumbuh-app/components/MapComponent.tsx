"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Leaf } from "lucide-react";

// Mock data
const MOCK_MARKERS = [
  { id: "1", lat: -6.111, lng: 106.822, adopted: false, species: "Avicennia marina" },
  { id: "2", lat: -6.594, lng: 106.789, adopted: false, species: "Swietenia macrophylla" },
  { id: "3", lat: -2.990, lng: 104.756, adopted: true, species: "Hevea brasiliensis" },
];

export default function MapComponent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fix leafet icon issues in React
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  if (!mounted) return <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center text-stone-400">Loading Map...</div>;

  // Custom Icons
  const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const yellowIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="w-full h-[600px] rounded-[2rem] border border-stone-200 shadow-xl overflow-hidden z-0 relative group">
      <div className="absolute inset-0 border-[6px] border-white/50 rounded-[2rem] z-10 pointer-events-none"></div>
      <MapContainer 
        center={[-4.5, 105.8]} 
        zoom={6} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%", zIndex: 1, background: "#f0fdf4" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {MOCK_MARKERS.map(marker => (
          <Marker 
            key={marker.id} 
            position={[marker.lat, marker.lng]}
            icon={marker.adopted ? greenIcon : yellowIcon}
          >
            <Popup className="rounded-xl overflow-hidden">
              <div className="font-sans min-w-[150px]">
                <strong className="block text-lg mb-2 text-[#1A2F24] font-outfit">{marker.species}</strong>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold uppercase rounded-md shadow-sm ${marker.adopted ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${marker.adopted ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                  {marker.adopted ? "Sponsored" : "Available Plot"}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
