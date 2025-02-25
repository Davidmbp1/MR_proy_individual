import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface BuyVoucherButtonProps {
  offerId: string;
  className?: string;
}

const BuyVoucherButton: React.FC<BuyVoucherButtonProps> = ({ offerId, className }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  const handleBuy = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/api/checkout/create`,
        { offerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { sessionId } = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Error in redirectToCheckout:', error);
        }
      }
    } catch (error) {
      console.error('Error creating checkout session', error);
    }
  };

  return (
    <button
      onClick={handleBuy}
      className={
        `bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ` +
        (className || '')
      }
    >
      Comprar Voucher
    </button>
  );
};

export default BuyVoucherButton;
