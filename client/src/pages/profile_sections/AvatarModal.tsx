// client/src/pages/profile_sections/AvatarModal.tsx

import React, { RefObject } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaUpload, FaTimes } from 'react-icons/fa';

interface AvatarModalProps {
  closeModal: () => void;
  previewUrl: string | null;
  handleSelectPhoto: (file: File | null) => void;
  handleUploadPhoto: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  closeModal,
  previewUrl,
  handleSelectPhoto,
  handleUploadPhoto,
  fileInputRef,
}) => {
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleSelectPhoto(file);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-white rounded-xl shadow-lg max-w-md w-full p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Change Profile Photo
        </h2>

        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-full border shadow"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border shadow flex items-center justify-center text-gray-400">
              <FaUserCircle size={60} />
            </div>
          )}
        </motion.div>

        <div className="flex justify-center mb-6">
          <label className="inline-flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition relative">
            <FaUpload />
            <span className="font-medium">Choose Photo</span>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onChangeFile}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadPhoto}
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Upload
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AvatarModal;
