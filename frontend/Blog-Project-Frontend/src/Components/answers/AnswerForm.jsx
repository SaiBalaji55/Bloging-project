import { useState } from 'react';

const AnswerForm = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (content.trim().length < 20) {
      return setError('Answer must be at least 20 characters long to provide sufficient detail.');
    }

    onSubmit({ content });
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Answer</h3>
      
      {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded">{error}</div>}

      <div>
        <textarea 
          rows="6" 
          value={content} 
          onChange={(e) => {
            setContent(e.target.value);
            setError('');
          }} 
          required
          placeholder="Write your solution here. Provide code examples where applicable..."
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
        <div className="text-xs text-right mt-1 text-gray-500">
          {content.length} characters (min 20)
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting || content.length < 20}
        className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? 'Posting Answer...' : 'Post Your Answer'}
      </button>
    </form>
  );
};

export default AnswerForm;
