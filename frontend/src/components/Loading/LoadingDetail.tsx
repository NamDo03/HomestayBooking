const LoadingDetail = () => {
  return (
    <div className="px-3 md:px-8 xl:px-44 py-8">
      <div className="h-6 bg-zinc-200 w-[40%]"></div>
      <div className="pt-6 grid grid-cols-2 gap-2 h-[55vh]">
        <div className="col-span-1 bg-zinc-200 rounded-l-xl"></div>
        <div className="col-span-1 grid grid-cols-2 gap-2 ">
          <div className="bg-zinc-200"></div>
          <div className="bg-zinc-200 rounded-tr-xl"></div>
          <div className="bg-zinc-200"></div>
          <div className="bg-zinc-200 rounded-br-lg"></div>
        </div>
      </div>
      <div className="py-8 flex flex-col gap-4">
        <div className="h-5 bg-zinc-200 w-[30%]"></div>
        <div className="h-4 bg-zinc-200 w-[20%]"></div>
      </div>
    </div>
  );
};

export default LoadingDetail;
