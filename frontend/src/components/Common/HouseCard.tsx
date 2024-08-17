import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { House } from "../../config/type";
import {
  favoriteHouse,
  isHouseFavoritedByUser,
  removeFavoriteHouse,
} from "../../services/requestApi";
import Button from "./Button";
import useUserProfile from "../../hooks/useUserProfile";
import { useEffect, useState } from "react";

type HouseCardProps = {
  house: House;
  reservationId?: number;
  checkIn?: Date;
  checkOut?: Date;
  totalPrice?: number;
  onCancel?: () => void;
};
const HouseCard: React.FC<HouseCardProps> = ({
  house,
  reservationId,
  checkIn,
  checkOut,
  totalPrice,
  onCancel,
}) => {
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    const getFavoritedList = async () => {
      try {
        if (!userProfile?.id) return;
        const response = await isHouseFavoritedByUser(
          userProfile?.id,
          house.id
        );
        if (response.statusCode === 200) {
          setIsFavorited(response.favorited);
        } else {
          console.log("Failed to fetch favorited list:", response.error);
        }
      } catch (error) {
        console.error("Error fetching favorited list:", error);
      }
    };

    getFavoritedList();
  }, [house.id, userProfile?.id]);

  const handleCardClick = () => {
    navigate(`/house/${house.id}`);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  const toggleFavorite = async () => {
    if (!userProfile?.id) {
      navigate("/login");
      return;
    }
    try {
      if (isFavorited) {
        const response = await removeFavoriteHouse(userProfile.id, house.id);
        if (response.statusCode === 200) {
          toast.success("Removed from Favorites!");
          setIsFavorited(false);
        } else {
          toast.error("Remove from Favorites failed!");
        }
      } else {
        const response = await favoriteHouse(userProfile.id, house.id);
        if (response.statusCode === 200) {
          toast.success("Added to Favorites!");
          setIsFavorited(true);
        } else {
          toast.error("Add to Favorites failed!");
        }
      }
    } catch (error) {
      toast.error("Favorite House action failed!");
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="col-span-1 ">
      <div className="flex flex-col gap-2 w-full cursor-pointer hover:shadow-[0_3px_10px_2px_rgba(0,0,0,0.2)] rounded-lg p-2">
        <div className=" aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            onClick={handleCardClick}
            src={house.housePhotoUrls[0]}
            alt={house.houseName}
            className=" object-cover h-full w-full transition"
          />
          <div className=" absolute top-3 right-3">
            <div
              onClick={toggleFavorite}
              className="relative hover:opacity-80 hover:scale-110 transitino cursor-pointer"
            >
              <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
              />
              <AiFillHeart
                size={24}
                className={
                  isFavorited ? "fill-rose-500" : "fill-neutral-500/70"
                }
              />
            </div>
          </div>
        </div>

        <div onClick={handleCardClick} className="font-semibold text-xl">
          {house.city}, {house.province}
        </div>
        <div onClick={handleCardClick} className="font-light text-neutral-500">
          {reservationId && checkIn && checkOut
            ? `${checkIn} - ${checkOut}`
            : house.houseType}
        </div>
        <div
          onClick={handleCardClick}
          className="flex flex-row items-center gap-1"
        >
          <div className="font-semibold">
            $ {reservationId && totalPrice ? totalPrice : house.housePrice}
          </div>
          {!reservationId && <div className="font-light"> / night</div>}
        </div>
      </div>
      {reservationId && (
        <Button wfull content="Cancel reservation" onClick={handleCancel} />
      )}
    </div>
  );
};

export default HouseCard;
