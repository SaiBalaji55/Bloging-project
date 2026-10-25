import { useAuth } from '../Context/AuthContext';
import { dummyUser } from '../dummyData';

const UserProfilePage = () => {
  // If viewing their own profile, use context. Otherwise, use dummyUser (in a real app, you'd fetch by ID)
  const { user } = useAuth()
  const profileUser = user || dummyUser;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-6 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm mb-8">
        <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-4xl font-bold">
          {profileUser.username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profileUser.username}</h1>
          <p className="text-gray-500 dark:text-gray-400">{profileUser.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Activity</h2>
      <div className="p-8 text-center text-gray-500 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        User activity (questions/answers) will be displayed here.
      </div>
    </div>
   
  );
}
export default UserProfilePage;