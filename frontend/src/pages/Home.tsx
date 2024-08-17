import { useEffect, useState } from "react";
import Assurance from "../components/Home/Assurance";
import Featured from "../components/Home/Featured";
import Header from "../components/Home/Header";
import Newsletter from "../components/Home/Newsletter";
import LoadingDots from "../components/Loading/LoadingDots";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <LoadingDots />;
  }
  return (
    <div className=" min-h-screen flex flex-col gap-5 md:gap-20 ">
      <Header />
      <Featured />
      <Assurance />
      <Newsletter />
    </div>
  );
};

export default Home;
