import { useState } from 'react';

const QuestionForm = ({ initialData = {}, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    questionType: initialData.questionType || 'How-to / Troubleshooting',
    questionTitle: initialData.questionTitle || '',
    questionDescription: initialData.questionDescription || '',
    tags: initialData.tags ? initialData.tags.join(', ') : '',
    postingDestination: initialData.postingDestination || 'staging_ground'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.questionTitle.length < 15 || formData.questionTitle.length > 150) {
      return setError('Title must be between 15 and 150 characters.');
    }
    // FIX: Updated Description validation to allow up to 5000 characters
    if (formData.questionDescription.length < 75 || formData.questionDescription.length > 5000) {
      return setError('Description must be between 75 and 5000 characters.');
    }

    const tagArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (!tagArray.length) {
      return setError('At least one tag is required.');
    }

    onSubmit({ ...formData, tags: tagArray });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      
      {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 rounded">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Question Type</label>
        <select name="questionType" value={formData.questionType} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500">
          <option value="How-to / Troubleshooting">How-to / Troubleshooting</option>
          <option value="Tooling recommendation">Tooling recommendation</option>
          <option value="Best practices">Best practices</option>
          <option value="General advice / Other">General advice / Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Title</label>
        <p className="text-xs text-gray-500 mb-2">Be specific and imagine you’re asking a question to another person. (15 - 150 chars)</p>
        <input 
          type="text" name="questionTitle" value={formData.questionTitle} onChange={handleChange} required
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-xs text-right mt-1 text-gray-500">{formData.questionTitle.length}/150</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Description</label>
        {/* FIX: Updated helper text to indicate 5000 max chars */}
        <p className="text-xs text-gray-500 mb-2">Include all the information someone would need to answer your question. (75 - 5000 chars)</p>
        <textarea 
          name="questionDescription" rows="8" value={formData.questionDescription} onChange={handleChange} required
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
        {/* FIX: Updated dynamic counter to display out of 5000 */}
        <div className="text-xs text-right mt-1 text-gray-500">{formData.questionDescription.length}/5000</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Tags</label>
        <p className="text-xs text-gray-500 mb-2">Add up to 5 tags to describe what your question is about. Separate with commas.</p>
        <input 
          type="text" name="tags" value={formData.tags} onChange={handleChange} required placeholder="react, nodejs, deployment"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">Destination</label>
        <select name="postingDestination" value={formData.postingDestination} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500">
          <option value="staging_ground">Staging Ground</option>
          <option value="public_feed">Public Feed</option>
        </select>
      </div>

      <button 
        type="submit" disabled={isSubmitting}
        className="mt-4 w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? 'Saving...' : (initialData._id ? 'Update Question' : 'Post Question')}
      </button>
    </form>
  );
};

export default QuestionForm;