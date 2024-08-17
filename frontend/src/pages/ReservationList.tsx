import { useEffect, useState } from "react";
import { cancelBooking, getBookingsByUserId } from "../services/requestApi";
import { ReservationDetails } from "../config/type";
import Button from "../components/Common/Button";
import { useNavigate } from "react-router-dom";
import HouseCard from "../components/Common/HouseCard";
import useUserProfile from "../hooks/useUserProfile";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton";
import toast from "react-hot-toast";

const ReservationList = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserProfile();
  const [loading, setLoading] = useState<boolean>(true);
  const [reservations, setReservations] = useState<ReservationDetails[]>([]);
  const [hasResult, setHasResult] = useState<boolean>(true);

  const getReservations = async () => {
    if (!userProfile?.id) return;
    try {
      const response = await getBookingsByUserId(userProfile.id);
      if (response.statusCode === 200) {
        if (response.bookingList.length === 0) {
          setHasResult(false);
        } else {
          setReservations(response.bookingList);
          setHasResult(true);
        }
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservations();
  }, [userProfile?.id]);

  const handleBookingCancellation = async (reservationId: string | number) => {
    try {
      const response = await cancelBooking(reservationId);
      if (response.statusCode === 200) {
        toast.success("Cancel Reservation Success!");
      } else {
        toast.error("Cancel Reservation Failed!");
      }
      setReservations((prev) => prev.filter((res) => res.id !== reservationId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

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
            Your Reservation List
          </h1>
          <div className="mt-5">
            {hasResult ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {reservations.map((res) => (
                  <HouseCard
                    key={res.id}
                    house={res.house}
                    reservationId={res.id}
                    checkIn={res.checkInDate}
                    checkOut={res.checkOutDate}
                    totalPrice={res.totalPrice}
                    onCancel={() => handleBookingCancellation(res.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 mt-6">
                <h1 className="text-2xl font-bold">No reservations found</h1>
                <span>
                  Looks like you have no reservations on your properties
                </span>
                <Button content="Go Booking" onClick={() => navigate("/")} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationList;
