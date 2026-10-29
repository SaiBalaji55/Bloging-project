import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; 

const Navbar = ({ onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth(); 

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    // FIX: Removed strict h-16, added min-h-[4rem] and py-2 to prevent logo cropping
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm min-h-[4rem] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-4">
        
        {/* Logo and Hamburger Button */}
        <div className="flex items-center gap-3">
          {/* FIX: Explicitly added type="button" and high z-index for clickability */}
          <button 
            type="button"
            onClick={onMenuToggle} 
            className="md:hidden p-2 -ml-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 focus:outline-none rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* FIX: Set leading-none and flex-shrink-0 so the text cannot slide up */}
          <Link to="/" className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 flex-shrink-0 leading-none tracking-tight pb-0.5">
            DevQ&A
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:block m-0">
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
              <Link to={`/users/${user?._id}`} className="text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600">
                {user?.username}
              </Link>
              <button 
                type="button"
                onClick={logout} 
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