// client/src/pages/Story.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaLightbulb, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const heroBg =
  'https://tb-static.uber.com/prod/image-proc/processed_images/096af89b203bf91a8cafdfe702482f68/df577d3a0807d3bb859f2fb53aefcd86.jpeg';
const originsImg =
  'https://f.hubspotusercontent20.net/hubfs/4363226/JohnWest_Hero-1.jpg';
const missionImg =
  'https://food.ec.europa.eu/sites/default/files/2024-08/fw_int-day_2024_3.png';
const futureImg =
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&w=1600&q=80';

const Story: React.FC = () => {
  // Hook de navegación de React Router
  const navigate = useNavigate();

  // Función para ir a la pantalla de "all regions"
  const goToRestaurants = () => {
    navigate('/restaurants'); 
    // Ajusta la ruta o parámetros si necesitas más lógica
  };

  return (
    <section className="min-h-screen flex flex-col bg-gray-50">
      {/* HERO SECTION */}
      <div className="relative h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20">
          <img
            src={heroBg}
            alt="Hero background"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

        <div className="relative z-10 flex flex-col items-center px-4 text-center text-white">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold drop-shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Story
          </motion.h1>
          <motion.p
            className="mt-2 text-lg md:text-xl font-medium drop-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            by David Bustos
          </motion.p>
          <motion.p
            className="max-w-2xl mt-4 text-sm md:text-base text-gray-200 drop-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover how LastMinuteFoods came to life, and why we believe it’s
            the future of last-minute offers for all kinds of food establishments.
          </motion.p>
        </div>

        {/* Sección circular al fondo del hero */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-tl-[100%] rounded-tr-[100%]" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 py-12 flex-1">
        {/* SECTION 1: Origins */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12 items-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-lg shadow-md">
            <img
              src={originsImg}
              alt="Origins"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <FaLightbulb className="text-green-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">
                How did LastMinuteFoods start?
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The inspiration came from noticing how many places—restaurants, bakeries,
              coffee shops—struggle with food waste near closing time, while customers
              constantly search for affordable last-minute meals. I’m David Bustos, and I
              realized that by connecting these needs, we could create a solution
              that benefits everyone: businesses, consumers, and the environment.
            </p>
          </div>
        </motion.div>

        {/* SECTION 2: Mission */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12 items-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 order-2 md:order-1 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <FaLeaf className="text-green-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">
                Our Eco-Social Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We aim to reduce food waste by offering an easy-to-use platform where
              local establishments can post last-minute deals at special prices.
              Whether it’s a restaurant or a bakery, people can enjoy quality food
              at lower cost, while businesses avoid waste and recoup expenses.
              It’s our contribution to more responsible, sustainable consumption.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-md order-1 md:order-2">
            <img
              src={missionImg}
              alt="Mission"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* SECTION 3: Future Vision */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-12 items-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-lg shadow-md">
            <img
              src={futureImg}
              alt="Future Vision"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
            <div className="flex items-center gap-3 mb-4">
              <FaHeart className="text-green-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">
                The Future of LastMinuteFoods
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We plan to expand to more cities and even different product categories.
              Our goal is to form alliances with communities and organizations that
              share our passion for sustainable consumption, continually reducing
              waste across the globe. With your support and that of thousands of
              users, we can make LastMinuteFoods a global reference point.
            </p>
          </div>
        </motion.div>
      </div>

      {/* CALL TO ACTION */}
      <div className="relative z-30 bg-white py-10 px-4 border-t border-gray-200 shadow-inner">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-gray-800">
            Ready to be part of our story?
          </h3>
          <p className="text-gray-600 mt-2">
            Join our community of food lovers, committed businesses, and people
            who want to make the most of each item before it’s too late.
          </p>
          <button
            className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition font-medium"
            onClick={goToRestaurants} // Llamamos a la función
          >
            Explore Last-Minute Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default Story;