// client/src/pages/review_sections/RestaurantOverviewSection.tsx
import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface IRestaurant {
  _id: string;
  name: string;
  region: string;
  rating?: number;
  cuisine?: string[];
  address?: string;
  mainImage?: string;
  overview?: string;

}

interface RestaurantOverviewSectionProps {
  restaurant: IRestaurant;
}

const RestaurantOverviewSection: React.FC<RestaurantOverviewSectionProps> = ({ restaurant }) => {
  const fallbackImage = 'https://www.abasturhub.com/img/blog/mejores-restaurantes---diseno-sin-titulo.jpg';
  const [imgSrc, setImgSrc] = useState(restaurant.mainImage || fallbackImage);

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row">
          <motion.img
            src={imgSrc}
            alt={restaurant.name}
            onError={() => setImgSrc(fallbackImage)}
            className="w-full md:w-1/2 h-72 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
          />
          <div className="md:ml-8 mt-6 md:mt-0 flex-1">
            <motion.h1
              className="text-4xl font-extrabold text-gray-800"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {restaurant.name}
            </motion.h1>
            <motion.p
              className="flex items-center text-gray-600 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FaMapMarkerAlt className="mr-2 text-red-500" /> {restaurant.address || restaurant.region}
            </motion.p>
            {restaurant.cuisine && (
              <motion.p
                className="text-gray-600 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="font-semibold">Cocina:</span> {restaurant.cuisine.join(', ')}
              </motion.p>
            )}
            <div className="flex items-center mt-3">
              {restaurant.rating ? (
                <>
                  {Array(Math.round(restaurant.rating))
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                  <span className="text-gray-600 text-lg ml-2">
                    ({restaurant.rating.toFixed(1)})
                  </span>
                </>
              ) : (
                <span className="text-gray-600 text-lg">Sin reseñas</span>
              )}
            </div>
            {restaurant.overview && (
              <motion.div
                className="mt-4 text-gray-700 text-justify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {restaurant.overview}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantOverviewSection;
