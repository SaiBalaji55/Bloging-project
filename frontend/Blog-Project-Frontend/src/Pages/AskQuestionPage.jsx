import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionForm from '../Components/questions/QuestionForm';
import { createQuestion } from '../api/questionApi';

const AskQuestionPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleAsk = async(formData) => {
    setErrorMsg('');
    try{
      await createQuestion(formData);
      navigate('/questions');
    }
    catch(error){
      console.log("Failed to post question:", error);
      setErrorMsg(error.response?.data?.message || "Failed to post question. Please try again.")
    }
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

      {errorMsg && (
        <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {errorMsg}
        </div>
      )}

      <QuestionForm onSubmit={handleAsk} />
    </div>
  );
};

export default AskQuestionPage;