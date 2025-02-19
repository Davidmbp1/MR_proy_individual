// client/src/pages/sections/CommunityCTA.tsx

import { Link } from 'react-router-dom'

function CommunityCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white to-orange-50">
      {/* Elementos decorativos absolutos */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 opacity-70 rounded-full transform rotate-12" />
      <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-orange-200 opacity-50 rounded-full transform rotate-45" />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* CONTENIDO IZQUIERDO */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
            Join our community of food lovers!
          </h2>

          <p className="text-gray-700 text-sm sm:text-base max-w-lg mx-auto md:mx-0">
            Sign up now to save money by dining early, connect with fellow 
            gastronomes, and discover great new restaurants every week. 
            Our vibrant community is waiting for you!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="
                bg-orange-500 text-white px-6 py-3 
                font-bold rounded 
                hover:bg-orange-600 
                focus:ring-2 
                focus:ring-orange-500 
                focus:outline-none 
                transition-transform 
                duration-200 
                hover:scale-105
              "
            >
              Sign up
            </Link>
            <Link
              to="/faqs"
              className="text-orange-500 underline"
            >
              Or visit our FAQs
            </Link>
          </div>
        </div>
        
        {/* IMAGEN DERECHA */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md overflow-hidden rounded-lg shadow-md">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9"
              alt="community"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunityCTA
