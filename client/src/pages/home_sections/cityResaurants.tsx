import React from 'react';
import RegionCard from '../../components/regionCard';
import { motion } from 'framer-motion';

const regions = [
  { region: "Miraflores", img: "https://media.traveler.es/photos/62e97668bb3fef99d2f94ef9/16:9/w_2560%2Cc_limit/48-horas-en-Lima-Per%25C3%25BA.jpg" },
  { region: "Barranco", img: "https://a.travel-assets.com/findyours-php/viewfinder/images/res60/90000/90220-Barranco.jpg" },
  { region: "San Isidro", img: "https://4.bp.blogspot.com/-OzqftNUeuuM/WKOTfU0q7mI/AAAAAAAAChQ/ZtCCaleLIA0j69gAx9_xytEZKFP67dwNQCLcB/s1600/Lima-distrito-financiero.jpg" },
  { region: "Chorrillos", img: "https://d1bvpoagx8hqbg.cloudfront.net/originals/chorrillos-the-lima-district-in-front-of-the-sea-ed64523fdb855fc20125693ae5f41a87.jpg" },
  { region: "La Molina", img: "https://blog.properati.com.pe/wp-content/uploads/2022/12/la-molina-distrito-lima-properati-1.jpg" },
  { region: "Surco", img: "https://blog.properati.com.pe/wp-content/uploads/2019/10/surco-distritos-seguros-4.jpg" },
  { region: "Callao", img: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/2IK24ZK5XVCUTPB5JNSPE5AREA.jpg" },
  { region: "San Borja", img: "https://i.ytimg.com/vi/ieslFUAPx74/maxresdefault.jpg" },
  { region: "Lince", img: "https://www.ciudaris.com/blog/wp-content/uploads/mejores-zonas-vivir-lima-beneficios-lince.jpg" },
];

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

const CityRestaurants: React.FC = () => {
  return (
    <section className="relative bg-orange-50 py-16 overflow-hidden">
      {/* Bolitas decorativas animadas en tonos naranjas */}
      <motion.div 
        className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 opacity-70 rounded-full"
        variants={floatAnimation}
        animate="animate"
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-56 h-56 bg-orange-200 opacity-50 rounded-full"
        variants={floatAnimation}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Título principal */}
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl text-blue-950 font-bold brightness-125">
          City Restaurants
        </h2>

        {/* Descripción */}
        <p className="text-center text-gray-700 max-w-2xl leading-relaxed">
          Explore the top districts of Lima – from the trendy streets of Miraflores and Barranco, to the business hubs like San Isidro and more.
        </p>

        {/* Grid de tarjetas con animación */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RegionCard region={region.region} img={region.img} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityRestaurants;
