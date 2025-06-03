const ChatItemLoader = () => {
  return (
    <div className="flex justify-between w-full gap-4 animate-pulse">
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full" />
        <div className="flex flex-col gap-y-1">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-32" />
          <div className="flex items-center gap-1">
            <div className="h-3 bg-gray-200 rounded w-10" />
            <div className="h-3 bg-gray-200 rounded w-1" />
            <div className="h-3 bg-gray-200 rounded w-10" />
          </div>
        </div>
      </div>

      <div className="flex items-end">
        <div className="w-5 h-5 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default ChatItemLoader;
