const VoteButtons = ({ score = 0, userVote = 0, onUpvote, onDownvote }) => {
  return (
    <div className="flex flex-col items-center gap-1 p-2">
      <button 
        onClick={onUpvote}
        className={`p-1 rounded-full ${userVote === 1 ? 'text-orange-500 bg-orange-100 dark:bg-orange-900/30' : 'text-gray-400 hover:text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        aria-label="Upvote"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l6 9H4l6-9z"/></svg>
      </button>
      
      <span className="text-lg font-bold text-gray-700 dark:text-gray-300">{score}</span>
      
      <button 
        onClick={onDownvote}
        className={`p-1 rounded-full ${userVote === -1 ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' : 'text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
        aria-label="Downvote"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l-6-9h12l-6 9z"/></svg>
      </button>
    </div>
  );
};

export default VoteButtons;