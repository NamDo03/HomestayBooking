import { useEffect, useState } from "react";
import { getAllFavoritedList } from "../services/requestApi";
import useUserProfile from "../hooks/useUserProfile";
import { House } from "../config/type";
import HouseCard from "../components/Common/HouseCard";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton";

const FavoritedList = () => {
  const { userProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(true);
  const [hasResult, setHasResult] = useState<boolean>(true);
  const [favList, setFavList] = useState<House[]>([]);

  useEffect(() => {
    const getFavoritedList = async () => {
      try {
        if (!userProfile?.id) return;
        const response = await getAllFavoritedList(userProfile?.id);

        if (response.statusCode === 200) {
          if (response.houseList.length === 0) {
            console.log("Dont have any favorited houses");
            setHasResult(false);
            return;
          }
          setFavList(response.houseList);
          setHasResult(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 700);
      }
    };

    getFavoritedList();
  }, [userProfile?.id, favList]);

  if (loading) {
    return (
      <div className="px-3 md:px-8 xl:px-20 py-8">
        <div className="h-6 bg-zinc-200 rounded-full w-[20%] mb-3"></div>
        <LoadingSkeleton />
      </div>
    );
  }
  return (
    <div className="px-3 md:px-8 xl:px-20 py-8">
      <h1 className="text-blue-1 text-2xl font-semibold">
        Your Favorited List
      </h1>
      <div className="mt-5">
        {hasResult ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favList.map((fav) => (
              <HouseCard key={fav.id} house={fav} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 mt-6">
            <h1 className="text-2xl font-bold">No favorited found</h1>
            <span>Looks like you have no favorited on your list</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritedList;
