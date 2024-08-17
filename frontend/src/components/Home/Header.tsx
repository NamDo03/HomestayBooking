import HomeSearch from "./HomeSearch";

const Header = () => {
  return (
    <div className="relative bg-banner-pattern h-[60vh] bg-center bg-cover bg-no-repeat flex justify-center items-center bg-fixed ">
      <div className="text-center text-white">
        <h1 className=" font-bold text-4xl">
          Plan your trip with <span className="text-main">Homeey</span>
        </h1>
        <p className="max-w-[70%] text-lg py-4 text-center m-auto">
          Travel to your favourite city with respect for the environment.
        </p>
      </div>
      <HomeSearch />
    </div>
  );
};

export default Header;
