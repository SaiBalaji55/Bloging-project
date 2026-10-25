import { Outlet } from 'react-router-dom';
import Navbar from '../../Components/layout/Navbar.jsx';
import Sidebar from '../../Components/layout/Sidebar.jsx';
import Footer from '../../Components/layout/Footer.jsx';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <Sidebar className="hidden md:flex w-64 flex-shrink-0" />
        <main className="flex-1 p-4 md:p-6 w-full max-w-full overflow-hidden">
          {/* Outlet renders the current route's page component */}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;