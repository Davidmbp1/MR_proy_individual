// client/src/pages/restaurants_sections/RestaurantMap.tsx
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import AutoFitBounds from './AutoFitBounds';
import RestaurantCard from '../../components/RestaurantCard';

// 1) Import the CSS override to force the map behind other elements
import '../../styles/leafletZIndex.css';

const bigRestaurantIcon = L.icon({
  iconUrl: '/icons/restaurant.png',
  iconSize: [50, 50],
  iconAnchor: [25, 45],
  popupAnchor: [0, -40],
});

interface IOffer {
  _id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  expiryDate: Date;
  quantity?: number;
  status?: string;
  stripePriceId?: string;
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
  venueType?: string;
}

interface RestaurantMapProps {
  restaurants: IRestaurant[];
}

const RestaurantMap: React.FC<RestaurantMapProps> = ({ restaurants }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<IRestaurant | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const positions: [number, number][] = restaurants
    .filter((r) => r.location)
    .map((r) => {
      const [lng, lat] = r.location!.coordinates;
      return [lat, lng];
    });

  const handleMarkerClick = (restaurant: IRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  useEffect(() => {
    if (selectedRestaurant && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedRestaurant]);

  return (
    <>
      <div className="relative w-full h-[70vh] border rounded shadow-lg overflow-hidden">
        <MapContainer
          center={[-12.046374, -77.042793]}
          zoom={8}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <AutoFitBounds positions={positions} />
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

      <AnimatePresence>
        {selectedRestaurant && (
          <motion.div
            ref={detailRef}
            className="mt-4 max-w-7xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="text-gray-500 hover:text-gray-700 px-2 py-1"
              >
                ✕
              </button>
            </div>
            <RestaurantCard
              _id={selectedRestaurant._id}
              name={selectedRestaurant.name}
              region={selectedRestaurant.region}
              address={selectedRestaurant.address}
              cuisine={selectedRestaurant.cuisine}
              rating={selectedRestaurant.rating}
              priceRange={selectedRestaurant.priceRange}
              offers={selectedRestaurant.offers}
              venueType={selectedRestaurant.venueType}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RestaurantMap;
