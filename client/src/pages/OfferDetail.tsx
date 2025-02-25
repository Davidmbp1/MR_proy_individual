// src/pages/OfferDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ConfirmPurchaseButton from '../components/BuyVoucherButton';

interface IOffer {
  _id: string;
  title: string;
  description?: string;
  price: number;
  originalPrice?: number;
  expiryDate: string;
  quantity?: number;
  status?: string;
  stripePriceId?: string;
}

interface IRestaurant {
  _id: string;
  name: string;
  region: string;
  mainImage?: string;
  address?: string;
  rating?: number;
  priceRange?: string;
  cuisine?: string[];
  offers?: IOffer[];
}

interface IUser {
  name: string;
  email: string;
}

const OfferDetail: React.FC = () => {
  const { restaurantId, offerId } = useParams<{ restaurantId: string; offerId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [offer, setOffer] = useState<IOffer | null>(null);
  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('redirectAfterProfile', location.pathname);
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const user: IUser = res.data.user;
          setCustomerName(user.name || '');
          setCustomerEmail(user.email || '');
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          setCustomerName(localStorage.getItem('userName') || '');
          setCustomerEmail(localStorage.getItem('userEmail') || '');
        });
    }
  }, []);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurants/${restaurantId}`);
        setRestaurant(res.data);
        if (res.data.offers) {
          const foundOffer = res.data.offers.find((o: IOffer) => o._id === offerId);
          setOffer(foundOffer);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        setLoading(false);
      }
    };
    if (restaurantId && offerId) {
      fetchRestaurant();
    }
  }, [restaurantId, offerId]);

  if (loading) {
    return <div className="p-8 text-gray-700">Cargando la oferta...</div>;
  }
  if (!restaurant || !offer) {
    return (
      <div className="p-8 text-red-600 font-semibold">
        Error: No se encontró la oferta o el restaurante.
      </div>
    );
  }

  const discountPercent = offer.originalPrice
    ? 100 - Math.round((offer.price / offer.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10 relative">
        <div className="absolute top-4 right-4 text-blue-200 hover:text-blue-400 transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A6.248 6.248 0 0118 9.75c0 3.866-3.239 7-7.5 7S3 13.616 3 9.75c0-1.405.377-2.722 1.037-3.856.476-.866.197-1.904-.485-2.586A3.493 3.493 0 013.4 2.091a.75.75 0 011.192-.913 6.24 6.24 0 004.756 1.927c.467 0 .918.07 1.333.195.612.183 1.368.283 2.188-.086a.75.75 0 01.938.844.75.75 0 001.555.186z"
            />
          </svg>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            {offer.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-semibold">
            <span className="text-gray-900">{restaurant.name}</span> – {restaurant.region}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Oferta válida hasta:{' '}
            <span className="font-semibold">
              {new Date(offer.expiryDate).toLocaleDateString()}
            </span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/2">
            <img
              src="https://www.abasturhub.com/img/blog/mejores-restaurantes---diseno-sin-titulo.jpg"
              alt={restaurant.name}
              className="w-full h-56 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <p className="mb-4 text-base md:text-lg leading-relaxed text-gray-700">
              {offer.description || 'No hay descripción adicional para esta oferta.'}
            </p>
            <div className="text-lg md:text-xl font-bold mb-2 text-gray-900">
              Precio:{' '}
              <span className="text-blue-600">
                S/ {offer.price.toFixed(2)}
              </span>
              {offer.originalPrice && (
                <span className="text-sm md:text-base text-gray-500 ml-3 line-through">
                  S/ {offer.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discountPercent && discountPercent > 0 && (
              <p className="text-green-600 font-semibold text-base md:text-lg">
                ¡Ahorra {discountPercent}%!
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
            Datos del comprador
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Nombre completo
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1 block w-full max-w-md border border-gray-300 rounded-md p-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900">
                Correo electrónico
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="mt-1 block w-full max-w-md border border-gray-300 rounded-md p-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-900">
              Comentarios o instrucciones
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full max-w-2xl border border-gray-300 rounded-md p-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="¿Alguna instrucción especial para el restaurante?"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <ConfirmPurchaseButton
            offerId={offer._id}
            className="inline-block bg-blue-600 text-white text-base md:text-lg font-semibold px-6 py-3 rounded shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferDetail;
