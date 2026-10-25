const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="text-xs font-semibold uppercase tracking-wider bg-red-100 hover:bg-red-200 dark:bg-red-800/50 dark:hover:bg-red-800 px-3 py-1.5 rounded transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;