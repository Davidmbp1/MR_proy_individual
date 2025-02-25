import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RestaurantHeroProps {
  region: string;
}

const RestaurantHero: React.FC<RestaurantHeroProps> = ({ region }) => {
  const navigate = useNavigate();

  // Imagen de fondo (cambia si lo deseas)
  const backgroundImg =
    'https://trexperienceperu.com/sites/default/files/2024-06/peruvian%20food.jpg';

  return (
    <>
      {/* Animación fadeInUp */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.7s ease-out forwards;
          }

          /* Card con clip-path diagonal para un estilo distinto */
          .fancy-card {
            clip-path: polygon(
              0 0,
              100% 0,
              100% 80%,
              90% 100%,
              0% 100%
            );
          }
        `}
      </style>

      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImg}
            alt="Last Minute Foods background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Contenedor principal */}
        <div
          className="
            relative 
            z-20 
            w-full 
            max-w-6xl 
            px-6 
            flex 
            flex-col 
            md:flex-row 
            items-start 
            justify-between 
            animate-fadeInUp
          "
        >
          {/* Bloque de texto (izquierda) */}
          <div className="text-white mt-10 md:mt-0">
            {/* Ciudad / Región */}
            {region && (
              <span className="block text-lg uppercase tracking-widest text-white/90 mb-2">
                {region}
              </span>
            )}
            {/* Título principal más grande */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold drop-shadow-xl leading-tight">
              {region
                ? `${region} Deals`
                : 'Last-Minute Foods'}
            </h1>
            {/* Subtítulo */}
            <p className="text-2xl sm:text-3xl text-white/90 drop-shadow-md mt-2">
              Don’t let perfectly good meals go to waste
            </p>
          </div>

          {/* Recuadro “Early bird dining” (derecha) */}
          <div
            className="
              relative
              mt-8
              md:mt-0
              md:ml-6
              w-full 
              max-w-sm
            "
          >
            <div
              className="
                fancy-card  /* clase con clip-path diagonal */
                bg-white
                p-8
                shadow-2xl
                text-gray-800
                h-full
                rounded-lg
                overflow-hidden
              "
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3">
                Last Minute Offers
              </h2>
              <p className="text-lg sm:text-xl text-gray-700">
                Score up to <strong>50% off</strong> on soon-to-expire meals at 
                {region ? ` ${region} ` : ' local '} 
                spots. Save money and help reduce food waste!
              </p>

              {/* Botón Learn More */}
              <button
                onClick={() => navigate('/faqs')}
                className="
                  bg-orange-500
                  text-white
                  font-semibold
                  mt-5
                  px-5
                  py-3
                  rounded
                  inline-flex
                  items-center
                  hover:bg-orange-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-500
                  transition
                "
              >
                Learn More
                {/* Flecha a la derecha */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RestaurantHero;
