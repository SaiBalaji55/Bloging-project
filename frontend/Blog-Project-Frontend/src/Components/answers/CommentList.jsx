import { useState } from 'react';
import CommentForm from './CommentForm';
import { useAuth } from '../../Context/AuthContext';

const CommentList = ({ comments = [], itemId, itemType }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddComment = (content) => {
    console.log(`Adding comment to ${itemType} ${itemId}:`, content);
    // Add API call here
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col text-sm border-t border-gray-100 dark:border-gray-800 mt-4">
      {comments.map((comment, index) => (
        <div key={comment._id || index} className="py-2 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
          <span>{comment.content}</span>
          <span className="mx-2 text-gray-400">–</span>
          <span className="font-medium text-blue-600 dark:text-blue-400">{comment.userId?.username}</span>
          <span className="mx-2 text-gray-400 text-xs">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}

      {isAuthenticated && !isAdding && (
        <button 
          onClick={() => setIsAdding(true)}
          className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium text-left self-start opacity-70 hover:opacity-100"
        >
          Add a comment
        </button>
      )}

      {isAdding && (
        <CommentForm 
          onSubmit={handleAddComment} 
          onCancel={() => setIsAdding(false)} 
        />
      )}
    </div>
  );
};

export default CommentList;