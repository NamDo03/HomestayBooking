import { Link } from "react-router-dom";
import { PiHouseBold } from "react-icons/pi";
const Logo = () => {
  return (
    <Link to="/" className="hidden md:flex items-center gap-1 cursor-pointer">
      <PiHouseBold color="#F34341" className="text-3xl lg:text-4xl" />
      <span className="font-bold text-lg lg:text-2xl">Homeey.</span>
    </Link>
  );
};

export default Logo;
