import React from 'react';

function FooterSection() {
  return (
    <footer className="bg-blue-900 text-white mt-8">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Columna 1: Marca / Sobre nosotros */}
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold">LastMinuteFoods</h1>
          <p className="text-sm text-gray-200">
            Tackling food waste, one meal at a time. Enjoy great deals while saving perfectly good food from going to waste.
          </p>
        </div>

        {/* Columna 2: Diners */}
        <div>
          <h4 className="text-lg font-bold mb-2">Diners</h4>
          <p className="text-sm text-gray-200 mb-4">
            Join more than 2,000,000 diners enjoying huge savings on meals that would otherwise go unsold.
          </p>
          <button className="bg-white text-blue-900 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors">
            Learn more
          </button>
        </div>

        {/* Columna 3: Restaurateurs */}
        <div>
          <h4 className="text-lg font-bold mb-2">Restaurateurs</h4>
          <p className="text-sm text-gray-200 mb-4">
            Join over 2,400 restaurants reducing waste and boosting profits by selling soon-to-expire products.
          </p>
          <button className="bg-white text-blue-900 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition-colors">
            Learn more
          </button>
        </div>

        {/* Columna 4: Redes sociales */}
        <div>
          <h4 className="text-lg font-bold mb-2">Follow us</h4>
          <p className="text-sm text-gray-200 mb-4">
            Stay updated on deals and tips to reduce food waste.
          </p>
          <div className="flex items-center space-x-3">
            {/* Facebook */}
            <a
              href="#"
              className="bg-white text-blue-900 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.676 0H1.326C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24h11.49v-9.294H9.691v-3.622h3.125V8.413c0-3.1 1.892-4.788 4.658-4.788 1.324 0 2.462.099 2.795.143v3.24l-1.918.001c-1.505 0-1.797.716-1.797 1.764v2.316h3.591l-.468 3.622h-3.123V24h6.117c.733 0 1.326-.593 1.326-1.326V1.326C24 .593 23.407 0 22.676 0" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="bg-white text-blue-900 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.164c3.204 0 3.584.012 4.85.07 1.17.056 1.976.24 2.672.513a5.45 5.45 0 0 1 1.98 1.28c.527.527.928 1.15 1.28 1.98.273.696.457 1.502.513 2.672.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.976-.513 2.672a5.448 5.448 0 0 1-1.28 1.98c-.527.527-1.15.928-1.98 1.28-.696.273-1.502.457-2.672.513-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.976-.24-2.672-.513a5.448 5.448 0 0 1-1.98-1.28c-.527-.527-.928-1.15-1.28-1.98-.273-.696-.457-1.502-.513-2.672C2.176 15.584 2.164 15.204 2.164 12s.012-3.584.07-4.85c.056-1.17.24-1.976.513-2.672.352-.83.753-1.453 1.28-1.98.527-.527 1.15-.928 1.98-1.28.696-.273 1.502-.457 2.672-.513 1.266-.058 1.646-.07 4.85-.07zm0-2.164C8.737 0 8.332.012 7.053.07 5.772.13 4.73.33 3.8.7 2.795 1.106 1.964 1.65 1.15 2.464.335 3.277-.21 4.107.195 5.112c.37.93.57 1.972.63 3.253.058 1.279.07 1.684.07 4.635s-.012 3.356-.07 4.635c-.06 1.281-.26 2.323-.63 3.253-.404 1.004-.94 1.834-1.754 2.648-.813.813-1.643 1.35-2.648 1.754-1.004.37-2.046.57-3.253.63C3.356 23.988 2.951 24 0 24s-3.356-.012-4.635-.07c-1.281-.06-2.323-.26-3.253-.63-.93-.404-1.761-.948-2.575-1.762C-.53 17.707-.335 17.167-.196 16.163c.37-.93.57-1.972.63-3.253.058-1.279.07-1.684.07-4.635s-.012-3.356-.07-4.635C.335 5.772.13 4.73-.196 3.8-.53 2.795-1.106 1.964-1.92 1.15c-.813-.813-1.643-1.35-2.648-1.754-1.004-.37-2.046-.57-3.253-.63C-4.356.012-4.761 0-7.712 0z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Sección adicional: Newsletter */}
        <div className="max-w-7xl mx-auto py-6 px-4 mt-8 border-t border-gray-300">
          <h4 className="text-lg font-bold mb-3 text-white">Subscribe to our Newsletter</h4>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded focus:outline-none text-gray-900 bg-white"
            />
            <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Línea y texto final */}
      <div className="border-t border-blue-800 text-center py-4 text-sm text-gray-200">
        © LastMinuteFoods 2025 &nbsp;|&nbsp;
        <a href="#" className="underline hover:text-white transition-colors">
          Privacy and Terms
        </a>
      </div>
    </footer>
  );
}

export default FooterSection;
