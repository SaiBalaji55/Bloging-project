import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // 1. Import useSearchParams
import SearchBar from '../Components/questions/SearchBar.jsx';
import QuestionList from '../Components/questions/QuestionList';
import Pagination from '../Components/questions/Pagination';

import { fetchQuestions } from '../api/questionApi.js';

const QuestionsPage = () => {
  // 2. Read the search term directly from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Update the URL if the user searches using the middle search bar
  const handleLocalSearch = (query) => {
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchQuestions(searchQuery);
        setQuestions(data.questions || data);
        setError(null);
      } catch (err) {
        setError('Failed to load Questions. Is the Backend running?');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [searchQuery]); // 4. Refetches automatically when the URL changes

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            All Questions
          </h1>
          <Link 
            to="/ask-question" 
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors text-center"
          >
            Ask Question
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <SearchBar 
            initialValue={searchQuery} // 5. Pass the URL value into the SearchBar
            onSearch={handleLocalSearch} 
            placeholder="Search by title or tag..." 
          />
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            Loading questions...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl shadow-sm">
            {error}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <QuestionList questions={questions} emptyMessage="No questions found." />
          </div>
        )}

        {!isLoading && !error && (
          <div className="mt-2">
            <Pagination 
              currentPage={currentPage} 
              totalPages={1} 
              onPageChange={setCurrentPage} 
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default QuestionsPage;