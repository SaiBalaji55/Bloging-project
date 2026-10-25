import QuestionCard from './QuestionCard';

const QuestionList = ({ questions = [], emptyMessage = "No questions found." }) => {
  if (!questions.length) {
    return <div className="p-8 text-center text-gray-500 bg-white dark:bg-gray-900 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700">{emptyMessage}</div>;
  }

  return (
    <div className="flex flex-col border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
      {questions.map(question => (
        <QuestionCard key={question._id} question={question} />
      ))}
    </div>
  );
};

export default QuestionList;