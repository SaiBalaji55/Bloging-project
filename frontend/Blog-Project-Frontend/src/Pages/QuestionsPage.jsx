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
    <div className="flex flex-col max-w-5xl mx-auto w-full gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          All Questions
        </h1>
        <Link 
          to="/ask-question" 
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors text-center"
        >
          Ask Question
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <SearchBar 
          onSearch={setSearchQuery} 
          placeholder="Search by title or tag..." 
        />
      </div> {/* <-- ADDED MISSING CLOSING TAG HERE */}

      {/* 4. Handle Loading, Error, and Success states */}
      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading questions...</div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 rounded">{error}</div>
      ) : (
        <QuestionList questions={questions} emptyMessage="No questions found." />
      )}

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={1} 
        onPageChange={setCurrentPage} 
      />
      
    </div>
  );
};

export default QuestionsPage;