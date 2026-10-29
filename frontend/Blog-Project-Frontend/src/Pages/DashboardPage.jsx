import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchDashboardStats } from '../api/profileApi'; // Adjust path if needed
import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa6";
import { BiSolidCommentDetail } from "react-icons/bi";
import { FaEye } from "react-icons/fa";

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Security Check: If not logged in, kick them to the login page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, [user]);

  if (!isAuthenticated) return null; // Prevents flashing before redirect

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 w-full">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">
            My Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back, {user?.username}. Here is a summary of your contributions.
          </p>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-gray-500 font-medium bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            Loading your stats...
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl shadow-sm">
            {error}
          </div>
        ) : (
          /* Stats Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Questions Card */}
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 text-xl"><FaFileCircleQuestion /></div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.questionsAsked || 0}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Questions Asked</div>
            </div>

            {/* Answers Card */}
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-xl"><FaLightbulb /></div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.answersPosted || 0}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Answers Posted</div>
            </div>

            {/* Comments Card */}
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 text-xl"><BiSolidCommentDetail /></div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.commentsPosted || 0}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Comments</div>
            </div>

            {/* Impact / Views Card */}
            <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 text-xl"><FaEye /></div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalViews || 0}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Total Impact (Views)</div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;