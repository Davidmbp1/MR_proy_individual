import { useEffect, useState } from 'react';
import axios from 'axios';
import FilterSection from './restaurants_sections/FilterSection';
import RestaurantList from './restaurants_sections/RestaurantList';

interface Restaurant {
  _id: string;
  name: string;
  region: string;
  cuisine?: string[];
  rating?: number;
  mainImage?: string;
  priceRange?: string;
}

function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtros
  const [region, setRegion] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const fetchRestaurants = () => {
    setLoading(true);
    // Construir query
    let query = '';
    if (region) query += `&region=${encodeURIComponent(region)}`;
    if (cuisine) query += `&cuisine=${encodeURIComponent(cuisine)}`;
    if (priceRange) query += `&priceRange=${encodeURIComponent(priceRange)}`;
    
    // Remover el primer "&" si existe
    if (query.startsWith('&')) {
      query = query.substring(1);
    }
    
    const url = `http://localhost:4000/api/restaurants?${query}`;
    axios.get(url)
      .then(res => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Error loading restaurants');
        setLoading(false);
      });
  };

  // Llama a fetchRestaurants cuando cambien los filtros
  useEffect(() => {
    fetchRestaurants();
  }, [region, cuisine, priceRange]);

  return (
    <div>
      <FilterSection 
        region={region} 
        setRegion={setRegion}
        cuisine={cuisine}
        setCuisine={setCuisine}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && <RestaurantList restaurants={restaurants} />}
    </div>
  );
}

export default Restaurants;
