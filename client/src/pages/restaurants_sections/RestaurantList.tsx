// client/src/pages/restaurants_sections/RestaurantList.tsx
import React from 'react';
import RestaurantCard from '../../components/RestaurantCard';

interface IRestaurant {
  _id: string;
  name: string;
  region: string;
  cuisine?: string[];
  rating?: number;
  mainImage?: string;
  priceRange?: string;
  address?: string;
  offers?: {
    _id: string;
    title: string;
    price: number;
    originalPrice?: number;
    expiryDate: Date;
  }[];
  venueType?: string;
}

interface RestaurantListProps {
  restaurants: IRestaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <section
      className="restaurant-list-container max-w-4xl mx-auto px-4 py-8"
      style={{ minHeight: '600px', overflowAnchor: 'none' }}
    >
      {restaurants.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Loading restaurants...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant._id} {...restaurant} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RestaurantList;
