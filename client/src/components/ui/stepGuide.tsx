// client/src/pages/sections/StepGuide.tsx
import { Calendar, Savings, Map } from "../../assets/svg/svg"

export const StepGuide = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* TÍTULO PRINCIPAL */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          How it works
        </h2>

        {/* CONTENEDOR: GRID RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          
          {/* CARD 1 */}
          <div
            className="
              bg-white p-10 rounded-lg shadow-md 
              text-center 
              transition-transform duration-300 
              hover:scale-105 hover:shadow-lg
              flex flex-col items-center
              space-y-6
            "
          >
            {/* ÍCONO */}
            <div
              className="
                w-16 h-16 
                rounded-full 
                bg-orange-100 
                text-orange-500 
                flex items-center justify-center
              "
            >
              {/* Evitar pasar className directamente al SVG */}
              <div className="w-8 h-8">
                <Map />
              </div>
            </div>

            {/* TÍTULO */}
            <h3 className="text-xl font-bold text-gray-800">
              Find a restaurant
            </h3>

            {/* TEXTO */}
            <p className="text-gray-600">
              Find a new restaurant to try from over 2,300 restaurants globally
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="
              bg-white p-10 rounded-lg shadow-md 
              text-center 
              transition-transform duration-300 
              hover:scale-105 hover:shadow-lg
              flex flex-col items-center
              space-y-6
            "
          >
            <div
              className="
                w-16 h-16 
                rounded-full 
                bg-sky-100 
                text-sky-500 
                flex items-center justify-center
              "
            >
              <div className="w-8 h-8">
                <Calendar />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Pick a date
            </h3>
            <p className="text-gray-600">
              Choose a date and time that suits you best for your meal
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="
              bg-white p-10 rounded-lg shadow-md 
              text-center 
              transition-transform duration-300 
              hover:scale-105 hover:shadow-lg
              flex flex-col items-center
              space-y-6
            "
          >
            <div
              className="
                w-16 h-16 
                rounded-full 
                bg-green-100 
                text-green-500 
                flex items-center justify-center
              "
            >
              <div className="w-8 h-8">
                <Savings />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Enjoy savings
            </h3>
            <p className="text-gray-600">
              Get 50% off your meal for two, three, or four people!
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
