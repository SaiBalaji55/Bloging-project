import { useParams } from 'react-router-dom';
import QuestionList from '../Components/questions/QuestionList';
import { dummyQuestions } from '../dummyData';

const TagQuestionsPage = () => {
  const { tagName } = useParams();

  // Filter dummy questions by the exact tag in the URL
  const tagQuestions = dummyQuestions.filter(q => 
    q.tags.includes(tagName.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Questions tagged [{tagName}]
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tagQuestions.length} {tagQuestions.length === 1 ? 'question' : 'questions'}
        </p>
      </div>

      <QuestionList 
        questions={tagQuestions} 
        emptyMessage={`No questions found with the tag '${tagName}'.`} 
      />
    </div>
  );
};

export default TagQuestionsPage;