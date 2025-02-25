// client/src/components/RestaurantCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

interface Offer {
  _id: string;
  title: string;
  price: number;
  originalPrice?: number;
  expiryDate: Date;
}

interface RestaurantCardProps {
  _id: string;
  name: string;
  region: string;
  cuisine?: string[];
  rating?: number;
  mainImage?: string;
  priceRange?: string;
  address?: string;
  offers?: Offer[];
  venueType?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  _id,
  name,
  region,
  cuisine,
  rating,
  priceRange,
  address,
  offers,
  venueType,
}) => {
  const fallbackImage = 'https://www.abasturhub.com/img/blog/mejores-restaurantes---diseno-sin-titulo.jpg';
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/reviews/${_id}`)}
      className="block bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={fallbackImage}
            alt={name}
            className="w-full h-48 md:h-full object-cover"
            style={{ minHeight: '192px' }}
          />
        </div>
        <div className="p-4 md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
            <p className="flex items-center text-gray-600 mt-1">
              <FaMapMarkerAlt className="mr-1 text-red-500" /> {address || region}
            </p>
            {cuisine && (
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Cuisine:</span> {cuisine.join(', ')}
              </p>
            )}
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Price:</span> {priceRange || 'N/A'}
            </p>
            {venueType && (
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Type:</span> {venueType}
              </p>
            )}
            <div className="flex items-center mt-1">
              {rating ? (
                <>
                  {Array(Math.round(rating))
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  <span className="ml-2 text-gray-600">({rating.toFixed(1)})</span>
                </>
              ) : (
                <span className="text-gray-600">No reviews</span>
              )}
            </div>
            {offers && offers.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-green-600 font-semibold">
                  Offer available
                </p>
              </div>
            )}
          </div>
          <div className="mt-4">
            {offers && offers.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate(`/restaurants/${_id}/offer/${offers[0]._id}`);
                }}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View Offer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
