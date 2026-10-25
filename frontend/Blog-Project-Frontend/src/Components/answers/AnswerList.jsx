import AnswerCard from './AnswerCard';

const AnswerList = ({ 
  answers = [], 
  currentUserId, 
  questionOwnerId, 
  onVote, 
  onAccept, 
  onDelete 
}) => {
  if (!answers.length) return null;

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
      {answers.map(answer => (
        <AnswerCard 
          key={answer._id} 
          answer={answer} 
          currentUserId={currentUserId}
          questionOwnerId={questionOwnerId}
          onVote={onVote}
          onAccept={onAccept}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AnswerList;