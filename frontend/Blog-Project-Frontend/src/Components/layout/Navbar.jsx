import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; 

const Navbar = ({ onMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth(); 

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(()=>{
    if(theme === 'dark'){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);


  const toggleTheme = () =>{
    setTheme(theme === 'light' ? 'dark' : 'light');
    setIsDropdownOpen(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/questions?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm min-h-[4rem] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-4">
        
        {/* Logo and Hamburger Button */}
        {/* Logo and Hamburger Button */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onMenuToggle} 
            className="md:hidden p-2 -ml-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 focus:outline-none rounded-md"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Round Logo and Gradient Q Text */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group mt-0.5">
            {/* Round Shape applied here */}
            <div className="h-9 w-9 rounded-full overflow-hidden shadow-sm transition-transform group-hover:scale-105 border border-gray-100 dark:border-gray-700">
              <img 
                src="/logo.png" 
                alt="Anqora" 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Text with styled Q */}
            <div className="flex flex-col justify-center leading-none">
              <div className="text-xl md:text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white uppercase font-sans">
                <span>AN</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-600">Q</span>
                <span>ORA</span>
              </div>
            </div>
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
            <div className="relative">
              
              {/* Profile Avatar Button */}
              <button 
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:ring-2 hover:ring-blue-500 transition focus:outline-none overflow-hidden"
              >
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.username} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-6 h-6 text-gray-500 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  <Link 
                    to={`/users/${user?._id}`} 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    View Profile
                  </Link>
                  <button 
                    type="button"
                    onClick={toggleTheme} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Toggle Theme ({theme === 'light' ? 'Dark' : 'Light'})
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
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