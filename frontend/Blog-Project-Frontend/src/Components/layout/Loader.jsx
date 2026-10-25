const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      {text && <p className="mt-4 text-gray-500 text-sm font-medium">{text}</p>}
    </div>
  );
};

export default Loader;