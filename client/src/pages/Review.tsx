// client/src/pages/Review.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

import RestaurantOverviewSection from './review_sections/RestaurantOverviewSection';
import ReviewListSection from './review_sections/ReviewListSection';
import AddReviewForm from './review_sections/AddReviewForm';
import { IRestaurant, IReview } from '../types';

const Review: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!restaurantId) {
      setError('No restaurantId provided in URL.');
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to see reviews');
      setLoading(false);
      return;
    }
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/restaurants/${restaurantId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRestaurant(res.data);
      } catch (err: any) {
        console.error('Error fetching restaurant:', err);
        setError('Could not fetch restaurant data.');
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews?restaurantId=${restaurantId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReviews(res.data.reviews || []);
      } catch (err: any) {
        console.error('Error fetching reviews:', err);
        setError('Could not fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
    fetchReviews();
  }, [restaurantId]);

  useEffect(() => {
    if (!restaurantId) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    const newSocket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });
    setSocket(newSocket);

    newSocket.on('reviewCreated', (newReview: IReview) => {
      if (newReview.restaurant === restaurantId) {
        setReviews((prev) => {
          if (prev.some((r) => r._id === newReview._id)) {
            return prev;
          }
          return [newReview, ...prev];
        });
      }
    });

    newSocket.on('reviewUpdated', (updatedReview: IReview) => {
      if (updatedReview.restaurant === restaurantId) {
        setReviews((prev) =>
          prev.map((r) => (r._id === updatedReview._id ? updatedReview : r))
        );
      }
    });

    newSocket.on('reviewDeleted', (deletedReviewId: string) => {
      setReviews((prev) => prev.filter((r) => r._id !== deletedReviewId));
    });

    return () => {
      newSocket.disconnect();
    };
  }, [restaurantId]);

  if (loading) {
    return <div className="p-8 text-gray-700">Loading reviews...</div>;
  }
  if (error) {
    return <div className="p-8 text-red-600 font-semibold">{error}</div>;
  }
  if (!restaurant) {
    return <div className="p-8 text-gray-700">No restaurant data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantOverviewSection restaurant={restaurant} />
      <ReviewListSection reviews={reviews} />
      <div className="max-w-4xl mx-auto px-4">
        <AddReviewForm
          restaurantId={restaurantId || ''}
          onReviewCreated={() => {
          }}
        />
      </div>
    </div>
  );
};

export default Review;
