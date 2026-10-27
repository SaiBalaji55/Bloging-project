import { Link } from 'react-router-dom';
import { fetchTags } from '../api/profileApi';
import { useState, useEffect } from 'react';


const TagsPage = () => {

  const [tags, setTags]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const loadTags = async()=>{
      try{
        const data = await fetchTags();
        setTags(data.tag || data);
      }
      catch(err){
        setError('Failed to load tags.');
        console.error(err);
      }
      finally{
        setIsLoading(false);
      }
    };
    loadTags();
  },[])

  return (
    <div className="max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tags</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        A tag is a keyword or label that categorizes your question with other, similar questions.
      </p>

      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Loading tags...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map(tag => (
            <div key={tag._id || tag.name} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
              <Link 
                to={`/tags/${tag.name || tag._id}/questions`}
                className="inline-block px-2.5 py-1 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 rounded transition-colors mb-3"
              >
                {tag.name || tag._id}
              </Link>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {tag.count || 0} questions
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsPage;