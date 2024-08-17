import React, { useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SidebarProps } from "../../config/type";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import useClickOutside from "../../hooks/useClickOutside";
import { PiHouseBold } from "react-icons/pi";
import { GoArrowLeft } from "react-icons/go";

const SideBar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const sidebar = useRef<any>(null);

  useClickOutside(sidebar, () => setSidebarOpen(false));

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[9999] flex h-screen w-[18.125rem] flex-col overflow-y-hidden bg-darkblue text-white duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <Link to="/" className="flex items-center gap-1 cursor-pointer ml-4">
          <PiHouseBold color="#F34341" className="text-3xl lg:text-4xl" />
          <span className="font-bold text-lg lg:text-2xl">Homeey.</span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <GoArrowLeft size={30}/>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/admin/houses"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    pathname.includes("admin/houses") && "bg-graydark"
                  }`}
                >
                  <HiOutlineHomeModern size={24} />
                  Houses
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/admin/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
                    pathname.includes("admin/users") && "bg-graydark"
                  }`}
                >
                  <FaRegUser size={24} />
                  Users
                </NavLink>
              </li>

    
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SideBar;
