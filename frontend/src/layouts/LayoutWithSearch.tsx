import React from "react";
import Footer from "../components/Common/Footer";
import NavbarWithSearch from "../components/Navbar/NavbarWithSearch";

type Props = {
  children: React.ReactNode;
};
const LayoutWithSearch: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWithSearch />
      <div className=" mt-20 min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutWithSearch;
