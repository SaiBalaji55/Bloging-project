import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} DevQ&A. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms</Link>
          <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;