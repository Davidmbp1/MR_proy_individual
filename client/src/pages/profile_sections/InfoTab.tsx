// client/src/pages/profile_sections/InfoTab.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegUser, FaEnvelope, FaPen, FaCheck, FaTimes } from 'react-icons/fa';

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface InfoTabProps {
  user: IUser;
  onUserUpdate: (updatedUser: IUser) => void; 
  // ↑ Callback para notificar al componente padre que se actualizó el usuario
}

const InfoTab: React.FC<InfoTabProps> = ({ user, onUserUpdate }) => {
  const [editing, setEditing] = useState(false);

  // Campos locales para editar
  const [localName, setLocalName] = useState(user.name);
  const [localEmail, setLocalEmail] = useState(user.email);

  useEffect(() => {
    // Cada vez que cambie "user", actualizamos los campos locales
    setLocalName(user.name);
    setLocalEmail(user.email);
  }, [user]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    // Revertimos los cambios locales
    setLocalName(user.name);
    setLocalEmail(user.email);
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      // Llamamos al backend para actualizar
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please log in again.');
        return;
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.put(
        `${backendUrl}/api/users/profile`,
        {
          name: localName,
          email: localEmail,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.user) {
        // Notificamos al padre con la nueva data
        onUserUpdate({
          ...user,
          name: res.data.user.name,
          email: res.data.user.email,
        });
        setEditing(false);
        alert('Info updated successfully!');
      } else {
        alert('There was an error updating your info.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile. Please try again.');
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          Account Details
        </h2>
        {/* Botón Edit / Save según el estado */}
        {!editing ? (
          <button
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
            onClick={handleEditClick}
            title="Edit your info"
          >
            <FaPen />
            <span>Edit Info</span>
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
              onClick={handleSave}
              title="Save changes"
            >
              <FaCheck />
              <span>Save</span>
            </button>
            <button
              className="flex items-center gap-1 px-3 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition text-sm font-medium"
              onClick={handleCancel}
              title="Cancel"
            >
              <FaTimes />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!editing ? (
          // Vista de solo lectura
          <motion.div
            key="view-mode"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {/* Campo: Name */}
              <div className="flex items-start gap-2">
                <FaRegUser className="text-blue-600 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-gray-800 font-semibold">
                    {user.name || 'No name provided'}
                  </p>
                </div>
              </div>
              {/* Campo: Email */}
              <div className="flex items-start gap-2">
                <FaEnvelope className="text-blue-600 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-gray-800 font-semibold">
                    {user.email || 'No email provided'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Modo edición
          <motion.div
            key="edit-mode"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {/* Input: Name */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={localName}
                  onChange={(e) => setLocalName(e.target.value)}
                />
              </div>
              {/* Input: Email */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default InfoTab;
