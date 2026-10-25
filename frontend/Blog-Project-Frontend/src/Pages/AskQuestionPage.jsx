import { useNavigate } from 'react-router-dom';
import QuestionForm from '../Components/questions/QuestionForm';

const AskQuestionPage = () => {
  const navigate = useNavigate();

  const handleAsk = (formData) => {
    console.log("Submitting new question:", formData);
    alert("Question created! (Will be API call)");
    navigate('/questions');
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ask a public question</h1>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Writing a good question</h2>
        <ul className="list-disc pl-5 text-sm text-blue-800 dark:text-blue-400 space-y-1">
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Add code snippets and error logs if applicable.</li>
        </ul>
      </div>

      <QuestionForm onSubmit={handleAsk} />
    </div>
  );
};

export default AskQuestionPage;