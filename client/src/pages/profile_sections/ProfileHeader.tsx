// client/src/pages/profile_sections/ProfileHeader.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaCamera } from 'react-icons/fa';

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface ProfileHeaderProps {
  user: IUser;
  onOpenModal: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onOpenModal }) => {
  const fullAvatarUrl = user.avatarUrl || null;

  return (
    <motion.section
      className="relative w-full h-[420px] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0">
        <img
          src="https://trexperienceperu.com/sites/default/files/2024-06/peruvian%20food.jpg"
          alt="Profile Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

      <div className="relative z-10 max-w-5xl w-full px-4 flex flex-col sm:flex-row items-center sm:items-end gap-6">
        <div className="relative -mt-16 sm:-mt-24">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
            {fullAvatarUrl ? (
              <img
                src={fullAvatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <FaUserCircle className="text-gray-300 w-20 h-20 sm:w-24 sm:h-24" />
            )}
          </div>

          <button
            onClick={onOpenModal}
            title="Change Photo"
            className="
              absolute 
              -bottom-2  /* Ajusta estos valores para regular la superposición vertical */
              -right-2   /* Ajusta estos valores para regular la superposición horizontal */
              bg-gray-800 
              text-white 
              p-2 sm:p-3 
              rounded-full 
              hover:bg-gray-600 
              transition 
              shadow-md
            "
          >
            <FaCamera size={28} />
          </button>
        </div>

        <motion.div
          className="text-white drop-shadow-md mb-4 sm:mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">
            {user.name || 'User Name'}
          </h1>
          <p className="text-sm sm:text-base">{user.email}</p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-tl-[100%] rounded-tr-[100%]" />
    </motion.section>
  );
};

export default ProfileHeader;
