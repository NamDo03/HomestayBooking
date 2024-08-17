import Logo from "./Logo";
import Menu from "./Menu";

const Navbar = () => {
  return (
    <header className="fixed w-full z-[100] bg-white">
      <div className="flex justify-between items-center py-4 px-3 md:px-8 xl:px-20  border-b-[1px] border-b-slate-300 shadow-sm gap-2 sm:gap-0">
        <Logo />
        <Menu />
      </div>
    </header>
  );
};

export default Navbar;
