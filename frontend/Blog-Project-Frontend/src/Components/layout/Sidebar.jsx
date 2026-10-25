import { NavLink } from 'react-router-dom';

const Sidebar = ({ className = '' }) => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Questions', path: '/questions' },
    { name: 'Tags', path: '/tags' },
    { name: 'Users', path: '/users' },
  ];

  return (
    <aside className={`flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)] p-4 ${className}`}>
      <nav className="flex flex-col gap-2 sticky top-20">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
          Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium dark:bg-blue-900/50 dark:text-blue-400'
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