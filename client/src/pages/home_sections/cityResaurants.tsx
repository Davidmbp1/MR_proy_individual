// client/src/pages/sections/CityRestaurants.tsx

import RegionCard from '../../components/regionCard';

const regions = [
  {
    region: "New York",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "Los Angeles",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "Chicago",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "Miami",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "San Francisco",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "New York",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "Los Angeles",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "Chicago",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    region: "Miami",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
  },
];

export const CityRestaurants = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* TÍTULO PRINCIPAL */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl text-blue-950 font-bold brightness-125">
          City Restaurants
        </h2>

        {/* DESCRIPCIÓN OPCIONAL */}
        <p className="text-center text-gray-700 max-w-2xl leading-relaxed">
          Explore some of the top cities to dine in! We bring you restaurants 
          from bustling corners like New York and Los Angeles to the scenic 
          shores of Miami and beyond.
        </p>

        {/* GRID DE TARJETAS */}
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6
          w-full
        ">
          {regions.map((region, index) => (
            <RegionCard key={index} region={region.region} img={region.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityRestaurants;
