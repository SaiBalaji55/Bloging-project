import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import Login from '../Components/auth_profile/Login'; // Import the form component

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  // This function is triggered when the Login component submits its form
  const handleLoginSubmit = async (formData) => {
    setErrorMsg('')
    console.log("User trying to log in with:", formData.username);
    
    // 1. Call the mock login function from AuthContext
    const result = await login(formData);
    
    // 2. Redirect the user back to the home page
    if(result.success){
    navigate('/'); 
    }
    else {
      // 2. Set the error message if login fails
      setErrorMsg(result.error || "Invalid login credentials"); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex flex-col items-center">
        
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back to DevQ&A
        </h1>

        {errorMsg && (
          <div className="w-full p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 text-center">
            {errorMsg}
          </div>
        )}
        
        {/* Render the reusable form component here */}
        <Login onSubmit={handleLoginSubmit} isLoading={false} />

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;