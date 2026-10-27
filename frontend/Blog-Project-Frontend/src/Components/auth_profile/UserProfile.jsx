import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileTabs from './ProfileTabs';
import ReputationBadge from './ReputationBadge';
import QuestionList from '../questions/QuestionList'; 

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

      {/* Tabs */}
      <ProfileTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={{ questions: questions.length, answers: answers.length }} 
      />

      {/* Content Rendering Area */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-1 min-h-[300px] mt-4">
        
        {/* Render Questions */}
        {activeTab === 'questions' && (
          <div className="p-4">
            {questions.length > 0 ? (
              <QuestionList questions={questions} emptyMessage="" />
            ) : (
              <div className="text-gray-500 text-center py-8">No questions asked yet.</div>
            )}
          </div>
        )}
        
        {/* Render Answers */}
        {activeTab === 'answers' && (
          <div className="flex flex-col gap-4 p-4">
            {answers.length > 0 ? (
              answers.map((a) => (
                <div key={a._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="text-sm text-gray-500 mb-3">
                    Answered on:{' '}
                    <Link to={`/questions/${a.questionId?._id || a.questionId}`} className="text-blue-600 hover:underline font-medium">
                      {a.questionId?.questionTitle || "View Question"}
                    </Link>
                  </div>
                  {/* Safely render the HTML content of the answer */}
                  <div className="text-gray-800 dark:text-gray-200 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: a.content || a.answerText || a.body }} />
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">No answers provided yet.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;