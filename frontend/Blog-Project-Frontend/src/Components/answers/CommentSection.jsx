import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { 
  fetchQuestionComments, 
  fetchAnswerComments, 
  createQuestionComment, 
  createAnswerComment 
} from '../../api/commentApi'; 

const CommentSection = ({ targetId, type, initialComments }) => {
  const { isAuthenticated } = useAuth();
  
  // 1. Initialize state with initialComments (or empty array) ONCE when component mounts
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Always fetch directly from the backend on load
    const loadComments = async () => {
      try {
        if (type === 'question') {
          const data = await fetchQuestionComments(targetId);
          setComments(data.comments || data);
        } else if (type === 'answer') {
          const data = await fetchAnswerComments(targetId);
          setComments(data.comments || data);
        }
      } catch (error) {
        console.error(`Failed to load ${type} comments`, error);
      }
    };
    if (targetId) {
      loadComments();
    }
  }, [targetId, type]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      let addedComment;
      if (type === 'question') {
        addedComment = await createQuestionComment(targetId, newComment);
      } else if (type === 'answer') {
        addedComment = await createAnswerComment(targetId, newComment);
      }
      
      // Instantly add the new comment to the UI
      setComments([...comments, addedComment.comment || addedComment]);
      setNewComment(''); 
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add comment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="space-y-3 mb-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
        {comments.map((c, index) => (
          <div key={c._id || index} className="text-sm text-gray-700 dark:text-gray-300">
            {c.content}{' '}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              – {c.userId?.username || "User"}
            </span>
          </div>
        ))}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input 
            type="text" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..." 
            className="flex-1 text-sm p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            disabled={isSubmitting || !newComment.trim()}
            className="px-3 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 rounded disabled:opacity-50 transition"
          >
            {isSubmitting ? '...' : 'Comment'}
          </button>
        </form>
      ) : (
        <div className="text-xs text-gray-500">Log in to add a comment.</div>
      )}
    </div>
  );
};

export default CommentSection;