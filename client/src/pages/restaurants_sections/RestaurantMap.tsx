// client/src/pages/restaurants_sections/RestaurantMap.tsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import AutoFitBounds from './AutoFitBounds';
import RestaurantDetailCard from './RestaurantDetailCard';

// Asegúrate de tener la imagen en public/icons/restaurant.png
const bigRestaurantIcon = L.icon({
  iconUrl: '/icons/restaurant.png',
  iconSize: [50, 50],
  iconAnchor: [25, 45],
  popupAnchor: [0, -40],
});

interface IOffer {
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  expiryDate: Date;
  quantity?: number;
  status?: string;
}

export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export interface IRestaurant {
  _id: string;
  name: string;
  region: string;
  mainImage?: string;
  address?: string;
  location?: ILocation;
  rating?: number;
  priceRange?: string;
  cuisine?: string[];
  offers?: IOffer[];
  // ...otros campos que necesites
}

interface RestaurantMapProps {
  restaurants: IRestaurant[];
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants }) => {
  // Siempre usamos restaurants (inicializado en el padre como array)
  const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  // Calcula posiciones [lat, lng] para AutoFitBounds
  const positions: [number, number][] = restaurants
    .filter((r) => r.location)
    .map((r) => {
      const [lng, lat] = r.location!.coordinates;
      return [lat, lng];
    });

  // Cuando se hace clic en un marcador
  const handleMarkerClick = (restaurant: IRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Efecto para hacer scroll hacia la tarjeta cuando se seleccione un restaurante
  useEffect(() => {
    if (selectedRestaurant && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedRestaurant]);

  return (
    <>
      <div className="relative w-full h-[70vh] border rounded shadow">
        <MapContainer
          center={[-12.046374, -77.042793]}
          zoom={8}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />

          {/* Auto-ajusta el mapa a los marcadores */}
          <AutoFitBounds positions={positions} />

          {/* Renderiza los marcadores */}
          {restaurants.map((restaurant) => {
            if (!restaurant.location) return null;
            const [lng, lat] = restaurant.location.coordinates;
            return (
              <Marker
                key={restaurant._id}
                position={[lat, lng]}
                icon={bigRestaurantIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(restaurant),
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Tarjeta de detalle debajo del mapa */}
      {selectedRestaurant && (
        <div ref={detailRef} className="mt-4 max-w-7xl mx-auto px-4">
          <RestaurantDetailCard
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        </div>
      )}
    </>
  );
};

export default RestaurantMap;
