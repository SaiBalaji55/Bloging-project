const ProfileTabs = ({ activeTab, onTabChange, counts = {} }) => {
  const tabs = [
    { id: 'questions', label: 'Questions', count: counts.questions || 0 },
    { id: 'answers', label: 'Answers', count: counts.answers || 0 }
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          {tab.label}
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-0.5 px-2 rounded-full text-xs">
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;