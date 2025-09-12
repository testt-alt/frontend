import React, { useState } from 'react';
import { X, Star, Camera, Upload, Send, User, Calendar, MapPin } from 'lucide-react';

const WriteReviewModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    photos: [] as string[],
    anonymous: false
  });

  const suggestedTags = [
    'Professional', 'Punctual', 'Knowledgeable', 'Friendly', 'Thorough',
    'Clear Communication', 'Helpful', 'Patient', 'Experienced', 'Reliable'
  ];

  const recentProfessionals = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Cardiologist',
      date: '2024-12-20',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'James Rodriguez',
      specialty: 'Corporate Lawyer',
      date: '2024-12-18',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Emily Chen',
      specialty: 'Clinical Psychologist',
      date: '2024-12-15',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    }
  ];

  const [selectedProfessional, setSelectedProfessional] = useState(recentProfessionals[0]);

  const toggleTag = (tag: string) => {
    setReviewData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('Review submitted:', { rating, ...reviewData, professional: selectedProfessional });
    setIsOpen(false);
    // Reset form
    setRating(0);
    setReviewData({ title: '', content: '', tags: [], photos: [], anonymous: false });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 animate-bounce"
      >
        <Star className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Write a Review</h2>
              <p className="text-gray-600 dark:text-gray-400">Share your experience to help others</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Professional Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Professional
            </h3>
            <div className="grid gap-4">
              {recentProfessionals.map((professional) => (
                <button
                  key={professional.id}
                  type="button"
                  onClick={() => setSelectedProfessional(professional)}
                  className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    selectedProfessional.id === professional.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {professional.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {professional.specialty}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{professional.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Overall Rating
            </h3>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all duration-200 hover:scale-125"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {rating} out of 5 stars
                </span>
              )}
            </div>
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Review Title
            </label>
            <input
              type="text"
              value={reviewData.title}
              onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience in a few words"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Review
            </label>
            <textarea
              value={reviewData.content}
              onChange={(e) => setReviewData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Share details about your experience. What went well? What could be improved?"
              rows={6}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
              required
            />
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {reviewData.content.length}/500 characters
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Tags (Optional)
            </h3>
            <div className="flex flex-wrap gap-3">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    reviewData.tags.includes(tag)
                      ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-2 border-purple-500'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Add Photos (Optional)
            </h3>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Upload photos to support your review
              </p>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-all duration-300"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </button>
            </div>
          </div>

          {/* Privacy Options */}
          <div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={reviewData.anonymous}
                onChange={(e) => setReviewData(prev => ({ ...prev, anonymous: e.target.checked }))}
                className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300">
                Post this review anonymously
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!rating || !reviewData.title || !reviewData.content}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;