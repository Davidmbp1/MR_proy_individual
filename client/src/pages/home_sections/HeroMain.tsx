import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroMain() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('');

  // Maneja el cambio en el <select>
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  // Navega a la ruta correspondiente cuando se hace clic en el botón
  const handleFindDeals = () => {
    if (selectedRegion) {
      navigate(`/restaurants?region=${selectedRegion}`);
    } else {
      alert('Por favor, selecciona una región antes de continuar.');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
          alt="Delicious food background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Gradiente para oscurecer la imagen y resaltar el texto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10" />

      {/* Ola inferior (color gris medio) */}
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
            fill="#f3f4f6" 
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
            WebkitTextFillColor: 'white',  // Relleno blanco
          }}
        >
          Don't let great food go to waste! <br />
          <span
            className="text-orange-400"
            style={{
              WebkitTextStroke: '1px black',
              WebkitTextFillColor: 'orange',
            }}
          >
            Last Minute Deals
          </span>{' '}
          just for you
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto text-white drop-shadow-lg">
          Discover exclusive offers from top eateries and local markets before they're gone.
          Enjoy delicious meals at unbeatable prices and help reduce food waste!
        </p>

        {/* Selector y Botón con DaisyUI, ajustados para mayor tamaño y peso */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* Etiqueta oculta para accesibilidad */}
          <label htmlFor="region-select" className="sr-only">
            Select a Region
          </label>
          <select
            id="region-select"
            value={selectedRegion}
            onChange={handleSelectChange}
            className="
              select select-bordered select-warning 
              select-lg            /* Tamaño grande */
              font-bold text-lg    /* Negrita y texto más grande */
              w-full max-w-xs
            "
          >
            <option value="">Select a Region</option>
            <option value="Miraflores">Miraflores</option>
            <option value="Barranco">Barranco</option>
            <option value="San Isidro">San Isidro</option>
            <option value="Chorrillos">Chorrillos</option>
            <option value="La Molina">La Molina</option>
            <option value="Surco">Surco</option>
            <option value="Callao">Callao</option>
            <option value="San Borja">San Borja</option>
            <option value="Lince">Lince</option>
          </select>

          <button
            onClick={handleFindDeals}
            className="
              btn btn-warning 
              btn-lg             /* Tamaño grande */
              font-bold text-lg  /* Negrita y texto más grande */
            "
          >
            Find Deals
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroMain;
