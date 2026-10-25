import { useParams, useNavigate } from 'react-router-dom';
import QuestionDetails from '../Components/questions/QuestionDetails';
import AnswerList from '../Components/answers/AnswerList';
import AnswerForm from '../Components/answers/AnswerForm';
import { dummyQuestions } from '../dummyData';
import { useAuth } from '../Context/AuthContext';

const QuestionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const question = dummyQuestions.find(q => q._id === id);

  // --- MOCK ANSWERS DATA (Since we don't have an API yet) ---
  const mockAnswers = [
    {
      _id: 'a1',
      content: 'You need to make sure your tailwind.config.js includes the paths to all your template files. Add this to your content array: \n\n content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]',
      userId: { _id: 'u3', username: 'react_master' },
      // eslint-disable-next-line react-hooks/purity
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      voteScore: 5,
      userVote: 1,
      isAccepted: true,
      comments: [
        { _id: 'c1', content: 'This fixed it, thank you!', userId: { username: 'frontend_ninja' }, createdAt: new Date().toISOString() }
      ]
    }
  ];

  // Handlers for Question Actions
  const handleEdit = () => navigate(`/questions/${id}/edit`);
  const handleDelete = () => {
    alert("Delete clicked!");
    navigate('/questions');
  };
  const handleVote = (value) => console.log(`Voted on question: ${value}`);

  // Handlers for Answer Actions
  const handleAnswerSubmit = (formData) => {
    console.log("Submitting new answer:", formData);
    alert("Answer posted! (This will be an API call later)");
  };
  const handleAnswerVote = (answerId, value) => console.log(`Voted on answer ${answerId}: ${value}`);
  const handleAnswerAccept = (answerId) => console.log(`Accepted answer ${answerId}`);
  const handleAnswerDelete = (answerId) => console.log(`Deleted answer ${answerId}`);

  if (!question) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Question not found</h2>
        <button onClick={() => navigate('/questions')} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
          Back to Questions
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
      
      {/* 1. The Main Question */}
      <QuestionDetails 
        question={question}
        currentUserId={user?._id}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onVote={handleVote}
      />

      {/* 2. The Answers Feed */}
      <div className="pt-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          {mockAnswers.length} Answers
        </h2>
        
        <AnswerList 
          answers={mockAnswers}
          currentUserId={user?._id}
          questionOwnerId={question.userId?._id}
          onVote={handleAnswerVote}
          onAccept={handleAnswerAccept}
          onDelete={handleAnswerDelete}
        />
      </div>

      {/* 3. The Answer Form (Only show if logged in) */}
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