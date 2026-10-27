import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuestionList from '../Components/questions/QuestionList';
import { fetchQuestionsByTag } from '../api/profileApi';

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
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Questions tagged [{tagName}]
        </h1>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <QuestionList 
          questions={questions} 
          emptyMessage={`No questions found with the tag '${tagName}'.`} 
        />
      )}
    </div>
  );
};

export default TagQuestionsPage;