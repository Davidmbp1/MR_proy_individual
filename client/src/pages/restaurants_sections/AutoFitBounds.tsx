// client/src/pages/restaurants_sections/AutoFitBounds.tsx
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface AutoFitBoundsProps {
  positions: [number, number][];
}

function AutoFitBounds({ positions }: AutoFitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [positions, map]);

  return null;
}

export default AutoFitBounds;
