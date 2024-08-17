import { useEffect, useState } from "react";
import { House } from "../config/type";
import useUserProfile from "../hooks/useUserProfile";
import { getUserProperties } from "../services/requestApi";
import HouseCard from "../components/Common/HouseCard";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton";

const PropertyList = () => {
  const { userProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(true);
  const [houseList, setHouseList] = useState<House[]>([]);
  useEffect(() => {
    const fetchUserProperties = async () => {
      setLoading(true);
      try {
        if (!userProfile?.id) return;
        const response = await getUserProperties(userProfile?.id);

        if (response.statusCode === 200) {
          if (response.houseList.length === 0) {
            console.log("Dont have any favorited houses");
            setHasResult(false);
            return;
          }
          setHouseList(response.houseList);
          setHasResult(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 700);
      }
    };

    fetchUserProperties();
  }, [userProfile?.id]);

  return (
    <div className="px-3 md:px-8 xl:px-20 py-8">
      {loading ? (
        <>
          <div className="h-6 bg-zinc-200 rounded-full w-[20%] mb-3"></div>
          <LoadingSkeleton />
        </>
      ) : (
        <>
          <h1 className="text-blue-1 text-2xl font-semibold">
            Your Property List
          </h1>
          <div className="mt-5">
            {hasResult ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {houseList.map((house) => (
                  <HouseCard key={house.id} house={house} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 mt-6">
                <h1 className="text-2xl font-bold">No properties found</h1>
                <span>Looks like you have no properties on your list</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
