import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function CommunityCTA() {
  const floatUpDown = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatDownUp = {
    animate: {
      y: [0, 10, 0],
      rotate: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gray-100">
      <motion.div 
        className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 opacity-70 rounded-full"
        variants={floatUpDown}
        animate="animate"
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-56 h-56 bg-blue-200 opacity-50 rounded-full"
        variants={floatDownUp}
        animate="animate"
      />

      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900">
            Join our Community of Food Savers!
          </h2>

          <p className="text-gray-700 text-sm sm:text-base max-w-lg mx-auto md:mx-0">
            Sign up now to access exclusive last-minute deals on meals and groceries, reduce food waste, and connect with fellow food enthusiasts. Be part of the movement that makes every bite count!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="bg-orange-500 text-white px-6 py-3 font-bold rounded hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-transform duration-200 hover:scale-105"
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
  );
}

export default CommunityCTA;
