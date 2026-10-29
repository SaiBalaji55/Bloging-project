import { NavLink } from 'react-router-dom';

const Sidebar = ({ className = '', isOpen, onClose }) => {
  const navItems = [
    { name: 'Home', path: '/' },
    {name: 'Dashboard', path: '/dashboard'},
    { name: 'Questions', path: '/questions' },
    { name: 'Tags', path: '/tags' },
    { name: 'Users', path: '/users' },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out 
      z-50 md:z-20 md:relative md:translate-x-0 md:sticky md:top-[4rem] md:h-[calc(100vh-4rem)] flex flex-col ${className}
    `}>
      
      {/* Mobile-only header inside sidebar with close button */}
      <div className="flex md:hidden items-center justify-between mb-4 px-2 pt-2">
        <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">DevQ&A</span>
        <button type="button" onClick={onClose} className="p-2 text-gray-500 hover:text-red-500 focus:outline-none bg-gray-100 rounded-md dark:bg-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* FIX: Removed the buggy 'sticky' class from the nav since the whole aside is now perfectly sticky */}
      <nav className="flex flex-col gap-2 mt-4 md:mt-0">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;