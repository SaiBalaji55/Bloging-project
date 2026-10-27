import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionDetails from '../Components/questions/QuestionDetails';
import AnswerList from '../Components/answers/AnswerList';
import AnswerForm from '../Components/answers/AnswerForm';
// 1. Import the voteQuestion API
import { fetchQuestionById, deleteQuestion, voteQuestion } from '../api/questionApi';
// 2. Import the voteAnswer and acceptAnswer APIs
import { fetchAnswers, createAnswer, voteAnswer, acceptAnswer, deleteAnswer } from '../api/answerApi';
import { useAuth } from '../Context/AuthContext';

const QuestionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadThread = async () => {
      setIsLoading(true);
      try {
        const [questionData, answersData] = await Promise.all([
          fetchQuestionById(id),
          fetchAnswers(id)
        ]);
        setQuestion(questionData.question || questionData);
        setAnswers(answersData.answers || answersData);
      } catch (err) {
        console.error(err);
        setError("Failed to load question details.");
      } finally {
        setIsLoading(false);
      }
    };
    loadThread();
  }, [id]);

  const handleEdit = () => navigate(`/questions/${id}/edit`);
  
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteQuestion(id);
      navigate('/questions');
    } catch (err) {
      console.error(err)
      alert("Failed to delete question.");
    }
  };

  const handleAnswerSubmit = async (formData) => {
    try {
      const newAnswer = await createAnswer(id, formData);
      setAnswers([...answers, newAnswer.answer || newAnswer]); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post answer.");
    }
  };

  // --- NEW: Voting and Accepting Logic ---

  const handleQuestionVote = async (...args) => {
    if (!isAuthenticated) return alert("You must be logged in to vote.");
    const voteValue = args.length > 1 ? args[1] : args[0];
    try {
      // 1. Submit the vote
      await voteQuestion(id, voteValue);
      
      // 2. Fetch the full, fresh question data again so we don't lose the content
      const freshData = await fetchQuestionById(id);
      setQuestion(freshData.question || freshData); 
    } catch (err) {
      alert(err.response?.data?.message || "Failed to vote.");
    }
  };

  const handleAnswerVote = async (answerId, value) => {
    if (!isAuthenticated) return alert("You must be logged in to vote.");
    try {
      // 1. Submit the vote
      await voteAnswer(answerId, value);
      
      // 2. Fetch the fresh list of answers to safely update the UI
      const freshData = await fetchAnswers(id);
      setAnswers(freshData.answers || freshData);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to vote.");
    }
  };

  const handleAcceptAnswer = async (answerId) => {
    try {
      await acceptAnswer(answerId);
      // Update the UI: set isAccepted to true for this answer, and false for all others
      setAnswers(answers.map(ans => 
        ans._id === answerId ? { ...ans, isAccepted: true } : { ...ans, isAccepted: false }
      ));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to accept answer.");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm("Are you sure you want to delete this answer?")) return;
    try {
      await deleteAnswer(answerId);
      // Remove the deleted answer from the screen
      setAnswers(answers.filter(ans => ans._id !== answerId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete answer.");
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading thread...</div>;
  if (error || !question) return <div className="p-8 text-center text-red-500">{error || "Question not found"}</div>;

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
      
      <QuestionDetails 
        question={question}
        currentUserId={user?._id}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onVote={handleQuestionVote} // <-- Now connected
      />

      <div className="pt-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {answers.length} Answers
        </h2>
        
        <AnswerList 
          answers={answers}
          currentUserId={user?._id}
          questionOwnerId={question.userId?._id} // Required to show the "Accept" button only to the owner
          onVote={handleAnswerVote} // <-- Now connected
          onAccept={handleAcceptAnswer} // <-- Now connected
          onDelete={handleDeleteAnswer} // <-- Now connected
        />
      </div>

      <div className="pt-8 mt-4 border-t border-gray-200 dark:border-gray-700">
        {isAuthenticated ? (
          <AnswerForm onSubmit={handleAnswerSubmit} />
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Want to answer this question?</h3>
            <p className="text-gray-500 mb-4">You must be logged in to post an answer.</p>
            <button onClick={() => navigate('/login')} className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Log In to Answer
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default QuestionDetailsPage;