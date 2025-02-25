import { Calendar, Savings, Map } from "../../assets/svg/svg";
import { motion } from "framer-motion";

const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export const StepGuide = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gray-100">
      {/* Bolitas decorativas animadas en tonos celestes */}
      <motion.div 
        className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 opacity-70 rounded-full"
        variants={floatAnimation}
        animate="animate"
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-56 h-56 bg-blue-200 opacity-50 rounded-full"
        variants={floatAnimation}
        animate="animate"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Título principal */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          How it works
        </h2>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
          {/* CARD 1 */}
          <div className="bg-white p-10 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
              <div className="w-8 h-8">
                <Map />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Find an offer
            </h3>
            <p className="text-gray-600">
              Explore local restaurants and stores offering last-minute deals on soon-to-expire items.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white p-10 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
              <div className="w-8 h-8">
                <Calendar />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Pick your time
            </h3>
            <p className="text-gray-600">
              Choose a pickup time that works for you before the offer expires.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white p-10 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
              <div className="w-8 h-8">
                <Savings />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">
              Enjoy & reduce waste
            </h3>
            <p className="text-gray-600">
              Save money on delicious meals and help the planet by preventing food waste!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
