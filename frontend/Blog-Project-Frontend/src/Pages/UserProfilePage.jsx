import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import UserProfile from '../Components/auth_profile/UserProfile';
import { fetchUserProfile, fetchUserQuestions, fetchUserAnswers } from '../api/profileApi';

const UserProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  // If the route is /profile, or /users/:id matches the logged-in user, show their own profile
  const targetUserId = id || currentUser?._id;

  const [profileData, setProfileData] = useState(null);
  const [userQuestions, setUserQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!targetUserId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("No user ID provided.");
      setIsLoading(false);
      return;
    }

    const loadProfileData = async () => {
      setIsLoading(true);
      try {
        // Fetch User Info, Questions, and Answers simultaneously
        const [profileRes, questionsRes, answersRes] = await Promise.all([
          fetchUserProfile(targetUserId),
          fetchUserQuestions(targetUserId),
          fetchUserAnswers(targetUserId)
        ]);

        setProfileData(profileRes.user || profileRes);
        setUserQuestions(questionsRes.questions || questionsRes);
        setUserAnswers(answersRes.answers || answersRes);
      } catch (err) {
        setError('Failed to load user profile.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProfileData();
  }, [targetUserId]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  if (error || !profileData) return <div className="p-8 text-center text-red-500">{error || "User not found"}</div>;

  return (
    // Unified page background and spacing layout
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Loading and Error States */}
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            Loading profile...
          </div>
        ) : error || !profileData ? (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl shadow-sm flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            {error || "User not found"}
          </div>
        ) : (
          <UserProfile 
            user={profileData} 
            questions={userQuestions} 
            answers={userAnswers} 
          />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;