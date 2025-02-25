// client/src/pages/CompleteProfile.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

function CompleteProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [contactPermission, setContactPermission] = useState<'yes' | 'no'>('yes');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const backgroundImg =
    'https://www.youtotallygotthis.com/wp-content/uploads/2017/12/Last-Minute-Party-Snacks-Feature-Image-1080x608.jpg';

  useEffect(() => {
    const savedName = localStorage.getItem('userName') || '';
    setName(savedName);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!agreeTerms) {
      setMessage('Debes aceptar los términos y condiciones para continuar.');
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No estás autenticado. Por favor inicia sesión.');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`,
        { name, agreeTerms, contactPermission },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message || 'Perfil actualizado correctamente.');
      setLoading(false);
      localStorage.setItem('userName', name);
      localStorage.setItem('profileCompleted', 'true');
      const redirectTo = (location.state as { from?: string })?.from || '/';
      navigate(redirectTo);
    } catch (err: any) {
      setLoading(false);
      setMessage(err.response?.data?.message || 'Error al actualizar el perfil.');
    }
  };

  return (
    <div className="relative min-h-screen flex">
      {/* Columna Izquierda */}
      <div className="w-full md:w-1/2 bg-white flex flex-col px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 font-semibold text-xl hover:underline mb-6 self-start"
        >
          &larr; Back to home
        </button>
        <div className="max-w-md mx-auto w-full space-y-6">
          <h2 className="text-3xl font-bold text-blue-900">Complete your Profile</h2>
          <p className="text-gray-700">
            Please complete your profile by confirming your details and accepting our terms and conditions.
          </p>
          <form onSubmit={handleSubmit} className="mt-4 space-y-5">
            <div className="flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="max-w-sm w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Terms and Privacy
              </h3>
              <p className="text-sm text-gray-600">
                Please review our terms and privacy policy below.
              </p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="text-sm text-gray-800">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 underline">
                    terms and conditions
                  </a>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                Contact Permission
              </h3>
              <p className="text-sm text-gray-600">
                Would you like to receive promotional emails and updates?
              </p>
              <div className="flex flex-col gap-2 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={contactPermission === 'yes'}
                    onChange={() => setContactPermission('yes')}
                    className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-800">Yes, send me updates</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={contactPermission === 'no'}
                    onChange={() => setContactPermission('no')}
                    className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-800">No, thanks</span>
                </label>
              </div>
            </div>
            {message && (
              <p className="mt-2 text-red-600 font-semibold">{message}</p>
            )}
            {loading && (
              <div className="text-center mt-2">
                <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin inline-block" />
              </div>
            )}
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100 text-gray-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Columna Derecha: Imagen + overlay */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div className="absolute top-4 right-4 z-40 cursor-pointer text-white">
          <FaTimes
            onClick={() => navigate(-1)}
            className="text-2xl hover:text-gray-200"
            title="Close"
          />
        </div>
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImg}
            alt="Side background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 max-w-md mx-auto px-6 text-center text-white flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">
            There’s never been a better time to tuck in
          </h2>
          <p className="text-sm sm:text-base md:text-lg drop-shadow-md">
            Book a First Table at our partner restaurants and get 50% off the food bill for two to four people.
          </p>
          <p className="mt-4 text-xs opacity-80">
            © LastMinuteFoods 2025 Privacy and Terms
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
