import { Link } from "react-router-dom";
import { SidebarProps } from "../../config/type";
import DropdownUser from "./DropdownUser";
import { IoMdMenu } from "react-icons/io";
import { PiHouseBold } from "react-icons/pi";

const Header: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-1 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-[99999] block rounded-sm border border-stroke bg-white p-1.5 shadow-sm lg:hidden"
          >
            <IoMdMenu size={26} />
          </button>

          <Link to="/" className="flex items-center gap-1 cursor-pointer ml-4">
            <PiHouseBold color="#F34341" className="text-3xl lg:text-4xl" />
            <span className="font-bold text-lg lg:text-2xl">Homeey.</span>
          </Link>
        </div>

        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
