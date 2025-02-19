// client/src/pages/sections/HeroMain.tsx

function HeroMain() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradiente para oscurecer la imagen y resaltar el texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 z-10" />

      {/* Ola inferior */}
      <div className="absolute bottom-0 w-full z-20 pointer-events-none">
        <svg
          width="100%"
          viewBox="0 0 1600 86"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M800 54.0001C186 145 0 14.0001 0 14.0001V154H1600V14.0001C1600 14.0001 1555.81 1.88336 1439.4 0H1376.03C1251.01 1.84955 1065.53 14.6465 800 54.0001Z"
            fill="#fff"
          />
        </svg>
      </div>

      {/* Contenido central */}
      <div className="relative z-30 max-w-4xl mx-auto px-4 text-center">
        <h1
          className="
            text-4xl sm:text-5xl md:text-7xl 
            font-extrabold tracking-tight 
            drop-shadow-xl 
            transition-transform 
            hover:scale-105
          "
          style={{
            WebkitTextStroke: '1px black', // Delineado negro
            WebkitTextFillColor: 'white'   // Relleno blanco
          }}
        >
          {/* Primera línea */}
          Dine early and save <br />
          {/* Segunda línea con “50% off” en naranja */}
          <span
            className="text-orange-400"
            style={{
              WebkitTextStroke: '1px black', // Mantener el delineado
              WebkitTextFillColor: 'orange'    // Relleno naranja para esta porción
            }}
          >
            50% off
          </span>{' '}
          your food bill
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-white drop-shadow-lg">
          Book a first table at thousands of restaurants and enjoy half price
          on your meal for two, three, or four people!
        </p>

        {/* Controles (selector + botón) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* Selector */}
          <select
            className="
              border border-gray-300 
              bg-white text-gray-700 
              rounded-lg 
              px-6 py-3 
              shadow 
              focus:outline-none 
              focus:ring-2 
              focus:ring-orange-500 
              transition 
              duration-200
              text-base
            "
          >
            <option>Select a Region</option>
            <option>Lima</option>
            <option>Arequipa</option>
            <option>Cusco</option>
          </select>

          {/* Botón con animación de elevación y sin transparencia */}
          <button
            className="
              bg-gradient-to-r 
              from-orange-500 
              to-orange-600 
              text-white 
              px-8 
              py-3 
              rounded-lg 
              font-semibold 
              shadow-lg 
              transition-all
              duration-200 
              hover:-translate-y-1
              hover:shadow-2xl 
              hover:from-orange-600 
              hover:to-orange-700
              focus:outline-none 
              focus:ring-2 
              focus:ring-orange-500
            "
          >
            Find a table
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroMain;
