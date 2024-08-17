import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserOne from "../../assets/avatar.jpg";
import useUserProfile from "../../hooks/useUserProfile";
import { IoChevronDownSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import useClickOutside from "../../hooks/useClickOutside";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdown = useRef<any>(null);
  const { userProfile } = useUserProfile();
  useClickOutside(dropdown, () => setDropdownOpen(false));

  return (
    <div ref={dropdown} className="flex-grow flex justify-end">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black">
            {userProfile?.name}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>

        <div className="hidden sm:block">
          <IoChevronDownSharp size={20} />
        </div>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-16 flex w-[15.625rem] flex-col rounded-sm border border-stroke bg-white shadow-md`}
        >
          <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-main lg:text-base">
            <BiLogOut size={24} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
