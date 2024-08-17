import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { House } from "../../config/type";
import { getHouseById, updateHouse } from "../../services/requestApi";
import Input from "../../components/Common/Input";
import LoadingDots from "../../components/Loading/LoadingDots";
import { amenities, categories, types } from "../../config/houseOptions";
import { ItemCard } from "../../components/Common/ItemCard";
import TypeHouseCard from "../../components/Common/TypeHouseCard";
import CounterBox from "../../components/Common/CounterBox";
import toast from "react-hot-toast";

const UpdateHouse = () => {
  const navigate = useNavigate();
  const { houseId } = useParams<{ houseId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [existHouse, setExistHouse] = useState<boolean>(true);
  const [house, setHouse] = useState<House | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);

  useEffect(() => {
    const getHouseDetail = async () => {
      if (!houseId) return;
      setLoading(true);
      try {
        const response = await getHouseById(houseId);
        if (response.statusCode === 200) {
          if (response.house.length === 0) {
            console.log("Dont have house with id " + houseId);
            setExistHouse(false);
            return;
          }
          setHouse(response.house);
          setExistHouse(true);
          true;
        }
      } catch (error) {
        console.log(error);
        setExistHouse(false);
      } finally {
        setTimeout(() => setLoading(false), 700);
      }
    };
    if (houseId) {
      getHouseDetail();
    }
  }, [houseId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHouse((prevHouse) =>
      prevHouse ? { ...prevHouse, [name]: value } : null
    );
  };

  const handleToggleCategory = (item: string) => {
    setHouse((prevHouse) =>
      prevHouse ? { ...prevHouse, category: item } : null
    );
  };

  const handleToggleType = (item: string) => {
    setHouse((prevHouse) =>
      prevHouse ? { ...prevHouse, houseType: item } : null
    );
  };

  const handleToggleAmenity = (item: string) => {
    setHouse((prevHouse) => {
      if (!prevHouse) return null;
      const amenities = prevHouse.amenities.includes(item)
        ? prevHouse.amenities.filter((amenity) => amenity !== item)
        : [...prevHouse.amenities, item];
      return { ...prevHouse, amenities };
    });
  };

  const handleCounterChange = (field: string, value: number) => {
    setHouse((prevHouse) =>
      prevHouse ? { ...prevHouse, [field]: value } : null
    );
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const photoUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPhotos(Array.from(files));
      setHouse((prevHouse) => {
        if (!prevHouse) return null;
        return {
          ...prevHouse,
          housePhotoUrls: photoUrls,
        };
      });
    }
  };
  console.log(house);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!house) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("address", house.address);
    formData.append("province", house.province);
    formData.append("city", house.city);
    formData.append("houseName", house.houseName);
    formData.append("houseType", house.houseType);
    formData.append("category", house.category);
    formData.append("housePrice", house.housePrice.toString());
    formData.append("houseDescription", house.houseDescription);
    formData.append("guestCount", house.guestCount.toString());
    formData.append("bedroomCount", house.bedroomCount.toString());
    formData.append("bathroomCount", house.bathroomCount.toString());
    house.amenities.forEach((amenity) => formData.append("amenities", amenity));
    photos.forEach((file) => formData.append("photos", file));

    try {
      const response = await updateHouse(house.id, formData);
      console.log(response);
      if (response.statusCode === 200) {
        navigate("/admin/houses");
        toast.success("House updated successfully");
      } else {
        toast.error("Failed to update house");
        console.error("Failed to update house:", response);
      }
    } catch (error) {
      toast.error("Error updating house");
      console.error("Error updating house:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingDots />;
  }

  if (!existHouse) {
    return (
      <div className="flex flex-col justify-center items-center gap-5">
        <p className="text-xl font-bold">This house doesn't exist</p>
      </div>
    );
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-3 shadow-default sm:px-7.5 ">
      <h1 className="text-blue-1 text-2xl font-bold mb-6 text-center">
        Edit House
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex flex-row gap-4 justify-center items-center flex-wrap">
            {house?.housePhotoUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`House Photo ${index + 1}`}
                className="h-[150px] w-[200px] object-cover rounded-lg"
              />
            ))}
            <input
              type="file"
              multiple
              onChange={handlePhotoChange}
              className="mt-4"
            />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-blue-1 mb-2 text-lg">Category</h2>
          <div className="flex items-center flex-wrap gap-5 px-5">
            {categories.slice(1).map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                isSelected={house?.category === item.name}
                onToggle={() => handleToggleCategory(item.name)}
              />
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-blue-1 mb-2 text-lg">Type</h2>
          <div className="flex flex-col gap-5">
            {types.map((item, index) => (
              <TypeHouseCard
                key={index}
                item={item}
                isSelected={house?.houseType === item.name}
                onToggle={() => handleToggleType(item.name)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <Input
            title="Street Address"
            name="address"
            value={house?.address || ""}
            handleChange={handleChange}
          />
          <Input
            title="City"
            name="city"
            value={house?.city || ""}
            handleChange={handleChange}
          />
          <Input
            title="Province"
            name="province"
            value={house?.province || ""}
            handleChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-blue-1 mb-2 text-lg">Details</h2>
          <div className="flex flex-wrap gap-10">
            <CounterBox
              title="Guests"
              value={house?.guestCount ?? 1}
              setValue={(value) => handleCounterChange("guestCount", value)}
            />
            <CounterBox
              title="Bedrooms"
              value={house?.bedroomCount ?? 1}
              setValue={(value) => handleCounterChange("bedroomCount", value)}
            />
            <CounterBox
              title="Bathrooms"
              value={house?.bathroomCount ?? 1}
              setValue={(value) => handleCounterChange("bathroomCount", value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <h2 className="font-semibold text-blue-1 mb-2 text-lg">Amenities</h2>
          <div className="flex items-center flex-wrap gap-5 px-5">
            {amenities.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                isSelected={
                  house?.amenities ? house.amenities.includes(item.name) : false
                }
                onToggle={() => handleToggleAmenity(item.name)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <Input
            title="House Name"
            name="houseName"
            value={house?.houseName || ""}
            handleChange={handleChange}
          />
          <Input
            title="Description"
            name="houseDescription"
            value={house?.houseDescription || ""}
            handleChange={handleChange}
          />
        </div>
        <div className="mb-6 max-w-[500px]">
          <h2 className="font-semibold text-blue-1 mb-2 text-lg">Price</h2>
          <div className="flex items-center ">
            <span className="mr-3">$</span>
            <input
              type="number"
              placeholder="100"
              min={1}
              required
              className="border border-neutral-400 py-2 px-4 rounded-lg w-[100px]"
              name="housePrice"
              value={house?.housePrice}
              onChange={handleChange}
            />
            <span className="ml-3"> / night</span>
          </div>
        </div>
        <div className="flex justify-center items-center pb-3">
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-[#3C50E0] text-white rounded text-xl hover:opacity-90 cursor-pointer"
          >
            Update House
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateHouse;
