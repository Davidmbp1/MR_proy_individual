import React from 'react';
import { Link } from 'react-router-dom';

interface RegionCardProps {
  region: string;
  img: string;
}

const RegionCard: React.FC<RegionCardProps> = ({ region, img }) => {
  return (
    <Link
      to={`/restaurants?region=${encodeURIComponent(region)}`}
      className="
        group
        block
        w-full
        aspect-[4/3]
        relative
        overflow-hidden
        rounded-lg
        transform
        transition
        duration-300
        hover:scale-105
        hover:shadow-lg
      "
    >
      
      <img
        src={img}
        alt={region}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          brightness-75
          transition-all
          duration-500
          group-hover:brightness-50
          group-hover:scale-110
        "
      />

      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          text-center
          text-white
          pointer-events-none
        "
      >
        <h3 className="text-3xl font-bold">{region}</h3>
        <p className="text-lg font-medium">restaurants</p>
      </div>
    </Link>
  );
};

export default RegionCard;
