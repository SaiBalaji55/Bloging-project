import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllUsers } from '../api/profileApi';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.users || data); // Adjust based on your API response structure
      } catch (err) {
        console.error(err);
        setError('Failed to load users.');
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            Users
          </h1>
        </div>

        {/* Loading and Error States */}
        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            Loading users...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl shadow-sm">
            {error}
          </div>
        ) : (
          /* Enhanced Grid Layout */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {users.map(user => (
              <Link 
                key={user._id} 
                to={`/users/${user._id}`}
                className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
              >
                {/* Gradient Avatar */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-200">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="text-base font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate transition-colors">
                    {user.username}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-0.5 flex items-center gap-1">
                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {user.location || 'Unknown location'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;