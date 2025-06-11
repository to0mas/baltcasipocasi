import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import './Radarmap.css'

const RadarMap = () => {
  const [radarTimestamp, setRadarTimestamp] = useState(null);
  const [satelliteTimestamp, setSatelliteTimestamp] = useState(null);

  useEffect(() => {
    const fetchTimestamps = async () => {
      try {
        const res = await fetch("https://api.rainviewer.com/public/weather-maps.json");
        const data = await res.json();

        const radarTimes = data.radar?.past || [];
        const satelliteTimes = data.satellite?.past || [];

        if (radarTimes.length > 0) {
          setRadarTimestamp(radarTimes[radarTimes.length - 1].time);
        }

        if (satelliteTimes.length > 0) {
          setSatelliteTimestamp(satelliteTimes[satelliteTimes.length - 1].time);
        }
      } catch (err) {
        console.error("Chyba při načítání timestampů z RainViewer API:", err);
      }
    };

    fetchTimestamps();
  }, []);

  return (
    <MapContainer center={[49.2, 17.7]} zoom={6} style={{ height: "500px", width: "100%" }}>
      {/* Základní mapa */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap"
      />

      {/* Oblačnost */}
      {satelliteTimestamp && (
        <TileLayer
          url={`https://tilecache.rainviewer.com/v2/satellite/${satelliteTimestamp}/256/{z}/{x}/{y}/2/1_1.png`}
          opacity={0.4}
          attribution="&copy; RainViewer – satellite"
        />
      )}

      {/* Srážky */}
      {radarTimestamp && (
        <TileLayer
          url={`https://tilecache.rainviewer.com/v2/radar/${radarTimestamp}/256/{z}/{x}/{y}/2/1_1.png`}
          opacity={0.5}
          attribution="&copy; RainViewer – radar"
        />
      )}
    </MapContainer>
  );
};

export default RadarMap;
