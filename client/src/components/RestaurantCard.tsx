import React from 'react';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  _id: string;
  name: string;
  region: string;
  cuisine?: string[];
  rating?: number;
  mainImage?: string;
  priceRange?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ _id, name, region, cuisine, rating, mainImage, priceRange }) => {
  return (
    <Link to={`/restaurants/${_id}`} className="block border rounded overflow-hidden shadow hover:shadow-lg transition-shadow">
      <img 
        src={mainImage || 'https://via.placeholder.com/300'} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{region}</p>
        {cuisine && <p className="text-sm text-gray-600">{cuisine.join(', ')}</p>}
        <p className="text-sm text-gray-600">Rating: {rating ?? 'N/A'}</p>
        <p className="text-sm text-gray-600">Price: {priceRange}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
