import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

// Layout & Route Components
import Layout from './Components/layout/Layout';
import ProtectedRoute from './Components/layout/ProtectedRoute';

// Page Components
import HomePage from './Pages/HomePage';
import QuestionsPage from './Pages/QuestionsPage';
import QuestionDetailsPage from './Pages/QuestionDetailsPage';
import AskQuestionPage from './Pages/AskQuestionPage';
import EditQuestionPage from './Pages/EditQuestionPage';
import TagsPage from './Pages/TagsPage';
import TagQuestionsPage from './Pages/TagQuestionsPage';
import UserProfilePage from './Pages/UserProfilePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import NotFoundPage from './Pages/NotFoundPage';
import UsersPage from './Pages/UsersPage';
import DashboardPage from './Pages/DashboardPage';

function App() {
  return (
    // 1. AuthProvider wraps the app to provide global authentication state
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Auth Routes (Rendered without the main Sidebar/Navbar layout) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main Layout (Wraps these pages with Navbar, Sidebar, and Footer) */}
          <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage/>} />
            
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/questions/:id" element={<QuestionDetailsPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/tags/:tagName/questions" element={<TagQuestionsPage />} />
            <Route path="/users/:id" element={<UserProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
            
            {/* Protected Routes (Redirect to /login if not authenticated) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/ask-question" element={<AskQuestionPage />} />
              <Route path="/questions/:id/edit" element={<EditQuestionPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>

            {/* Catch-all 404 Route for unknown URLs */}
            <Route path="*" element={<NotFoundPage />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;