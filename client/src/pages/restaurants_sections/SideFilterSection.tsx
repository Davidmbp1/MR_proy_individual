// client/src/pages/restaurants_sections/SideFilterSection.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaConciergeBell, FaLeaf } from 'react-icons/fa';

interface FilterItem {
  name: string;
  count: number;
}

interface IFiltersData {
  region: FilterItem[];
  cuisine: FilterItem[];
  priceRange: FilterItem[];
  features: FilterItem[];
  dietary: FilterItem[];
}

interface SideFilterProps {
  region: string;
  cuisine: string;
  priceRange: string;
  selectedFeatures: string[];
  setSelectedFeatures: (list: string[]) => void;
  selectedDietary: string[];
  setSelectedDietary: (list: string[]) => void;
}

const SideFilterSection: React.FC<SideFilterProps> = ({
  region,
  cuisine,
  priceRange,
  selectedFeatures,
  setSelectedFeatures,
  selectedDietary,
  setSelectedDietary,
}) => {
  const [filtersData, setFiltersData] = useState<IFiltersData>({
    region: [],
    cuisine: [],
    priceRange: [],
    features: [],
    dietary: [],
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    const params: string[] = [];
    if (region && region.trim() !== '') {
      params.push(`region=${encodeURIComponent(region)}`);
    }
    if (cuisine && cuisine.trim() !== '') {
      params.push(`cuisine=${encodeURIComponent(cuisine)}`);
    }
    if (priceRange && priceRange.trim() !== '') {
      params.push(`priceRange=${encodeURIComponent(priceRange)}`);
    }
    const query = params.length ? `?${params.join('&')}` : '';

    axios.get(`${backendUrl}/api/restaurants/filters${query}`)
      .then((res) => {
        setFiltersData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching filters:', err);
      });
  }, [backendUrl, region, cuisine, priceRange]);

  const handleFeatureChange = (featureName: string) => {
    if (selectedFeatures.includes(featureName)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== featureName));
    } else {
      setSelectedFeatures([...selectedFeatures, featureName]);
    }
  };

  const handleDietaryChange = (dietName: string) => {
    if (selectedDietary.includes(dietName)) {
      setSelectedDietary(selectedDietary.filter(d => d !== dietName));
    } else {
      setSelectedDietary([...selectedDietary, dietName]);
    }
  };

  return (
    <aside className="bg-gradient-to-b from-blue-50 to-white w-full md:w-64 p-4 shadow-lg rounded-lg text-gray-800 border border-gray-200">
      {/* Renombramos "Features" a "Amenities & Services" */}
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2 border-b pb-2">
        <FaConciergeBell className="text-blue-500" />
        <span>Amenities & Services</span>
      </h3>
      {filtersData.features.map((f, idx) => {
        const featureName = (f.name && f.name.trim() !== '') ? f.name.trim() : `(unknown-${idx})`;
        return (
          <label key={`feature-${featureName}-${idx}`} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedFeatures.includes(featureName)}
              onChange={() => handleFeatureChange(featureName)}
              className="form-checkbox h-4 w-4 text-blue-600 mr-2"
            />
            <span className="text-gray-700">{featureName} ({f.count})</span>
          </label>
        );
      })}

      {/* Renombramos "Dietary" a "Dietary Options" */}
      <h3 className="text-xl font-bold mt-6 mb-3 flex items-center gap-2 border-b pb-2">
        <FaLeaf className="text-green-500" />
        <span>Dietary Options</span>
      </h3>
      {filtersData.dietary.map((d, idx) => {
        const dietName = (d.name && d.name.trim() !== '') ? d.name.trim() : `(unknown-${idx})`;
        return (
          <label key={`dietary-${dietName}-${idx}`} className="flex items-center mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedDietary.includes(dietName)}
              onChange={() => handleDietaryChange(dietName)}
              className="form-checkbox h-4 w-4 text-green-600 mr-2"
            />
            <span className="text-gray-700">{dietName} ({d.count})</span>
          </label>
        );
      })}
    </aside>
  );
};

export default SideFilterSection;
