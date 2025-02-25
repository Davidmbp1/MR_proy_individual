// client/src/pages/review_sections/AddReviewForm.tsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { FaStar, FaUpload } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { IReview } from '../../types';

interface AddReviewFormProps {
  restaurantId: string;
  onReviewCreated: (review: IReview) => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ restaurantId, onReviewCreated }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to post a review.');
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append('restaurant', restaurantId);
      formData.append('rating', String(rating));
      formData.append('comment', comment);

      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      onReviewCreated(res.data.review);

      setComment('');
      setImages(null);
      setRating(5);
    } catch (err: any) {
      console.error('Error creating review:', err);
      setError('Could not create review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 mt-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Add a Review</h3>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center">
            {Array(5)
              .fill(0)
              .map((_, i) => {
                const starValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    className={`cursor-pointer text-2xl transition-colors duration-200 ${
                      starValue <= rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(starValue)}
                  />
                );
              })}
            <span className="ml-3 text-base text-gray-600">{rating}/5</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={4}
            placeholder="Share your experience..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images (optional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(e.target.files)}
            className="hidden"
          />
          <div
            onClick={handleFileInputClick}
            className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleFileInputClick()}
            aria-label="Upload images"
          >
            <FaUpload className="text-gray-500 mb-2" size={24} />
            <p className="text-gray-700">Click or drag & drop to upload images</p>
            <p className="text-xs text-gray-500 mt-1">
              You can upload up to 5 images
            </p>
          </div>
          {images && images.length > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {images.length} file{images.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium shadow hover:bg-blue-700 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddReviewForm;
