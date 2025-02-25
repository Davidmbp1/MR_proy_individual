// client/src/pages/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import OneTapGoogle from '../components/OneTapGoogle';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successBanner, setSuccessBanner] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const backgroundImg =
    'https://www.youtotallygotthis.com/wp-content/uploads/2017/12/Last-Minute-Party-Snacks-Feature-Image-1080x608.jpg';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('profileCompleted', res.data.profileCompleted ? 'true' : 'false');

      setLoading(false);
      setSuccessBanner('Login successful! Redirecting...');
      
      const redirectTo = (location.state as { from?: string })?.from || '/';
      if (res.data.profileCompleted !== true) {
        setTimeout(() => {
          navigate('/complete-profile', { replace: true, state: { from: redirectTo } });
        }, 1500);
      } else {
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 1500);
      }
    } catch (err: any) {
      setLoading(false);
      setMessage(err.response?.data?.message || 'Error in login');
    }
  };

  const handleGoogleSuccess = async (response: any) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { token: response.credential }
      );
      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('profileCompleted', res.data.profileCompleted ? 'true' : 'false');

      setSuccessBanner('Google login successful! Redirecting...');
      const redirectTo = (location.state as { from?: string })?.from || '/';
      if (res.data.profileCompleted !== true) {
        setTimeout(() => {
          navigate('/complete-profile', { replace: true, state: { from: redirectTo } });
        }, 1500);
      } else {
        setTimeout(() => {
          navigate(redirectTo, { replace: true });
        }, 1500);
      }
    } catch (error: any) {
      setMessage('Error in Google login');
    }
  };

  const handleGoogleError = (msg: string) => {
    setMessage(msg);
  };

  return (
    <div className="relative min-h-screen flex">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="text-blue-700 font-semibold text-lg hover:underline mb-6 self-start"
        >
          &larr; Back to home
        </button>

        {successBanner && (
          <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
            {successBanner}
          </div>
        )}

        <div className="max-w-lg mx-auto w-full">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Sign In</h2>
          <p className="text-gray-700 mb-4">
            Welcome back! Please enter your details:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {message && (
              <p className="mt-2 text-red-600 font-semibold">{message}</p>
            )}
            {loading && (
              <div className="text-center">
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
                Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-gray-600">Or sign in with Google:</p>
          <OneTapGoogle onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>
      </div>

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

export default Login;
