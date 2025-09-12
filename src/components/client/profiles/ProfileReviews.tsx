import React, { useState } from 'react';
import { Star, Heart, Calendar, User, ThumbsUp, Filter, ChevronDown, Award, CheckCircle, TrendingUp } from 'lucide-react';

interface ProfileReviewsProps {
  professionalId: number;
}

const ProfileReviews: React.FC<ProfileReviewsProps> = ({ professionalId }) => {
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [likedReviews, setLikedReviews] = useState<number[]>([]);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      clientImage: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2024-12-20',
      title: 'Exceptional cardiac care and professionalism',
      content: 'Dr. Chen provided outstanding care during my cardiac consultation. Her expertise in interventional cardiology is evident, and she explained my condition and treatment options clearly. The procedure was successful, and my recovery has been smooth. I highly recommend Dr. Chen to anyone needing cardiac care.',
      helpful: 23,
      verified: true,
      serviceType: 'Cardiac Surgery Consultation',
      tags: ['Professional', 'Knowledgeable', 'Caring']
    },
    {
      id: 2,
      clientName: 'Michael Rodriguez',
      clientImage: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2024-12-18',
      title: 'Life-saving intervention',
      content: 'I came to Dr. Chen with severe chest pain and was diagnosed with a blocked artery. Her quick thinking and expertise saved my life. The minimally invasive procedure she performed was remarkable, and I was back to normal activities within weeks. Forever grateful!',
      helpful: 31,
      verified: true,
      serviceType: 'Emergency Cardiac Assessment',
      tags: ['Life-saving', 'Expert', 'Quick Response']
    },
    {
      id: 3,
      clientName: 'Jennifer Davis',
      clientImage: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      rating: 4,
      date: '2024-12-15',
      title: 'Thorough and compassionate care',
      content: 'Dr. Chen took the time to thoroughly explain my heart condition and all available treatment options. Her compassionate approach made me feel comfortable throughout the entire process. The only minor issue was the wait time, but the quality of care made it worthwhile.',
      helpful: 18,
      verified: true,
      serviceType: 'Comprehensive Cardiac Consultation',
      tags: ['Thorough', 'Compassionate', 'Patient']
    },
    {
      id: 4,
      clientName: 'Robert Wilson',
      clientImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2024-12-12',
      title: 'Outstanding preventive care program',
      content: 'The preventive cardiology program designed by Dr. Chen has been transformative for my health. Her personalized approach to lifestyle modifications and regular monitoring has significantly improved my cardiovascular health. Excellent follow-up care as well.',
      helpful: 25,
      verified: true,
      serviceType: 'Preventive Cardiology Program',
      tags: ['Preventive', 'Personalized', 'Effective']
    },
    {
      id: 5,
      clientName: 'Lisa Anderson',
      clientImage: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      rating: 5,
      date: '2024-12-10',
      title: 'World-class cardiac surgeon',
      content: 'Dr. Chen performed my heart valve replacement surgery with incredible skill. Her attention to detail and post-operative care were exceptional. The surgical team was professional, and the facility was state-of-the-art. I couldn\'t have asked for better care.',
      helpful: 42,
      verified: true,
      serviceType: 'Cardiac Surgery',
      tags: ['Skilled', 'Detailed', 'Professional Team']
    }
  ];

  const reviewStats = {
    totalReviews: 456,
    averageRating: 4.9,
    ratingDistribution: {
      5: 89,
      4: 8,
      3: 2,
      2: 1,
      1: 0
    }
  };

  const toggleLike = (reviewId: number) => {
    setLikedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredReviews = filterRating === 0 
    ? reviews 
    : reviews.filter(review => review.rating === filterRating);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default: // newest
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full mb-6">
            <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <span className="text-yellow-800 dark:text-yellow-300 font-medium">Patient Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Patients
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600"> Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real experiences from patients who have received care from Dr. Chen
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Reviews Stats Sidebar */}
          <div className="lg:col-span-1">
            {/* Overall Rating */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8 animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {reviewStats.averageRating}
                </div>
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(reviewStats.averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on {reviewStats.totalReviews} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-12">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution] / reviewStats.totalReviews) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
                      {reviewStats.ratingDistribution[rating as keyof typeof reviewStats.ratingDistribution]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in-up animation-delay-300">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Filter Reviews</h3>
              
              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  By Rating
                </label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                >
                  <option value={0}>All Ratings</option>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {sortedReviews.map((review, index) => (
                <div
                  key={review.id}
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/5 dark:to-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10">
                    {/* Review Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img
                            src={review.clientImage}
                            alt={review.clientName}
                            className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-yellow-200 dark:group-hover:ring-yellow-800 transition-all duration-500 shadow-lg"
                          />
                          {review.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                            {review.clientName}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {review.serviceType}
                            </span>
                            {review.verified && (
                              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                                <Award className="h-3 w-3" />
                                <span className="text-xs font-medium">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">{formatDate(review.date)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Review Title */}
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                      {review.title}
                    </h5>

                    {/* Review Content */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {review.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {review.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => toggleLike(review.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                          likedReviews.includes(review.id)
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedReviews.includes(review.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">
                          {review.helpful + (likedReviews.includes(review.id) ? 1 : 0)} Helpful
                        </span>
                      </button>

                      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Verified Patient</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Reviews */}
            <div className="text-center mt-12 animate-fade-in-up">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Exceptional Care?
              </h3>
              <p className="text-yellow-100 mb-8 max-w-2xl mx-auto text-lg">
                Join hundreds of satisfied patients who have received world-class cardiac care from Dr. Chen
              </p>
              <button className="px-8 py-4 bg-white text-yellow-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Book Your Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileReviews;