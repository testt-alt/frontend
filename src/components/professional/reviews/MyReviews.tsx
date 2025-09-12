import React from 'react';
import ReviewsHero from './ReviewsHero';
import ReviewsStats from './ReviewsStats';
import ReviewsFilters from './ReviewsFilters';
import ReviewsList from './ReviewsList';

const MyReviews: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <ReviewsHero />
      <ReviewsStats />
      <ReviewsFilters />
      <ReviewsList />
    </div>
  );
};

export default MyReviews;