import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Reply, Share2, Bookmark, Flag, MoreVertical, User, Calendar, Award, Heart, Eye, CheckCircle, Sparkles, Crown, Trophy, Medal, Flame, Zap, Target, Gift, Rocket, Diamond } from 'lucide-react';

interface Review {
  id: number;
  clientName: string;
  clientAvatar: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  likes: number;
  replies: number;
  helpful: boolean;
  isVerified?: boolean;
  hasPhotos?: boolean;
  isVip?: boolean;
}

const ReviewsList: React.FC = () => {
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const reviews: Review[] = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      date: '2024-01-15',
      service: 'Hair Cut & Style',
      comment: 'Amazing experience! John is incredibly talented and really listened to what I wanted. The salon has a great atmosphere and I felt so comfortable throughout the entire appointment. The results exceeded my expectations!',
      likes: 12,
      replies: 2,
      helpful: true,
      isVerified: true,
      hasPhotos: true,
      isVip: true
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      clientAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      date: '2024-01-12',
      service: 'Beard Trim',
      comment: 'Perfect beard trim! John knows exactly how to shape a beard to complement your face. Very professional and the result exceeded my expectations. Will definitely be back!',
      likes: 8,
      replies: 1,
      helpful: true,
      isVerified: true,
      hasPhotos: false,
      isVip: false
    },
    {
      id: 3,
      clientName: 'Emma Rodriguez',
      clientAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4,
      date: '2024-01-10',
      service: 'Hair Color',
      comment: 'Great color work! The highlights look natural and exactly what I asked for. The only reason it\'s not 5 stars is because the appointment ran a bit longer than expected, but the results were worth it.',
      likes: 6,
      replies: 0,
      helpful: false,
      isVerified: true,
      hasPhotos: true,
      isVip: false
    },
    {
      id: 4,
      clientName: 'David Wilson',
      clientAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      date: '2024-01-08',
      service: 'Full Service',
      comment: 'Outstanding service from start to finish! John is not only skilled but also very personable. The salon is clean, modern, and has a relaxing vibe. Highly recommend to anyone looking for quality work!',
      likes: 15,
      replies: 3,
      helpful: true,
      isVerified: true,
      hasPhotos: false,
      isVip: true
    },
    {
      id: 5,
      clientName: 'Lisa Thompson',
      clientAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      date: '2024-01-05',
      service: 'Wedding Style',
      comment: 'John did my hair for my wedding and it was absolutely perfect! He understood my vision completely and created something even more beautiful than I imagined. Thank you for making my special day even more magical!',
      likes: 23,
      replies: 5,
      helpful: true,
      isVerified: true,
      hasPhotos: true,
      isVip: true
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-all duration-300 ${
              star <= rating 
                ? 'text-yellow-400 fill-current animate-pulse' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Star className="w-5 h-5 text-white fill-current" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Client Reviews</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage and respond to client feedback</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-yellow-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Grid View
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer animate-in slide-in-from-bottom-4 duration-1000 ${
              selectedReview === review.id ? 'ring-2 ring-yellow-500 ring-offset-2' : ''
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => setSelectedReview(selectedReview === review.id ? null : review.id)}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
              </div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={review.clientAvatar}
                      alt={review.clientName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white/30 shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    {review.isVip && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {review.isVerified && (
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1 group-hover:scale-105 transition-transform duration-300">
                      {review.clientName}
                    </h3>
                    <p className="text-white/80 font-medium">{review.service}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-white/80 mb-2">{formatDate(review.date)}</div>
                  <div className="flex items-center space-x-2">
                    {review.hasPhotos && (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Eye className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {review.helpful && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Review Text */}
              <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-medium text-lg group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                "{review.comment}"
              </blockquote>

              {/* Engagement Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-300 group/stat">
                  <ThumbsUp className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover/stat:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Likes</p>
                    <p className="font-bold text-gray-900 dark:text-white">{review.likes}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300 group/stat">
                  <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400 group-hover/stat:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-xs text-green-600 dark:text-green-400">Replies</p>
                    <p className="font-bold text-gray-900 dark:text-white">{review.replies}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 group/stat">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover/stat:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-xs text-purple-600 dark:text-purple-400">Rating</p>
                    <p className="font-bold text-gray-900 dark:text-white">{review.rating}.0</p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {review.isVerified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </span>
                )}
                {review.helpful && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Helpful
                  </span>
                )}
                {review.hasPhotos && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                    <Eye className="w-3 h-3 mr-1" />
                    With Photos
                  </span>
                )}
                {review.isVip && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 animate-bounce">
                    <Crown className="w-3 h-3 mr-1" />
                    VIP Client
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <Reply className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Reply</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <ThumbsUp className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 hover:scale-105 group/btn">
                    <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <Bookmark className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-110 group/btn">
                    <MoreVertical className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Reply Section */}
              {review.replies > 0 && (
                <div className="mt-4 pl-4 border-l-4 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Reply className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {review.replies} {review.replies === 1 ? 'reply' : 'replies'} from you
                    </p>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    "Thank you so much for your kind words! It was a pleasure working with you."
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Star className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No reviews found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Try adjusting your search criteria or encourage clients to leave reviews.
          </p>
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            <span className="font-bold">Request Reviews</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;