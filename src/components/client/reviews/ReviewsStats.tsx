import React from 'react';
import { Star, MessageSquare, Award, TrendingUp, Users, Heart, CheckCircle, Clock } from 'lucide-react';

const ReviewsStats: React.FC = () => {
  const stats = [
    {
      icon: MessageSquare,
      title: 'Total Reviews Written',
      value: '18',
      change: '+3 this month',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10',
      trend: 'up'
    },
    {
      icon: Star,
      title: 'Average Rating Given',
      value: '4.6',
      change: 'Helpful reviews',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10',
      trend: 'neutral'
    },
    {
      icon: Heart,
      title: 'Helpful Votes Received',
      value: '127',
      change: '+15 this week',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10',
      trend: 'up'
    },
    {
      icon: Award,
      title: 'Review Badges Earned',
      value: '5',
      change: 'Top Reviewer',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10',
      trend: 'achievement'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Top Reviewer',
      description: 'Written 15+ detailed reviews',
      earned: true
    },
    {
      icon: Heart,
      title: 'Helpful Contributor',
      description: '100+ helpful votes received',
      earned: true
    },
    {
      icon: Star,
      title: 'Quality Reviewer',
      description: 'Average review length 200+ words',
      earned: true
    },
    {
      icon: Users,
      title: 'Community Leader',
      description: 'Reviews viewed 1000+ times',
      earned: false
    },
    {
      icon: CheckCircle,
      title: 'Verified Reviewer',
      description: 'All reviews verified authentic',
      earned: true
    },
    {
      icon: TrendingUp,
      title: 'Rising Star',
      description: '50% increase in helpful votes',
      earned: false
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-200 dark:border-gray-700 animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {stat.title}
                </h3>

                {/* Change indicator */}
                <div className={`flex items-center text-sm ${
                  stat.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                  stat.trend === 'achievement' ? 'text-purple-600 dark:text-purple-400' :
                  'text-gray-600 dark:text-gray-400'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="h-4 w-4 mr-1" />}
                  {stat.trend === 'achievement' && <Award className="h-4 w-4 mr-1" />}
                  <span>{stat.change}</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements section */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 text-white relative overflow-hidden animate-fade-in-up">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Your Review Achievements</h3>
              <p className="text-purple-100 text-lg max-w-2xl mx-auto">
                Unlock badges and recognition for your valuable contributions to the community
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {achievements.map((achievement, index) => (
                <div key={achievement.title} className="text-center group">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-white/20 shadow-lg' 
                        : 'bg-white/10 opacity-50'
                    }`}>
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className={`text-sm font-medium mb-1 ${achievement.earned ? 'text-white' : 'text-white/60'}`}>
                    {achievement.title}
                  </div>
                  <div className={`text-xs ${achievement.earned ? 'text-purple-100' : 'text-white/40'}`}>
                    {achievement.description}
                  </div>
                  {achievement.earned && (
                    <div className="mt-2">
                      <CheckCircle className="h-4 w-4 text-green-300 mx-auto animate-bounce" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsStats;