import { useState } from 'react';
import ProfileTabs from './ProfileTabs';
import ReputationBadge from './ReputationBadge';

const UserProfile = ({ user, questions = [], answers = [] }) => {
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="w-full">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-8">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-4xl font-bold shrink-0">
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user?.username}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500 dark:text-gray-400">{user?.email}</span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <ReputationBadge score={user?.reputation || 125} />
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <ProfileTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={{ questions: questions.length, answers: answers.length }} 
      />

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1 min-h-[300px]">
        {activeTab === 'questions' && (
          <div className="p-4 text-gray-500 text-center">
            {questions.length > 0 ? "Map over your QuestionCard components here" : "No questions asked yet."}
          </div>
        )}
        
        {activeTab === 'answers' && (
          <div className="p-4 text-gray-500 text-center">
            {answers.length > 0 ? "Map over your Answer summary components here" : "No answers provided yet."}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;