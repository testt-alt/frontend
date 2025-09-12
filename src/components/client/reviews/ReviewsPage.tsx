import React from 'react';
import ReviewsHero from './ReviewsHero';
import ReviewsStats from './ReviewsStats';
import ReviewsList from './ReviewsList';
import ReviewsFilters from './ReviewsFilters';
import WriteReviewModal from './WriteReviewModal';

const ReviewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500">
      <ReviewsHero />
      <ReviewsStats />
      <ReviewsFilters />
      <ReviewsList />
      <WriteReviewModal />
    </div>
  );
};

export default ReviewsPage;