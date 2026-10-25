import { Link } from 'react-router-dom';
import TagList from './TagList';

const QuestionCard = ({ question }) => {
  const { _id, questionTitle, tags, userId, createdAt } = question;
  
  // Placeholder values for stats until aggregation is implemented
  const voteScore = question.voteScore || 0; 
  const answerCount = question.answerCount || 0;

  return (
    <div className="flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      {/* Stats Column */}
      <div className="flex flex-col items-end gap-1 min-w-[80px] text-sm text-gray-500 dark:text-gray-400 shrink-0">
        <div className="font-medium text-gray-900 dark:text-gray-100">{voteScore} votes</div>
        <div className={answerCount > 0 ? 'text-green-600 dark:text-green-400' : ''}>
          {answerCount} answers
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