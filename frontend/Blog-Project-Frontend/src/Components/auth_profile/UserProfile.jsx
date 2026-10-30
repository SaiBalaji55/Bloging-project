import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import ProfileTabs from './ProfileTabs';
import ReputationBadge from './ReputationBadge';
import QuestionList from '../questions/QuestionList'; 
import { updateUserAvatar } from '../../api/profileApi'; // Import the new API function

const UserProfile = ({ user, questions = [], answers = [] }) => {
  const [activeTab, setActiveTab] = useState('questions');
  
const { user: currentUser, updateUserProfileContext } = useAuth(); 
  const [isUpdating, setIsUpdating] = useState(false);
  
  // 1. Determine if this is the logged-in user's profile FIRST
  const isOwnProfile = currentUser?._id === user?._id;

  // 2. Prioritize the globally saved context avatar if viewing own profile
  const [displayedAvatar, setDisplayedAvatar] = useState(
    isOwnProfile ? (currentUser?.profilePicture || user?.profilePicture) : user?.profilePicture
  );

  // 3. Keep everything perfectly in sync when data changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedAvatar(
      isOwnProfile ? (currentUser?.profilePicture || user?.profilePicture) : user?.profilePicture
    );
  }, [user?.profilePicture, currentUser?.profilePicture, isOwnProfile]);
  // const isOwnProfile = currentUser?._id === user?._id;

  const availableAvatars = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
    '/avatars/avatar5.png'
  ];

  const handleAvatarSelect = async (avatarUrl) => {
    setIsUpdating(true);
    try {
      // Use the clean API function instead of hardcoded fetch
      await updateUserAvatar(user._id, avatarUrl);

      // Update the big picture on the current page instantly
      setDisplayedAvatar(avatarUrl);

      // Update global context so Navbar updates instantly
      if (updateUserProfileContext) {
        updateUserProfileContext({ profilePicture: avatarUrl });
      }
    } catch (error) {
      console.error("Avatar update failed:", error);
      alert("Could not update profile picture");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm mb-8">
        
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-md shrink-0 overflow-hidden">
          {displayedAvatar ? (
            <img src={displayedAvatar} alt={user?.username} className="w-full h-full object-cover bg-white" />
          ) : (
            user?.username?.charAt(0).toUpperCase()
          )}
        </div>
        
        <div className="flex-1 w-full">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            {user?.username}
          </h1>
          <div className="flex items-center gap-4 text-sm mb-4">
            <span className="text-gray-500 dark:text-gray-400 font-medium">{user?.email}</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <ReputationBadge score={user?.reputation || 125} />
          </div>

          {user?.isStudentorProfessional && (
            <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 w-full sm:w-fit mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider w-fit
                ${user.isStudentorProfessional === 'Student' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400' 
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400'}`}
              >
                {user.isStudentorProfessional === 'Student' ? '🎓 Student' : '💼 Professional'}
              </span>
              
              <div className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {user.isStudentorProfessional === 'Student' ? (
                  <div className="flex flex-col gap-1.5">
                    <p><span className="font-semibold text-gray-900 dark:text-white">Degree:</span> {user.degree || 'Not provided'}</p>
                    <p><span className="font-semibold text-gray-900 dark:text-white">College:</span> {user.collegeName || 'Not provided'}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <p><span className="font-semibold text-gray-900 dark:text-white">Role:</span> {user.jobRole || 'Not provided'}</p>
                    <p><span className="font-semibold text-gray-900 dark:text-white">Company:</span> {user.companyname || 'Not provided'}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {isOwnProfile && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Choose an Avatar</h3>
              <div className="flex flex-wrap gap-3">
                {availableAvatars.map((avatar, index) => (
                  <button
                    key={index}
                    disabled={isUpdating}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`w-12 h-12 rounded-full border-2 overflow-hidden transition-all ${
                      displayedAvatar === avatar ? 'border-blue-500 scale-110 shadow-md' : 'border-transparent hover:border-blue-300'
                    }`}
                    title={`Select Avatar ${index + 1}`}
                  >
                    <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover bg-gray-100 dark:bg-gray-700" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProfileTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={{ questions: questions.length, answers: answers.length }} 
      />

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-1 min-h-[300px] mt-4">
        {activeTab === 'questions' && (
          <div className="p-4">
            {questions.length > 0 ? (
              <QuestionList questions={questions} emptyMessage="" />
            ) : (
              <div className="text-gray-500 font-medium text-center py-12">No questions asked yet.</div>
            )}
          </div>
        )}
        
        {activeTab === 'answers' && (
          <div className="flex flex-col gap-4 p-4">
            {answers.length > 0 ? (
              answers.map((a) => (
                <div key={a._id} className="p-5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    Answered on:{' '}
                    <Link to={`/questions/${a.questionId?._id || a.questionId}`} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                      {a.questionId?.questionTitle || "View Question"}
                    </Link>
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: a.content || a.answerText || a.body }} />
                </div>
              ))
            ) : (
              <div className="text-gray-500 font-medium text-center py-12">No answers provided yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;