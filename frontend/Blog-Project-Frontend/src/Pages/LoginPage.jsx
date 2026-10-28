import { useState } from 'react';

const Login = ({ onSubmit, isLoading }) => {
  // Reverted back to username
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 tracking-wide">
          Username
        </label>
        <input 
          type="text" 
          required 
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 dark:text-white outline-none shadow-sm" 
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 tracking-wide">
          Password
        </label>
        <input 
          type="password" 
          required 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 dark:text-white outline-none shadow-sm" 
          placeholder="••••••••"
        />
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-3 px-4 mt-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-sm transition-all duration-200"
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default Login;