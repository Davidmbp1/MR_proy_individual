// client/src/pages/CheckoutCancel.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-lg">
        <h1 className="text-3xl font-extrabold text-red-600 mb-4 text-center">
          Pago Cancelado
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Tu pago fue cancelado. Si deseas intentarlo nuevamente, regresa a la oferta y realiza el proceso de compra.
        </p>
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
