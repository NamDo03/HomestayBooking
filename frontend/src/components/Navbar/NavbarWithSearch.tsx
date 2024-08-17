import { useState } from "react";
import Logo from "./Logo";
import NavbarSearch from "./NavbarSearch";
import Menu from "./Menu";
import SearchModal from "./SearchModal";

const NavbarWithSearch = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <header className="fixed w-full z-[100] bg-white">
      <div className="flex justify-between items-center py-4 px-3 md:px-8 xl:px-20  border-b-[1px] border-b-slate-300 shadow-sm gap-2 sm:gap-0">
        <Logo />
        <NavbarSearch setShowModal={setShowModal} />
        <Menu />
      </div>
      {showModal && <SearchModal setShowModal={setShowModal} />}
    </header>
  );
};

export default NavbarWithSearch;
