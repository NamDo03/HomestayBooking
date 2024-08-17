import { useEffect, useState } from "react";
import { deleteHouse, getAllHouses } from "../../services/requestApi";
import { House } from "../../config/type";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Houses = () => {
  const navigate = useNavigate();
  const [houseList, setHouseList] = useState<House[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchAllHouses = async () => {
      try {
        const response = await getAllHouses(page, 8);
        if (response.statusCode === 200) {
          if (response.houseList === 0) {
            console.log("Dont have any house");
            return;
          }
          setHouseList(response.houseList);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllHouses();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (houseId: number | string) => {
    try {
      await deleteHouse(houseId);
      setHouseList((prevHouseList) =>
        prevHouseList.filter((house) => house.id !== houseId)
      );
      toast.success(`Delete House with id ${houseId} successful`);
    } catch (error) {
      console.error("Failed to delete house:", error);
      toast.error(`Delete House with id ${houseId} failed`);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black">House Manager</h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-[#F7F9FC] sm:grid-cols-7">
          <div className="p-2.5 xl:p-5 col-span-2 flex items-center">
            <h5 className="text-sm font-medium uppercase">House</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-1 flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase">price</h5>
          </div>
          <div className="p-2.5 xl:p-5 hidden col-span-1 sm:flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase">Category</h5>
          </div>
          <div className="p-2.5 xl:p-5 hidden col-span-1 sm:flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase">Type</h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-2 flex items-center justify-center">
            <h5 className="text-sm font-medium uppercase">Action</h5>
          </div>
        </div>

        {houseList.map((house, key) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-7 py-2 ${
              key === houseList.length - 1 ? "" : "border-b border-stroke"
            }`}
            key={key}
          >
            <div className="col-span-2 flex flex-col items-center gap-3 sm:flex-row">
              <div className="h-32 w-28 rounded-md flex items-center">
                <img
                  src={house.housePhotoUrls[0]}
                  alt="House"
                  className="object-cover rounded-lg"
                />
              </div>
              <p className="text-sm text-black font-medium">
                {house.houseName}
              </p>
            </div>

            <div className="col-span-1 flex items-center justify-center">
              <p className="text-black">${house.housePrice}</p>
            </div>

            <div className="col-span-1 hidden items-center justify-center  sm:flex">
              <p className="text-black">{house?.category}</p>
            </div>

            <div className="col-span-1 hidden items-center justify-center sm:flex ">
              <p className="text-black">{house.houseType}</p>
            </div>

            <div className="col-span-2 items-center justify-center flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/admin/house/${house.id}/update`)}
                className="bg-[#3C50E0] text-white text-sm py-2 px-4 rounded-md hover:opacity-90 hover:scale-110 ease-in duration-150 sm:text-base"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(house.id)}
                className="bg-[#D34053] text-white text-sm py-2 px-4 rounded-md hover:opacity-90 hover:scale-110 ease-in duration-150 sm:text-base"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2 mb-5">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`border border-stroke py-2 px-4 rounded-md hover:opacity-90 ease-in duration-150 hover:bg-[#3C50E0] hover:text-white ${
                page === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <IoChevronBack />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  page === index + 1
                    ? "bg-[#3C50E0] text-white"
                    : "bg-white text-black"
                } border border-stroke py-2 px-4 rounded-md hover:opacity-90 ease-in duration-150 hover:bg-[#3C50E0] hover:text-white`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`border border-stroke py-2 px-4 rounded-md hover:opacity-90 ease-in duration-150 hover:bg-[#3C50E0] hover:text-white ${
                page === totalPages ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <IoChevronForward />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Houses;
