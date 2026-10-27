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
    <div className="max-w-5xl mx-auto w-full">
      <UserProfile 
        user={profileData} 
        questions={userQuestions} 
        answers={userAnswers} 
      />
    </div>
  );
};

export default UserProfilePage;