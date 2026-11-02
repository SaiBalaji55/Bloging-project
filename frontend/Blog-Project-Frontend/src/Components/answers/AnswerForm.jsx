import { useState, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const AnswerForm = ({ onSubmit, isSubmitting }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  // Custom toolbar matching the advanced layout
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const handleContentChange = (value) => {
    setContent(value);
    setError('');
  };

  // Get actual text length without HTML tags
  const getTextLength = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent.trim().length;
  };

  const currentLength = getTextLength(content);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate based on actual text length
    if (currentLength < 20) {
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
        <div className="bg-white dark:bg-gray-800 rounded mb-1">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={handleContentChange}
            modules={modules}
            placeholder="Write your solution here. Provide code examples where applicable..."
            className="text-gray-900 dark:text-white"
          />
        </div>
        <div className="text-xs text-right mt-1 text-gray-500">
          {currentLength} characters (min 20)
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting || currentLength < 20}
        className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {isSubmitting ? 'Posting Answer...' : 'Post Your Answer'}
      </button>
    </form>
  );
};

export default AnswerForm;