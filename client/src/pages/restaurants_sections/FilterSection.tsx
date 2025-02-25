// client/src/pages/restaurants_sections/FilterSection.tsx
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaUtensils, FaDollarSign } from 'react-icons/fa';

interface FilterSectionProps {
  region: string;
  setRegion: (value: string) => void;
  cuisine: string;
  setCuisine: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  region,
  setRegion,
  cuisine,
  setCuisine,
  priceRange,
  setPriceRange
}) => {
  const [regionsList, setRegionsList] = useState<string[]>([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    fetch(`${backendUrl}/api/restaurants/regions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRegionsList(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching regions:', err);
      });
  }, [backendUrl]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-6 bg-gradient-to-r from-blue-50 to-white border border-gray-200 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Filter Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>Region</span>
          </label>
          <select
            value={region}
            onChange={handleRegionChange}
            className="block w-full border border-gray-300 bg-gray-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          >
            <option value="">All Regions</option>
            {regionsList.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaUtensils className="text-green-500" />
            <span>Cuisine</span>
          </label>
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="block w-full border border-gray-300 bg-gray-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900"
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Brazilian">Brazilian</option>
            <option value="Mexican">Mexican</option>
            <option value="Peruvian">Peruvian</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
            <FaDollarSign className="text-yellow-500" />
            <span>Price Range</span>
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="block w-full border border-gray-300 bg-gray-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900"
          >
            <option value="">Any</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
