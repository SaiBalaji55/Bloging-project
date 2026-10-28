import { Link } from 'react-router-dom';
import TagList from './TagList'; // Restored your TagList import

const QuestionCard = ({ question }) => {
  const { _id, questionTitle, tags, userId, createdAt } = question;
  
  const voteScore = question.voteScore || 0; 
  const answerCount = question.answerCount || 0;
  const hasAccepted = question.hasAcceptedAnswer || false;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 mb-4">
      
      {/* Left Column: Stats */}
      <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 text-sm shrink-0 sm:w-24">
        
        {/* Votes */}
        <div className="flex flex-col items-center sm:items-end text-gray-500 dark:text-gray-400">
          <span className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight">{voteScore}</span> 
          <span className="text-[11px] font-semibold uppercase tracking-wider">votes</span>
        </div>

        {/* Answers */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors
          ${hasAccepted 
            ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50' 
            : answerCount > 0 
              ? 'bg-white text-green-700 border border-green-400 dark:bg-gray-800 dark:text-green-400 dark:border-green-600' 
              : 'text-gray-400 border border-transparent'
          }`}
        >
          {hasAccepted && (
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <div className="flex items-baseline gap-1">
            <span className={!hasAccepted ? "font-bold" : "font-semibold"}>{answerCount}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider">answers</span>
          </div>
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Link 
          to={`/questions/${_id}`} 
          className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors mb-3"
        >
          {questionTitle}
        </Link>
        
        {/* Tags & Meta wrapper */}
        <div className="mt-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          
          {/* Using your custom TagList Component */}
          <div className="flex flex-wrap gap-2">
            <TagList tags={tags} />
          </div>
          
          {/* User Meta */}
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm text-xs">
              {userId?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-gray-900 dark:text-gray-200">
                {userId?.username || 'Unknown User'}
              </span>
              <span>•</span>
              <span>asked {formattedDate}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuestionCard;