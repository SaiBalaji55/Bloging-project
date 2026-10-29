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
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm mb-8">
        
        {/* Upgraded Gradient Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-md shrink-0">
          {user?.username?.charAt(0).toUpperCase()}
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

          {/* Student / Professional Details Block */}
          {user?.isStudentorProfessional && (
            <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700 w-full sm:w-fit">
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

        </div>
      </div>

      {/* Tabs */}
      <ProfileTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        counts={{ questions: questions.length, answers: answers.length }} 
      />

      {/* Content Rendering Area */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-1 min-h-[300px] mt-4">
        
        {/* Render Questions */}
        {activeTab === 'questions' && (
          <div className="p-4">
            {questions.length > 0 ? (
              <QuestionList questions={questions} emptyMessage="" />
            ) : (
              <div className="text-gray-500 font-medium text-center py-12">No questions asked yet.</div>
            )}
          </div>
        )}
        
        {/* Render Answers */}
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
                  {/* Safely render the HTML content of the answer */}
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