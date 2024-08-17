
const LoadingDots = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-white h-screen">
      <div className="h-5 w-5 bg-main rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-5 w-5 bg-main rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-5 w-5 bg-main rounded-full animate-bounce"></div>
    </div>
  );
};

export default LoadingDots;
