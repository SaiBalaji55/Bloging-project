import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/questions/SearchBar.jsx';
import QuestionList from '../Components/questions/QuestionList';
import Pagination from '../Components/questions/Pagination';

import { fetchQuestions } from '../api/questionApi.js';

const QuestionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchQuestions(searchQuery);
        console.log("Backend Response:", data)
        setQuestions(data.questions);
        setError(null);
      } catch (err) {
        setError('Failed to load Questions. Is the Backend running?');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [searchQuery]);

  return (
    // The overall page background uses a subtle gray to make the white cards pop
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      
      {/* Max width container keeps it from stretching too wide on huge monitors */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header Section */}
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

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search by title or tag..." 
          />
        </div>

        {/* Handle Loading, Error, and Success states */}
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

        {/* Pagination */}
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