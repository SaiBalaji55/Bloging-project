import { useParams, useNavigate } from 'react-router-dom';
import QuestionForm from '../Components/questions/QuestionForm';
import { fetchQuestionById, updateQuestion } from '../api/questionApi';
import { useState } from 'react';
import { useEffect } from 'react';

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(()=>{
    const loadQuestion = async()=>{
      try{
        const data = await fetchQuestionById(id);
        setQuestion(data.question || data);
      }
      catch(err){
        setErrorMsg('Failed to load question for editing.');
        console.error(err);
      }
      finally{
        setIsLoading(false);
      }
    };
    loadQuestion();
  },[id])

  const handleUpdate = async (formData) => {
    setErrorMsg('');
    try{
      await updateQuestion(id, formData);
      navigate(`/questions/${id}`);
    }
    catch(error){
      console.error("Failed to update question:", error);
      setErrorMsg(error.response?.data?.message || "Failed to update question.")
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading question data...</div>;
  if (!question) return <div className="p-8 text-center text-red-500">{errorMsg || "Question not found."}</div>

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit question</h1>
      {errorMsg && (
        <div className="p-3 mb-6 text-sm text-red-600 bg-red-50 rounded border border-red-200">
          {errorMsg}
        </div>
      )}
      <QuestionForm initialData={question} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditQuestionPage;