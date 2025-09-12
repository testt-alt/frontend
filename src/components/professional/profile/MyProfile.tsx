import React from 'react';
import ProfileHero from './ProfileHero';
import ProfileStats from './ProfileStats';
import ProfileAbout from './ProfileAbout';

const MyProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <ProfileHero />
      <ProfileStats />
      <ProfileAbout />
    </div>
  );
};

export default MyProfile;