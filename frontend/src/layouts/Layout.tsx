import React, { useEffect, useState } from "react";
import Footer from "../components/Common/Footer";
import NavbarWithSearch from "../components/Navbar/NavbarWithSearch";
import Navbar from "../components/Navbar/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {isSmallScreen ? <NavbarWithSearch /> : <Navbar />}
      <div className=" mt-20">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
