import { useState } from 'react';

const CommentForm = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length >= 5) {
      onSubmit(content);
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2 border-t border-gray-100 dark:border-gray-800 pt-3">
      <input 
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment... (min 5 chars)"
        required
        minLength={5}
        maxLength={500}
        className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
      />
      <div className="flex justify-end gap-2">
        <button 
          type="button" 
          onClick={onCancel}
          className="text-xs px-3 py-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={content.trim().length < 5}
          className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Add Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;