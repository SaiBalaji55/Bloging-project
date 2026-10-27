import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../api/authApi';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    password : '',
    name: '',
    email: '',
    age: '',
    phonenumber: '',
    location: '',
    isStudentorProfessional: 'Student', // Default selection
    degree: '',
    collegeName: '',
    jobRole: '',
    companyname: ''
  })

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleRegister = async(e)=>{
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try{
      await registerUser(formData);
      navigate('/login');
    }catch(error){
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.")
    }
    finally{
      setIsLoading(false);
    }
  }

  const isStudent = formData.isStudentorProfessional === 'Student';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Join DevQ&A</h1>
        
        {errorMsg && (
          <div className="w-full p-3 mb-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input type="text" name="username" required value={formData.username} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <input type="text" name="phonenumber" required value={formData.phonenumber} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Role Selection */}
            <div className="md:col-span-2 mt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Are you a Student or Professional?</label>
              <select 
                name="isStudentorProfessional" 
                value={formData.isStudentorProfessional} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            {/* Conditional Fields based on Role */}
            {isStudent ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Degree</label>
                  <input type="text" name="degree" required={isStudent} value={formData.degree} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">College Name</label>
                  <input type="text" name="collegeName" required={isStudent} value={formData.collegeName} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Role</label>
                  <input type="text" name="jobRole" required={!isStudent} value={formData.jobRole} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                  <input type="text" name="companyname" required={!isStudent} value={formData.companyname} onChange={handleChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
                </div>
              </>
            )}
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition disabled:opacity-50">
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;