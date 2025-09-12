import React, { useState } from 'react';
import { Star, Heart, MessageSquare, Calendar, User, ThumbsUp, Flag, Edit, Trash2, MoreHorizontal, Award, CheckCircle } from 'lucide-react';

const ReviewsList: React.FC = () => {
  const [likedReviews, setLikedReviews] = useState<number[]>([]);

  const reviews = [
    {
      id: 1,
      professional: {
        name: 'Dr. Sarah Mitchell',
        specialty: 'Cardiologist',
        image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      date: '2024-12-20',
      title: 'Exceptional care and professionalism',
      content: 'Dr. Mitchell provided outstanding care during my consultation. She was thorough, patient, and explained everything clearly. The appointment was on time, and her staff was incredibly helpful. I felt heard and well-cared for throughout the entire process. Highly recommend her services to anyone looking for a cardiologist.',
      helpful: 23,
      category: 'Healthcare',
      verified: true,
      photos: ['https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
      tags: ['Professional', 'Punctual', 'Thorough'],
      appointmentType: 'In-Person'
    },
    {
      id: 2,
      professional: {
        name: 'James Rodriguez',
        specialty: 'Corporate Lawyer',
        image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      rating: 4,
      date: '2024-12-18',
      title: 'Great legal advice, very knowledgeable',
      content: 'James helped me with my business contract review. He was very knowledgeable and provided clear explanations of complex legal terms. The only minor issue was that the consultation ran a bit over time, but the quality of advice was excellent. Would definitely work with him again.',
      helpful: 18,
      category: 'Legal',
      verified: true,
      photos: [],
      tags: ['Knowledgeable', 'Clear Communication'],
      appointmentType: 'Video Call'
    },
    {
      id: 3,
      professional: {
        name: 'Dr. Emily Chen',
        specialty: 'Clinical Psychologist',
        image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      date: '2024-12-15',
      title: 'Life-changing therapy sessions',
      content: 'Dr. Chen has been instrumental in helping me work through my anxiety. Her approach is compassionate yet effective. She provides practical tools and strategies that I can use in my daily life. The virtual sessions were convenient and just as effective as in-person meetings.',
      helpful: 31,
      category: 'Therapy',
      verified: true,
      photos: [],
      tags: ['Compassionate', 'Effective', 'Supportive'],
      appointmentType: 'Video Call'
    },
    {
      id: 4,
      professional: {
        name: 'Michael Thompson',
        specialty: 'Financial Advisor',
        image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      rating: 4,
      date: '2024-12-12',
      title: 'Solid financial planning advice',
      content: 'Michael provided comprehensive financial planning advice for my retirement. He was thorough in analyzing my current situation and provided a detailed roadmap. The presentation was clear and easy to understand. Good value for the consultation fee.',
      helpful: 15,
      category: 'Finance',
      verified: true,
      photos: [],
      tags: ['Thorough', 'Clear', 'Professional'],
      appointmentType: 'In-Person'
    },
    {
      id: 5,
      professional: {
        name: 'Lisa Anderson',
        specialty: 'Business Consultant',
        image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      date: '2024-12-10',
      title: 'Transformed our business strategy',
      content: 'Lisa\'s strategic insights were exactly what our startup needed. She helped us identify key growth opportunities and provided actionable recommendations. Her experience in digital transformation was evident throughout our sessions. Excellent ROI on the consultation investment.',
      helpful: 27,
      category: 'Consulting',
      verified: true,
      photos: ['https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'],
      tags: ['Strategic', 'Insightful', 'Results-Oriented'],
      appointmentType: 'Video Call'
    },
    {
      id: 6,
      professional: {
        name: 'Prof. David Kim',
        specialty: 'Math Tutor',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
      },
      rating: 5,
      date: '2024-12-08',
      title: 'Amazing tutor, made calculus understandable',
      content: 'Professor Kim has a gift for explaining complex mathematical concepts in simple terms. My calculus grades improved significantly after just a few sessions. He\'s patient, encouraging, and always prepared with additional practice problems. Best tutor I\'ve ever worked with!',
      helpful: 22,
      category: 'Education',
      verified: true,
      photos: [],
      tags: ['Patient', 'Clear Explanations', 'Encouraging'],
      appointmentType: 'Video Call'
    }
  ];

  const toggleLike = (reviewId: number) => {
    setLikedReviews(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 5) return 'text-green-600';
    if (rating >= 4) return 'text-blue-600';
    if (rating >= 3) return 'text-yellow-600';
    if (rating >= 2) return 'text-orange-600';
    return 'text-red-600';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Healthcare': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Legal': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Finance': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'Therapy': 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
      'Consulting': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'Education': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"> Reviews</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            All the reviews you've written to help others make informed decisions
          </p>
        </div>

        {/* Reviews List */}
        <div className="space-y-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/5 dark:to-pink-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative z-10">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={review.professional.image}
                        alt={review.professional.name}
                        className="h-16 w-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 group-hover:ring-purple-200 dark:group-hover:ring-purple-800 transition-all duration-500 shadow-lg"
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {review.professional.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {review.professional.specialty}
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(review.category)}`}>
                          {review.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {review.appointmentType}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                      <Edit className="h-4 w-4 text-gray-400 hover:text-purple-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Rating and Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`font-bold text-lg ${getRatingColor(review.rating)}`}>
                      {review.rating}.0
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{formatDate(review.date)}</span>
                  </div>
                </div>

                {/* Review Title */}
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {review.title}
                </h4>

                {/* Review Content */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {review.content}
                </p>

                {/* Tags */}
                {review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {review.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Photos */}
                {review.photos.length > 0 && (
                  <div className="mb-6">
                    <div className="flex space-x-4">
                      {review.photos.map((photo, photoIndex) => (
                        <img
                          key={photoIndex}
                          src={photo}
                          alt="Review photo"
                          className="w-24 h-24 object-cover rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6">
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
                    
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm font-medium">Reply</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Award className="h-4 w-4" />
                        <span className="text-xs font-medium">Verified</span>
                      </div>
                    )}
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110">
                      <Flag className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Want to Write More Reviews?</h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Help others by sharing your experiences with the professionals you've worked with
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Write New Review
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105">
                  View All Professionals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsList;