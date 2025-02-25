// client/src/pages/Profile.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

import ProfileHeader from './profile_sections/ProfileHeader';
import InfoTab from './profile_sections/InfoTab';
import PurchasesTab from './profile_sections/PurchasesTab';
import AvatarModal from './profile_sections/AvatarModal';

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface IPurchase {
  _id: string;
  voucherCode?: string;
  amount: number;
  status: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Estados principales
  const [user, setUser] = useState<IUser | null>(null);
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Control de tabs
  const [activeTab, setActiveTab] = useState<'info' | 'purchases'>('info');

  // Control del modal de avatar
  const [showModal, setShowModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Ref para el input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        // 1) Obtener datos del usuario
        const userRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(userRes.data.user);

        // 2) Obtener compras
        const purchaseRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/purchases/my`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPurchases(purchaseRes.data.purchases);
      } catch (err: any) {
        console.error('Error fetching profile data:', err);
        setError('An error occurred while loading your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Funciones para el modal de avatar
  const openModal = () => {
    setShowModal(true);
    setNewPhoto(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSelectPhoto = (file: File | null) => {
    setNewPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUploadPhoto = async () => {
    if (!newPhoto || !user) return;
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in again.');
        return;
      }
      const formData = new FormData();
      formData.append('avatar', newPhoto);

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/avatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // Actualizamos el usuario con la nueva URL
      setUser({ ...user, avatarUrl: res.data.avatarUrl });
      alert('Profile photo updated successfully!');
      closeModal();
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading your profile...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Profile not found
          </h1>
          <p className="text-gray-700 mb-4">We could not retrieve your user data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white flex flex-col">
      <ProfileHeader user={user} onOpenModal={openModal} />

      {/* Tabs */}
      <div className="max-w-4xl mx-auto w-full px-4 py-6 flex gap-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-2 text-lg font-semibold border-b-2 ${
            activeTab === 'info'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600'
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('purchases')}
          className={`pb-2 text-lg font-semibold border-b-2 ${
            activeTab === 'purchases'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-blue-600'
          }`}
        >
          Purchases
        </button>
      </div>

      {/* Contenido según tab */}
      <div className="max-w-4xl mx-auto w-full px-4 pb-10 flex-1">
        {activeTab === 'info' && (
          <InfoTab user={user} onUserUpdate={(updatedUser) => setUser(updatedUser)} />
        )}
        {activeTab === 'purchases' && <PurchasesTab purchases={purchases} />}
      </div>

      {/* Modal de Avatar */}
      <AnimatePresence>
        {showModal && (
          <AvatarModal
            closeModal={closeModal}
            previewUrl={previewUrl}
            handleSelectPhoto={handleSelectPhoto}
            handleUploadPhoto={handleUploadPhoto}
            fileInputRef={fileInputRef}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
