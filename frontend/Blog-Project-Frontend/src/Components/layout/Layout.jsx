import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';   // Check these imports match your folder structure
import Sidebar from './Sidebar.jsx'; 
import Footer from './Footer.jsx';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Safely toggle and close the menu
  const toggleMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* 1. Pass the toggle function to the Navbar */}
      <Navbar onMenuToggle={toggleMenu} />
      
      <div className="flex flex-1 w-full max-w-7xl mx-auto relative flex-row">
        
        {/* Mobile Overlay Background - darkens screen and closes menu when tapped */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
          ></div>
        )}

        {/* 2. Pass the open state to the Sidebar */}
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          onClose={closeMenu} 
        />
        
        <main className="flex-1 p-4 md:p-6 w-full max-w-full overflow-x-hidden">
          <Outlet />
        </main>

      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;