import VoteButtons from '../questions/VoteButtons';
import AcceptAnswerButton from './AcceptAnswerButton';
import CommentList from './CommentList';
import CommentSection from './CommentSection';

const AnswerCard = ({ 
  answer, 
  currentUserId, 
  questionOwnerId, 
  onVote, 
  onAccept, 
  onDelete 
}) => {
  const isAuthor = answer.userId?._id === currentUserId;
  const canAccept = currentUserId === questionOwnerId;
  const voteScore = answer.voteScore || 0;
  const userVote = answer.userVote || 0;

  return (
    <div className={`flex gap-4 p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${answer.isAccepted ? 'bg-green-50/30 dark:bg-green-900/10' : ''}`}>
      
      {/* Left Column: Voting and Accepted Checkmark */}
      <div className="shrink-0 flex flex-col items-center mt-2">
        <VoteButtons 
          score={voteScore} 
          userVote={userVote}
          onUpvote={() => onVote(answer._id, 1)} 
          onDownvote={() => onVote(answer._id, -1)} 
        />
        <AcceptAnswerButton 
          isAccepted={answer.isAccepted} 
          onAccept={() => onAccept(answer._id)} 
          canAccept={canAccept} 
        />
      </div>

      {/* Right Column: Content and Meta */}
      <div className="flex-1 min-w-0">
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-6">
          {answer.content}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex gap-4">
            {isAuthor && (
              <button 
                onClick={() => onDelete(answer._id)} 
                className="text-sm text-gray-500 hover:text-red-600 transition"
              >
                Delete
              </button>
            )}
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm text-gray-600 dark:text-gray-400">
            answered {new Date(answer.createdAt).toLocaleString()} by <span className="font-medium text-blue-600 dark:text-blue-400">{answer.userId?.username || 'Unknown'}</span>
          </div>
        </div>

        {/* FIX: Use answer._id here */}
        <CommentSection targetId={answer._id} type='answer'/>

        {/* Nested Comments Section */}
        <div className="mt-4 pt-4">
          <CommentList 
            comments={answer.comments || []} 
            itemId={answer._id} 
            itemType="Answer" 
          />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;