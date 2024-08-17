import Button from "../Common/Button";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center relative py-10">
      <div className="absolute inset-0 bg-newsletter bg-cover bg-center brightness-75"></div>
      <div className="flex flex-col gap-5 items-center px-3 md:px-8 xl:px-20 py-8 relative z-10 text-white">
        <span className="font-semibold text-3xl">Save time, save money!</span>
        <span>Sign up and we will send the best deals to you</span>
        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Your Email"
            className="bg-white p-2 rounded-lg"
          />
          <Button content="Subcribe" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
