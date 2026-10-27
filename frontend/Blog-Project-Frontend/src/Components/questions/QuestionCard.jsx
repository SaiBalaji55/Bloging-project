import { Link } from 'react-router-dom';
import TagList from './TagList';

const QuestionCard = ({ question }) => {
  const { _id, questionTitle, tags, userId, createdAt } = question;
  
  // Stats values
  const voteScore = question.voteScore || 0; 
  const answerCount = question.answerCount || 0;
  const hasAccepted = question.hasAcceptedAnswer || false;

  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Stats Column */}
      <div className="flex flex-col items-end gap-2 text-sm shrink-0 w-24 mt-1">
        
        {/* Votes */}
        <div className="text-gray-700 dark:text-gray-300">
          <span className="font-medium text-base">{voteScore}</span> votes
        </div>

        {/* Answers - Conditional Styling */}
        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm
          ${hasAccepted 
            ? 'bg-green-600 text-white font-medium' // Green bg + white text for accepted
            : answerCount > 0 
              ? 'border border-green-600 text-green-700 dark:text-green-500' // Green border for answered but not accepted
              : 'text-gray-500' // Grey text for 0 answers
          }`}
        >
          {/* Show tick mark SVG only if the answer is accepted */}
          {hasAccepted && (
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span><span className={!hasAccepted ? "font-medium text-base" : ""}>{answerCount}</span> answers</span>
        </div>
      </div>

      {/* Content Column */}
      <div className="flex-1 min-w-0">
        <Link to={`/questions/${_id}`} className="text-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 line-clamp-2 mb-2 font-medium">
          {questionTitle}
        </Link>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
          <TagList tags={tags} />
          
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {userId?.username || 'Unknown User'}
            </span>
            asked {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;