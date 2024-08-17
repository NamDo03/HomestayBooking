import { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import MenuItem from "./MenuItem";
import useClickOutside from "../../hooks/useClickOutside";
import { isAdmin, isAuthenticated, logout } from "../../services/requestApi";
import useUserProfile from "../../hooks/useUserProfile";

const Menu = () => {
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setIsOpen(false));

  const isAuth: boolean = isAuthenticated();
  const isAdminAccount: boolean = isAdmin();

  const { userProfile } = useUserProfile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    window.location.reload();
    logout();
  };
  return (
    <div ref={menuRef} className="relative">
      <div
        onClick={toggleOpen}
        className=" p-4 md:py-2 md:px-4 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <FiMenu size={22} color="#6a6a6a" />
        <BsPersonCircle size={28} color="#6a6a6a" className="hidden md:block" />
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md min-w-[120%] w-fit bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!isAuth && (
              <>
                <MenuItem label="Login" path="/login" />
                <MenuItem label="Register" path="/register" />
              </>
            )}
            {isAuth && (
              <>
                <div className="px-4 py-3 border-b border-neutral-300">
                  {userProfile?.name}
                </div>
                <MenuItem label="Host" path="/create-house" />
                <MenuItem label="Favorited" path="/favorited" />
                <MenuItem label="Reservations" path="/reservations" />
                <MenuItem label="Properties" path="/properties" />
              </>
            )}
            {isAdminAccount && <MenuItem label="Admin" path="/admin/houses" />}
            {isAuth && (
              <MenuItem label="Logout" path="/" onClick={handleLogout} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
