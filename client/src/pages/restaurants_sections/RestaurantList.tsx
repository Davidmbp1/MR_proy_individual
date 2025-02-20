import React from 'react';
import RestaurantCard from '../../components/RestaurantCard';

interface Restaurant {
  _id: string;
  name: string;
  region: string;
  cuisine?: string[];
  rating?: number;
  mainImage?: string;
  priceRange?: string;
}

interface RestaurantListProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} {...restaurant} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantList;
