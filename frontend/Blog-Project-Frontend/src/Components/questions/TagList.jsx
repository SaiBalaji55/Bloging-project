import TagBadge from './TagBadge';

const TagList = ({ tags = [] }) => {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagBadge key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default TagList;
