import { Link } from 'react-router-dom';
import QuestionList from '../Components/questions/QuestionList';
import { dummyQuestions } from '../dummyData';

const HomePage = () => {
  // Show only the 3 most recent questions for the home page
  const recentQuestions = dummyQuestions.slice(0, 3);

  return (
    <div className="flex flex-col gap-12 w-full max-w-5xl mx-auto py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 p-12 rounded-2xl border border-blue-100 dark:border-gray-700">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Every developer has a tab open to <span className="text-blue-600 dark:text-blue-400">DevQ&A</span>.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A community-driven platform for asking questions, sharing knowledge, and building better software together.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/ask-question" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition">
            Ask a Question
          </Link>
          <Link to="/questions" className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 font-medium rounded-lg transition">
            Explore Questions
          </Link>
        </div>
      </div>

      {/* Recent Questions Preview */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Questions</h2>
          <Link to="/questions" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            View all
          </Link>
        </div>
        <QuestionList questions={recentQuestions} />
      </div>
    </div>
  );
};

export default HomePage;