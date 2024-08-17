import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { House } from "../../config/type";
import { getFeaturedHouse } from "../../services/requestApi";
import Button from "../Common/Button";
import HouseCard from "../Common/HouseCard";

const Featured = () => {
  const navigate = useNavigate();
  const startDate: Date = new Date();
  const endDate: Date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const [houses, setHouses] = useState<House[]>([]);

  useEffect(() => {
    const getHouses = async () => {
      try {
        const response = await getFeaturedHouse();
        if (response.statusCode === 200) {
          if (response.houseList.length === 0) {
            console.log("Dont have any houses");
            return;
          }
          setHouses(response.houseList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getHouses();
  }, []);

  const viewAll = () => {
    navigate(
      `/houses?startDate=${format(startDate, "yyyy/MM/dd")}&endDate=${format(
        endDate,
        "yyyy/MM/dd"
      )}&guestCount=1&bedroomCount=1&bathroomCount=1&category=all`
    );
  };

  return (
    <div className="px-3 md:px-8 xl:px-20 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-3">
        <div className="">
          <h1 className="md:text-2xl text-xl font-bold">Special Offers</h1>
          <span className="text-sm md:text-base">
            Villas can be a perfect place for you to spend the most
            unforgettable vacation!
          </span>
        </div>
        <div className="place-self-end">
          <Button onClick={viewAll} content="View All" />
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
