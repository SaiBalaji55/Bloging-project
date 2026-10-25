import { useParams, useNavigate } from 'react-router-dom';
import QuestionForm from '../Components/questions/QuestionForm';
import { dummyQuestions } from '../dummyData';

const EditQuestionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const question = dummyQuestions.find(q => q._id === id);

  const handleUpdate = (formData) => {
    console.log("Updating question:", formData);
    alert("Question updated! (Will be API call)");
    navigate(`/questions/${id}`);
  };

  if (!question) {
    return <div className="p-8 text-center text-red-500">Question not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Edit question</h1>
      <QuestionForm initialData={question} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditQuestionPage;