import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-9xl font-extrabold text-gray-200 dark:text-gray-800">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Page not found</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been removed, renamed, or did not exist in the first place.
      </p>
      <Link 
        to="/" 
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;