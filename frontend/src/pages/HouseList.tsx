import { useLocation, useSearchParams } from "react-router-dom";
import Categories from "../components/HouseList/Categories";
import { useEffect, useState } from "react";
import { getAllHouses, searchHouse } from "../services/requestApi";
import Button from "../components/Common/Button";
import { House } from "../config/type";
import HouseCard from "../components/Common/HouseCard";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton";

const HouseList = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);

  const [houses, setHouses] = useState<House[]>([]);
  const [hasResult, setHasResult] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const keyword = searchParams.get("keyword") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const guestCount = searchParams.get("guestCount") || "";
  const bedroomCount = searchParams.get("bedroomCount") || "";
  const bathroomCount = searchParams.get("bathroomCount") || "";
  const category = searchParams.get("category") || "";

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("keyword");
    params.set("category", "all");
    setSearchParams(params);
    setPage(1);
    setHouses([]);
  };

  useEffect(() => {
    setHouses([]);
    setPage(1);
    setHasResult(true);
  }, [category]);

  useEffect(() => {
    const getHouses = async () => {
      if (loading) return;
      setLoading(true);
      try {
        let response;
        if (category.toLowerCase() === "all" || location.search === "") {
          response = await getAllHouses(page, 8);
        } else {
          response = await searchHouse(
            startDate,
            endDate,
            category.toLowerCase(),
            guestCount,
            bedroomCount,
            bathroomCount,
            keyword.toLowerCase(),
            page,
            8
          );
        }
        if (response.statusCode === 200) {
          if (response.houseList.length === 0) {
            if (page === 1) {
              setHasResult(false);
            }
          } else {
            setHouses((prev) => [...prev, ...response.houseList]);
            setHasResult(true);
            setTotalPage(response.totalPages);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    getHouses();
  }, [
    keyword,
    startDate,
    endDate,
    category,
    guestCount,
    location.pathname,
    page,
  ]);

  const handleScroll = () => {
    if (loading || page >= totalPage) return;
    const footerHeight = document.querySelector("footer")?.clientHeight || 0;
    const scrollThreshold =
      document.documentElement.scrollHeight - window.innerHeight - footerHeight;
    if (window.scrollY >= scrollThreshold) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPage]);

  return (
    <div className="px-3 md:px-8 xl:px-20 py-8">
      <Categories />
      <div className="mt-5">
        {loading && <LoadingSkeleton />}
        {!loading && hasResult && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {houses.map((house) => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
        )}

        {!loading && !hasResult && (
          <div className="flex flex-col justify-center items-center gap-4 mt-6">
            <h1 className="text-2xl font-bold">No exact matches</h1>
            <span>
              Try changing or removing some of your filters or adjusting your
              search area.
            </span>
            <Button content="Clear Filter" onClick={clearFilters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseList;
