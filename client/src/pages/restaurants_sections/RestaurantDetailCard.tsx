// client/src/pages/restaurants_sections/RestaurantDetailCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface IOffer {
  _id?: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  expiryDate: Date;
  quantity?: number;
  status?: string;
}

export interface IRestaurant {
  _id: string;
  name: string;
  region: string;
  mainImage?: string;
  address?: string;
  rating?: number;
  priceRange?: string;
  cuisine?: string[];
  offers?: IOffer[];
}

interface RestaurantDetailCardProps {
  restaurant: IRestaurant;
  onClose: () => void;
}

const RestaurantDetailCard: React.FC<RestaurantDetailCardProps> = ({ restaurant, onClose }) => {
  const renderRatingStars = (rating: number | undefined) => {
    if (!rating) return 'No reviews';
    const stars = Math.round(rating);
    return '⭐'.repeat(stars) + ` (${rating.toFixed(1)})`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="p-4 border rounded shadow bg-white">
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 text-xl"
        >
          &times;
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={restaurant.mainImage || 'https://via.placeholder.com/300'}
          alt={restaurant.name}
          className="w-full md:w-72 h-48 object-cover rounded"
        />
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-1">{restaurant.name}</h2>
          <p className="text-gray-700 mb-1">
            {restaurant.address || 'No address'}, {restaurant.region}
          </p>
          <p className="text-sm text-gray-500 mb-1">
            {renderRatingStars(restaurant.rating)}
          </p>
          {restaurant.cuisine && (
            <p className="text-sm text-gray-600 mb-2">
              {restaurant.cuisine.join(', ')}
            </p>
          )}
        </div>
      </div>

      {restaurant.offers && restaurant.offers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Offers</h3>
          <div className="flex flex-wrap gap-2">
            {restaurant.offers.map((offer) => {
              if (!offer._id) return null;

              return (
                <div key={offer._id} className="p-2 border rounded bg-gray-50 flex flex-col items-center">
                  <p className="text-sm text-gray-700 font-semibold">
                    {formatDate(offer.expiryDate)}
                  </p>
                  <p className="text-xs text-gray-500">6:00pm</p>
                  <p className="text-xs text-blue-600 font-bold">
                    {offer.price < (offer.originalPrice || 9999)
                      ? Math.round((offer.price / (offer.originalPrice || 1)) * 100) + '% off'
                      : 'No discount'}
                  </p>

                  <Link
                    to={`/restaurants/${restaurant._id}/offer/${offer._id}`}
                    className="mt-2 text-blue-500 underline text-sm hover:text-blue-700"
                  >
                    View Offer
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailCard;
