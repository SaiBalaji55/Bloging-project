import TagList from './TagList';
import VoteButtons from './VoteButtons';

const QuestionDetails = ({ question, currentUserId, onEdit, onDelete, onVote }) => {
  const isAuthor = question.userId?._id === currentUserId;
  const voteScore = question.voteScore || 0; // Requires backend aggregation
  const userVote = question.userVote || 0; // Requires backend projection

  return (
    <div className="flex gap-4 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
      
      <div className="shrink-0 mt-2">
        <VoteButtons 
          score={voteScore} 
          userVote={userVote}
          onUpvote={() => onVote(1)} 
          onDownvote={() => onVote(-1)} 
        />
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {question.questionTitle}
        </h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-6">
          {question.questionDescription}
        </div>

        <div className="mb-6">
          <TagList tags={question.tags} />
        </div>

        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-4">
            {isAuthor && (
              <>
                <button onClick={onEdit} className="text-sm text-gray-500 hover:text-blue-600 transition">Edit</button>
                <button onClick={onDelete} className="text-sm text-gray-500 hover:text-red-600 transition">Delete</button>
              </>
            )}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm text-gray-600 dark:text-gray-400">
            asked {new Date(question.createdAt).toLocaleString()} by <span className="font-medium text-blue-600 dark:text-blue-400">{question.userId?.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;