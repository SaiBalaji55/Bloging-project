import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // Import the AuthContext

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Pull the real state and functions from your AuthContext
  const { user, isAuthenticated, logout } = useAuth(); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
          DevQ&A
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Navigate to the user's specific profile page */}
              <Link to={`/users/${user?._id}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600">
                {user?.username}
              </Link>
              <button 
                onClick={logout} // Connect the logout function
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 dark:text-white dark:bg-gray-700 rounded-md transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition">
                Log in
              </Link>
              <Link to="/register" className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition hidden sm:block">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;