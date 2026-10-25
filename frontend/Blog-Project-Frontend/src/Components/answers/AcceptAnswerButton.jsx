const AcceptAnswerButton = ({ isAccepted, onAccept, canAccept }) => {
  if (!isAccepted && !canAccept) return null;

  return (
    <button
      onClick={onAccept}
      disabled={!canAccept}
      className={`flex flex-col items-center justify-center p-2 rounded transition-colors ${
        isAccepted
          ? 'text-green-600 dark:text-green-400'
          : 'text-gray-400 hover:text-green-600 dark:hover:text-green-400'
      } ${!canAccept ? 'cursor-default' : 'cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20'}`}
      aria-label={isAccepted ? "Accepted Answer" : "Accept this answer"}
      title={isAccepted ? "This answer was accepted by the question owner" : "Mark as accepted answer"}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>
  );
};

export default AcceptAnswerButton;