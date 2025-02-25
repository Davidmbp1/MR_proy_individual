// client/src/pages/Restaurants.tsx
import { useEffect, useState, useTransition } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import RestaurantHero from './restaurants_sections/RestaurantHero';
import FilterSection from './restaurants_sections/FilterSection';
import SideFilterSection from './restaurants_sections/SideFilterSection';
import RestaurantList from './restaurants_sections/RestaurantList';
import RestaurantMap from './restaurants_sections/RestaurantMap';
import ScrollToTop from '../pages/restaurants_sections/ScrollToTop';

export interface IRestaurant {
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

function Restaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const initialRegion = searchParams.get('region') || '';
  const initialCuisine = searchParams.get('cuisine') || '';
  const initialPriceRange = searchParams.get('priceRange') || '';
  const initialFeatures = searchParams.get('features')
    ? searchParams.get('features')!.split(',')
    : [];
  const initialDietary = searchParams.get('dietary')
    ? searchParams.get('dietary')!.split(',')
    : [];

  const [region, setRegion] = useState(initialRegion);
  const [cuisine, setCuisine] = useState(initialCuisine);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialFeatures);
  const [selectedDietary, setSelectedDietary] = useState<string[]>(initialDietary);

  const [showMap, setShowMap] = useState(false);

  const [isPending, startTransition] = useTransition();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    const params: Record<string, string> = {};
    if (region) params.region = region;
    if (cuisine) params.cuisine = cuisine;
    if (priceRange) params.priceRange = priceRange;
    if (selectedFeatures.length > 0) params.features = selectedFeatures.join(',');
    if (selectedDietary.length > 0) params.dietary = selectedDietary.join(',');

    setSearchParams(params, { replace: true });
  }, [region, cuisine, priceRange, selectedFeatures, selectedDietary, setSearchParams]);

  useEffect(() => {
    startTransition(() => {
      fetchRestaurants();
    });
  }, [region, cuisine, priceRange, selectedFeatures, selectedDietary]);

  const fetchRestaurants = () => {
    setLoading(true);
    setError('');
    nprogress.start();

    const params: string[] = [];
    if (region) params.push(`region=${encodeURIComponent(region)}`);
    if (cuisine) params.push(`cuisine=${encodeURIComponent(cuisine)}`);
    if (priceRange) params.push(`priceRange=${encodeURIComponent(priceRange)}`);
    if (selectedFeatures.length > 0) {
      params.push(`features=${encodeURIComponent(selectedFeatures.join(','))}`);
    }
    if (selectedDietary.length > 0) {
      params.push(`dietary=${encodeURIComponent(selectedDietary.join(','))}`);
    }

    const query = params.length ? `?${params.join('&')}` : '';

    axios
      .get(`${backendUrl}/api/restaurants${query}`)
      .then((res) => {
        setRestaurants(res.data);
        setLoading(false);
        nprogress.done();
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Error loading restaurants');
        setLoading(false);
        nprogress.done();
      });
  };

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  const containerClass = `
    transition-opacity duration-300
    ${loading || isPending ? 'opacity-50' : 'opacity-100'}
  `;

  return (
    <div>
      <ScrollToTop />

      <RestaurantHero region={region} />

      <FilterSection
        region={region}
        setRegion={setRegion}
        cuisine={cuisine}
        setCuisine={setCuisine}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex">
          <div
            className="
              hidden md:block md:w-64 mr-4 
              sticky top-24 self-start 
              max-h-[calc(100vh-6rem)] 
              overflow-y-auto 
              flex flex-col gap-4
              bg-white
              relative
              z-10
            "
          >
            <button
              onClick={handleToggleMap}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            >
              {showMap ? 'View List' : 'View Map'}
            </button>

            <SideFilterSection
              region={region}
              cuisine={cuisine}
              priceRange={priceRange}
              selectedFeatures={selectedFeatures}
              setSelectedFeatures={setSelectedFeatures}
              selectedDietary={selectedDietary}
              setSelectedDietary={setSelectedDietary}
            />
          </div>

          <div className="flex-1">
            <div className={containerClass}>
              {loading && <p className="text-center py-8">Loading...</p>}
              {error && <p className="text-center py-8 text-red-600">{error}</p>}

              {!loading && !error && (
                showMap ? (
                  <RestaurantMap restaurants={restaurants} />
                ) : (
                  <RestaurantList restaurants={restaurants} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
