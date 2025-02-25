// client/src/pages/SellerLanding.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRegEnvelope, FaUser, FaBuilding, FaPhoneAlt } from 'react-icons/fa';

const bgImageUrl =
  'https://www.sapaad.com/wp-content/uploads/2023/10/2023-featured_Boosting-Restaurant-Sales-How-Waiter-Apps-Elevate-Upselling.jpg';

const SellerLanding: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/emails/send`, {
        to: formData.email,
        subject: 'Welcome to Last Minute Foods Seller Program',
        text: `Hello ${formData.name},\n\nThank you for your interest in selling with Last Minute Foods. We have received your details:\nBusiness Name: ${formData.businessName}\nPhone: ${formData.phone}\nMessage: ${formData.message}\n\nOur team will contact you shortly.\n\nBest regards,\nLast Minute Foods Team`,
        html: `<p>Hello ${formData.name},</p>
               <p>Thank you for your interest in selling with Last Minute Foods. We have received your details:</p>
               <ul>
                 <li><strong>Business Name:</strong> ${formData.businessName}</li>
                 <li><strong>Phone:</strong> ${formData.phone}</li>
                 <li><strong>Message:</strong> ${formData.message}</li>
               </ul>
               <p>Our team will contact you shortly.</p>
               <p>Best regards,<br/>Last Minute Foods Team</p>`,
      });
      setFeedback(
        'Your information has been submitted successfully! Please check your email.'
      );
      setFormData({
        name: '',
        email: '',
        businessName: '',
        phone: '',
        message: '',
      });
      // Redirigir al Home después de 3 segundos
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
      setFeedback('Error submitting information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Columna Izquierda: Imagen + CTA */}
      <div className="relative md:flex-1 hidden md:block overflow-hidden">
        <img
          src={bgImageUrl}
          alt="Seller Program"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col justify-center items-start h-full p-10 text-white">
          <motion.h2
            className="text-4xl font-extrabold mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Our Seller Program
          </motion.h2>
          <motion.p
            className="text-lg leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Maximize your business potential by reaching thousands of
            customers looking for last-minute deals. Let us help you grow!
          </motion.p>
          <motion.button
            className="bg-blue-600 px-6 py-3 rounded text-white font-medium hover:bg-blue-700 transition"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              // Acción al hacer clic
            }}
          >
            Learn More
          </motion.button>
        </div>
      </div>

      {/* Columna Derecha: Formulario */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6 md:p-12">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
          <motion.h1
            className="text-3xl font-bold text-blue-800 mb-4 text-center"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sell with Last Minute Foods
          </motion.h1>
          <p className="text-gray-700 text-center mb-8">
            Fill out the form below to join our seller program.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <FaUser className="inline mr-1 text-gray-600" />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <FaRegEnvelope className="inline mr-1 text-gray-600" />
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="yourname@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Business Name */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <FaBuilding className="inline mr-1 text-gray-600" />
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="e.g. My Awesome Restaurant"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                <FaPhoneAlt className="inline mr-1 text-gray-600" />
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Tell us more about your business..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                required
              ></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </motion.button>
          </form>
          {feedback && (
            <motion.p
              className="mt-6 text-center text-sm font-semibold text-green-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {feedback}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SellerLanding;
