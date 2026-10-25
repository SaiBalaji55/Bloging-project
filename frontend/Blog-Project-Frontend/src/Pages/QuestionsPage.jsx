import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/questions/SearchBar.jsx';
import QuestionList from '../Components/questions/QuestionList';
import Pagination from '../Components/questions/Pagination';
import { dummyQuestions } from '../dummyData';

const QuestionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock search filtering based on dummy data
  const filteredQuestions = dummyQuestions.filter(q => 
    q.questionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="w-full md:w-2/3">
          <SearchBar 
            onSearch={setSearchQuery} 
            placeholder="Search by title or tag..." 
          />
        </div>
        <div className="w-full md:w-auto text-sm text-gray-500 dark:text-gray-400 font-medium">
          {filteredQuestions.length} questions
        </div>
      </div>

      {/* Questions Feed */}
      <QuestionList 
        questions={filteredQuestions} 
        emptyMessage="No questions match your search criteria." 
      />

      {/* Pagination (Mocked to 1 page for now) */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={1} 
        onPageChange={setCurrentPage} 
      />
      
    </div>
  );
};

export default QuestionsPage;