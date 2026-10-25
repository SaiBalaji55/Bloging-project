import { Link } from 'react-router-dom';

const TagBadge = ({ tag }) => {
  return (
    <Link
      to={`/tags/${tag}/questions`}
      className="inline-block px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900/40 dark:hover:bg-blue-900/60 rounded transition-colors"
    >
      {tag}
    </Link>
  );
};

export default TagBadge;