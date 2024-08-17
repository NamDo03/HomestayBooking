const LoadingCard = () => {
  return (
    <div className="col-span-1 animate-pulse">
      <div className="flex flex-col gap-5 w-full border-gray-200 rounded-lg p-2 shadow">
        <div className="w-full rounded-xl mb-4 bg-zinc-200 aspect-square"></div>
        <div className="h-2 bg-zinc-200 rounded-full"></div>
        <div className="h-2.5 bg-zinc-200 rounded-full w-[70%]"></div>
        <div className="h-2.5 bg-zinc-200 rounded-full w-[40%]"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
