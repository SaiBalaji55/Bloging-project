import { Link } from 'react-router-dom';
import { fetchTags } from '../api/profileApi';
import { useState, useEffect } from 'react';

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTags = async () => {
      try {
        const data = await fetchTags();
        setTags(data.tag || data);
      } catch (err) {
        setError('Failed to load tags.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadTags();
  }, []);

  return (
    // Unified page background and spacing layout
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            Tags
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            A tag is a keyword or label that categorizes your question with other, similar questions. 
            Using the right tags makes it easier for others to find and answer your question.
          </p>
        </div>

        {/* Loading and Error States matching the Questions Page */}
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            Loading tags...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl shadow-sm">
            {error}
          </div>
        ) : (
          /* Enhanced Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {tags.map(tag => (
              <div 
                key={tag._id || tag.name} 
                className="flex flex-col justify-between p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
              >
                <div className="mb-5">
                  <Link 
                    to={`/tags/${tag.name || tag._id}/questions`}
                    // Same pill styling as QuestionCard tags
                    className="inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-600 bg-blue-50 border border-blue-100 rounded-md dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
                  >
                    {tag.name || tag._id}
                  </Link>
                </div>
                
                <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                  <span>{tag.count || 0} {tag.count === 1 ? 'question' : 'questions'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TagsPage;