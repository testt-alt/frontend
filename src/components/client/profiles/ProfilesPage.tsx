import React from 'react';
import ProfileHero from './ProfileHero';
import ProfileDetails from './ProfileDetails';
import ProfileServices from './ProfileServices';
import ProfileReviews from './ProfileReviews';
import ProfileAvailability from './ProfileAvailability';
import ProfileGallery from './ProfileGallery';
import RelatedProfessionals from './RelatedProfessionals';

interface ProfilesPageProps {
  onNavigate?: (page: string) => void;
}

const ProfilesPage: React.FC<ProfilesPageProps> = ({ onNavigate }) => {
  // This would normally come from URL params or props
  const professionalId = 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 transition-all duration-500">
      <ProfileHero professionalId={professionalId} onNavigate={onNavigate} />
      <ProfileDetails professionalId={professionalId} />
      <ProfileServices professionalId={professionalId} onNavigate={onNavigate} />
      <ProfileGallery professionalId={professionalId} />
      <ProfileAvailability professionalId={professionalId} onNavigate={onNavigate} />
      <ProfileReviews professionalId={professionalId} />
      <RelatedProfessionals professionalId={professionalId} onNavigate={onNavigate} />
    </div>
  );
};

export default ProfilesPage;