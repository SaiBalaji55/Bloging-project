import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '', password: '', name: '', email: '', age: '', phonenumber: '',
    location: '', isStudentorProfessional: 'Student', degree: '', collegeName: '',
    jobRole: '', companyname: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      await registerUser(formData);
      navigate('/login');
    } catch(error) {
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false);
    }
  }

  const isStudent = formData.isStudentorProfessional === 'Student';
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 dark:text-white outline-none shadow-sm";
  const labelClass = "block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 tracking-wide";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 py-12 w-full">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 sm:p-10 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Join DevQ&A</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Create an account to ask questions and share knowledge.</p>
        </div>
        
        {errorMsg && (
          <div className="w-full p-3.5 mb-6 text-sm font-medium text-red-700 bg-red-50 rounded-lg border border-red-200 text-center flex items-center justify-center gap-2">
             <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Basic Info */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="John Doe" />
            </div>
            <div>
              <label className={labelClass}>Username</label>
              <input type="text" name="username" required value={formData.username} onChange={handleChange} className={inputClass} placeholder="johndoe123" />
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="john@example.com" />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type="password" name="password" required value={formData.password} onChange={handleChange} className={inputClass} placeholder="••••••••" />
            </div>
            <div>
              <label className={labelClass}>Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleChange} className={inputClass} placeholder="25" />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="text" name="phonenumber" required value={formData.phonenumber} onChange={handleChange} className={inputClass} placeholder="+1 234 567 8900" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Location</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className={inputClass} placeholder="City, Country" />
            </div>

            {/* Role Selection */}
            <div className="md:col-span-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <label className={labelClass}>Are you a Student or Professional?</label>
              <select 
                name="isStudentorProfessional" 
                value={formData.isStudentorProfessional} 
                onChange={handleChange}
                className={`${inputClass} cursor-pointer`}
              >
                <option value="Student">Student</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            {/* Conditional Fields */}
            {isStudent ? (
              <>
                <div>
                  <label className={labelClass}>Degree</label>
                  <input type="text" name="degree" required={isStudent} value={formData.degree} onChange={handleChange} className={inputClass} placeholder="B.Sc. Computer Science" />
                </div>
                <div>
                  <label className={labelClass}>College Name</label>
                  <input type="text" name="collegeName" required={isStudent} value={formData.collegeName} onChange={handleChange} className={inputClass} placeholder="University Name" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className={labelClass}>Job Role</label>
                  <input type="text" name="jobRole" required={!isStudent} value={formData.jobRole} onChange={handleChange} className={inputClass} placeholder="Frontend Developer" />
                </div>
                <div>
                  <label className={labelClass}>Company Name</label>
                  <input type="text" name="companyname" required={!isStudent} value={formData.companyname} onChange={handleChange} className={inputClass} placeholder="Tech Corp" />
                </div>
              </>
            )}
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 hover:underline transition-all">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;