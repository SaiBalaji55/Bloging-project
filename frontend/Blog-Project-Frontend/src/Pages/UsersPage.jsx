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
    <div className="max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Users</h1>
      
      {isLoading ? (
        <div className="text-center text-gray-500 py-8">Loading users...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map(user => (
            <Link 
              key={user._id} 
              to={`/users/${user._id}`}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-xl font-bold shrink-0">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400 truncate">
                  {user.username}
                </div>
                <div className="text-xs text-gray-500 truncate">{user.location || 'Unknown location'}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPage;