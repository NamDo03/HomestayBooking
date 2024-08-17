import { useEffect, useState } from "react";
import { BookHouse, House } from "../config/type";
import { useNavigate, useParams } from "react-router-dom";
import {
  bookHouse,
  getBookedDatesByHouseId,
  getHouseById,
  isAuthenticated,
} from "../services/requestApi";
import Button from "../components/Common/Button";
import { amenities } from "../config/houseOptions";
import { IconType } from "react-icons";
import { DateRange } from "react-date-range";
import { addDays, format } from "date-fns";
import { FaRegHeart } from "react-icons/fa";
import avatar from "../assets/avatar.jpg";
import toast from "react-hot-toast";
import useUserProfile from "../hooks/useUserProfile";
import LoadingDetail from "../components/Loading/LoadingDetail";

const HouseDetail = () => {
  const { userProfile } = useUserProfile();

  const isAuth = isAuthenticated();
  const navigate = useNavigate();
  const { houseId } = useParams<{ houseId: string }>();

  const [loading, setLoading] = useState<boolean>(false);

  const [house, setHouse] = useState<House | null>(null);
  const [host, setHost] = useState<any>(null);

  const [hasResult, setHasResult] = useState<boolean>(false);

  const [date, setDate] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  useEffect(() => {
    const getHouseDetail = async () => {
      if (!houseId) return;
      setLoading(true);
      try {
        const response = await getHouseById(houseId);
        if (response.statusCode === 200) {
          if (response.house.length === 0) {
            console.log("Dont have house with id " + houseId);
            setHasResult(false);
            return;
          }
          setHouse(response.house);
          setHost(response.user);
          setHasResult(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setLoading(false), 700);
      }
    };
    if (houseId) {
      getHouseDetail();
    }
  }, [houseId]);

  const handleBooking = async () => {
    if (!isAuth) {
      navigate("/login");
      return;
    }

    if (!houseId || !house || !userProfile || !userProfile.id) return;
    const bookedHouse: BookHouse = {
      checkInDate: format(date[0].startDate, "yyyy-MM-dd"),
      checkOutDate: format(date[0].endDate, "yyyy-MM-dd"),
      totalPrice: (house.housePrice ?? 0) * dayCount,
    };

    try {
      const response = await bookHouse(houseId, userProfile?.id, bookedHouse);
      if (response.statusCode === 200) {
        toast.success("Book House Success!");
        navigate("/");
      } else {
        toast.error("This house has been booked.");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      toast.error("Book House Failed!");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!houseId) return;
      const dates = await getBookedDatesByHouseId(houseId);
      setDisabledDates(dates.map((date: string) => new Date(date)));
    };

    fetchBookedDates();
  }, [houseId]);

  const start = new Date(date[0].startDate);
  const end = new Date(date[0].endDate);
  const dayCount =
    Math.round(end.valueOf() - start.valueOf()) / (1000 * 60 * 60 * 24);

  if (loading) {
    return <LoadingDetail />;
  }
  return (
    <div className="px-3 md:px-8 xl:px-44 py-8">
      {hasResult ? (
        <div className="">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{house?.houseName}</h1>
            <FaRegHeart className=" cursor-pointer" size={22} />
          </div>

          <div className="pt-6 grid grid-cols-2 gap-2">
            {house?.housePhotoUrls && (
              <div className="col-span-1">
                <img
                  src={house?.housePhotoUrls[0]}
                  alt="house photo"
                  className="w-full h-full object-cover rounded-l-xl"
                />
              </div>
            )}
            <div className="col-span-1 grid grid-cols-2 gap-2">
              {house?.housePhotoUrls.slice(1).map((photo, index) => (
                <img
                  src={photo}
                  alt={`house photo ${index + 2}`}
                  key={index}
                  className={` w-full h-full object-cover ${
                    index === 1 && "rounded-tr-xl"
                  }
                    ${index === 3 && "rounded-br-lg"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between py-8">
            <div className="flex flex-col lg:w-7/12">
              <div className="pb-8">
                <h2 className="text-xl font-semibold">
                  {house?.houseType} in {house?.city}, {house?.province}
                </h2>
                <p>
                  {house?.guestCount} guests · {house?.bedroomCount} bedrooms ·{" "}
                  {house?.bathroomCount} bathrooms
                </p>
              </div>
              <div className="py-6 border-y border-neutral-300 flex gap-3 items-center">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-14 h-14 object-cover"
                />
                <div className="font-semibold">Hosted by {host.name}</div>
              </div>
              <div className="pt-8 pb-12">
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p>{house?.houseDescription}</p>
              </div>

              <hr />
              <div className="">
                <div className="py-12">
                  <h2 className="text-xl font-semibold">
                    What this place offers?
                  </h2>
                  <div className="grid grid-cols-2 gap-5 mt-6">
                    {house?.amenities.map((item, index) => {
                      const facility = amenities.find(
                        (facility) =>
                          facility.name.toLowerCase() === item.toLowerCase()
                      );
                      const IconComponent = facility?.icon as IconType;
                      return (
                        <div
                          className="flex flex-row items-center space-x-2"
                          key={index}
                        >
                          {IconComponent && (
                            <IconComponent className="w-7 h-7" />
                          )}
                          <p>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-5/12 flex lg:justify-end justify-center h-fit">
              <div className="border border-neutral-300 shadow-[0_6px_16px_rgba(0,0,0,0.12)] p-6 rounded-xl flex flex-col">
                <h2 className="text-xl font-semibold mb-5">
                  How long do you want to stay?
                </h2>
                <DateRange
                  editableDateInputs={false}
                  direction="horizontal"
                  ranges={date}
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  minDate={new Date()}
                  disabledDates={disabledDates}
                />

                <div className="flex flex-row w-full">
                  <div className="border-[2px] border-neutral-500 rounded-l-xl w-full px-3 py-2">
                    <div className="text-xs">CHECK-IN</div>
                    <div className="">
                      {" "}
                      {format(date[0].startDate, "yyyy/MM/dd")}
                    </div>
                  </div>
                  <div className="border-[2px] border-l-0 border-neutral-500 rounded-r-xl w-full px-3 py-2">
                    <div className="text-xs">CHECK-OUT</div>
                    <div className="">
                      {format(date[0].endDate, "yyyy/MM/dd")}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center mt-4">
                  <div>
                    ${house?.housePrice} x {dayCount}{" "}
                    {dayCount > 1 ? "nights" : "night"}
                  </div>
                  <div>${(house?.housePrice ?? 0) * dayCount}</div>
                </div>

                <div className="flex flex-row justify-between items-center border-t border-neutral-300 py-6 mt-6">
                  <h2 className="font-semibold">Total</h2>
                  <div className="">
                    {" "}
                    ${(house?.housePrice ?? 0) * dayCount}
                  </div>
                </div>

                <Button
                  content="RESERVE"
                  onClick={handleBooking}
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="text-xl font-bold">This house doesn't exist</p>
          <Button content="Return Home" onClick={() => navigate("/")} />
        </div>
      )}
    </div>
  );
};

export default HouseDetail;
