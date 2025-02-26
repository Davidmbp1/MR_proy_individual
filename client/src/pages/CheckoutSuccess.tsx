// client/src/pages/CheckoutSuccess.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import Confetti from 'react-confetti';

interface IPurchase {
  _id: string;
  voucherCode: string;
  amount: number;
  status: string;
  createdAt: string;
}

const CheckoutSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id') || '';
  
  // Logs para depurar el session_id recibido
  console.log('Session ID recibido:', sessionId);

  const [purchase, setPurchase] = useState<IPurchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Ref para el canvas del QR
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado en localStorage');
      setError('No user authenticated. Please log in.');
      setLoading(false);
      return;
    }
    console.log('Token encontrado:', token);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      console.error('VITE_BACKEND_URL no está definido');
      setError('Backend URL not defined.');
      setLoading(false);
      return;
    }
    console.log('Backend URL:', backendUrl);

    const fetchPurchase = async () => {
      try {
        setLoading(true);
        const url = `${backendUrl}/api/purchases/by-session/${sessionId}`;
        console.log('Realizando GET a:', url);
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Respuesta de purchase:', res.data);
        setPurchase(res.data.purchase);
      } catch (err: any) {
        console.error('Error fetching purchase:', err);
        setError('Purchase not found or access denied.');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchPurchase();
    } else {
      console.error('No session_id received in URL');
      setError('No session_id received in the URL.');
      setLoading(false);
    }
  }, [sessionId, navigate]);

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const url = qrRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'voucher.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">Loading your purchase...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!purchase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Purchase not found</h1>
          <p className="text-gray-700 mb-4">We could not retrieve your purchase details.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { voucherCode, amount, status } = purchase;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      <Confetti
        numberOfPieces={200}
        recycle={false}
        gravity={0.2}
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-md mx-auto p-6 border rounded shadow bg-white relative">
        <h1 className="text-3xl font-extrabold text-green-600 mb-4 text-center">
          Purchase Successful!
        </h1>
        <p className="text-gray-700 mb-4 text-center">
          Thank you for your purchase! Your unique voucher code is:
        </p>
        <div className="p-4 border-dashed border-2 border-green-300 rounded bg-green-50 mb-4">
          <p className="text-center text-lg font-bold text-green-800 break-all">
            {voucherCode || 'No voucher'}
          </p>
        </div>

        {voucherCode && (
          <div className="flex flex-col items-center mb-4">
            <QRCodeCanvas ref={qrRef} value={voucherCode} size={128} />
            <button
              onClick={handleDownloadQR}
              className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
            >
              Download QR
            </button>
          </div>
        )}

        <div className="text-center mb-4 text-sm text-gray-500">
          <p className="mb-1">
            Purchase Status: <span className="font-semibold text-gray-700">{status}</span>
          </p>
          <p>
            Amount Paid: <span className="font-semibold text-gray-700">S/ {amount.toFixed(2)}</span>
          </p>
        </div>

        <p className="text-center text-sm text-gray-600 mb-4">
          Show this QR code at the establishment to redeem your offer.
        </p>

        <div className="text-center">
          <button
            onClick={() => navigate('/profile?purchases=true')}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            View My Purchases
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
