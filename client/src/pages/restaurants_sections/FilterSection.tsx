import React from 'react';

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
  setPriceRange,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 bg-gray-50 rounded shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Region */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select 
            value={region} 
            onChange={(e) => setRegion(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">All Regions</option>
            <option value="London">London</option>
            <option value="Lima">Lima</option>
            <option value="New York">New York</option>
          </select>
        </div>
        {/* Cuisine */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Cuisine</label>
          <select 
            value={cuisine} 
            onChange={(e) => setCuisine(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Brazilian">Brazilian</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>
        {/* Price Range */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <select 
            value={priceRange} 
            onChange={(e) => setPriceRange(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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
