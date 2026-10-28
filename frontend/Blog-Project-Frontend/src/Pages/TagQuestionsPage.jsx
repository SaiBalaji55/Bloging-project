import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestionList from '../Components/questions/QuestionList';
import { fetchQuestionsByTag } from '../api/questionApi';

const TagQuestionsPage = () => {
  const { tagName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTagQuestions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchQuestionsByTag(tagName);
        setQuestions(data.questions || data);
      } catch (err) {
        setError(`Failed to load questions for tag: ${tagName}`);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadTagQuestions();
  }, [tagName]);

  return (
    // Applied the enhanced background and spacing layout
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Questions tagged [{tagName}]
          </h1>
        </div>

        {/* Handle Loading, Error, and Success states beautifully */}
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
            <QuestionList 
              questions={questions} 
              emptyMessage={`No questions found with the tag '${tagName}'.`} 
            />
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TagQuestionsPage;