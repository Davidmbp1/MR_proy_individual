// client/src/pages/review_sections/ReviewListSection.tsx
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IReview } from '../../types';
import ImageModal from '../../components/ImageModal';
import { AnimatePresence, motion } from 'framer-motion';

interface ReviewListSectionProps {
  reviews: IReview[];
}

function isFullUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

function getFullUrl(path: string, backendUrl: string): string {
  if (!path) return '';
  if (isFullUrl(path)) {
    return path;
  }
  return `${backendUrl}${path}`;
}

const ReviewListSection: React.FC<ReviewListSectionProps> = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const reviewsPerPage = 5;
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (imgUrl: string) => {
    const fullImgUrl = getFullUrl(imgUrl, backendUrl);
    setModalImage(fullImgUrl);
  };

  const closeModal = () => setModalImage(null);

  return (
    <div className="max-w-5xl mx-auto mb-8 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">What People Say</h2>

      <div className="space-y-6">
        {currentReviews.map((review) => {

          const avatarUrl = review.user.avatarUrl
            ? getFullUrl(review.user.avatarUrl, backendUrl)
            : 'https://via.placeholder.com/50';

          return (
            <motion.div
              key={review._id}
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Cabecera del review */}
              <div className="flex items-center mb-4">
                <img
                  src={avatarUrl}
                  alt={review.user.name || 'User'}
                  className="w-12 h-12 rounded-full mr-4 object-cover border border-gray-300"
                />
                <div>
                  <p className="font-bold text-gray-800">{review.user.name || 'Anonymous'}</p>
                  <p className="text-sm text-gray-500">
                    Dined on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Calificación */}
              <div className="flex items-center mb-3">
                {Array(Math.round(review.rating))
                  .fill(0)
                  .map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                <span className="text-gray-600 text-base">{review.rating.toFixed(1)}</span>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              {review.images && review.images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {review.images.map((imgUrl) => {
                    const fullImgUrl = getFullUrl(imgUrl, backendUrl);
                    return (
                      <motion.img
                        key={imgUrl}
                        src={fullImgUrl}
                        alt="Review attachment"
                        className="w-32 h-32 object-cover rounded-lg cursor-pointer shadow-md hover:shadow-xl"
                        onClick={() => openModal(imgUrl)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <motion.button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                page === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {page}
            </motion.button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalImage && <ImageModal imageUrl={modalImage} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
};

export default ReviewListSection;
