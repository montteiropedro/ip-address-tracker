import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

interface MapProps {
  lat: number;
  lng: number;
  isp: string;
}

interface RecenterMapProps {
  lat: number;
  lng: number;
}

function RecenterAutomatically({ lat, lng }: RecenterMapProps) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], undefined, {
      animate: true,
      duration: 1
    });
  }, [lat, lng]);

  return null;
}

export function Map({ lat, lng, isp }: MapProps) {

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-[calc(100vh-250px)] transition-all"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker position={[lat, lng]}>
        <Popup>
          {`Latitude: ${lat}, Longitude: ${lng}`}
        </Popup>
      </Marker>

      <RecenterAutomatically
        lat={lat}
        lng={lng}
      />
    </MapContainer>
  );
}
