import { useEffect, useState } from "react";
import { amenities, categories, types } from "../config/houseOptions";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import Button from "../components/Common/Button";
import LoadingDots from "../components/Loading/LoadingDots";
import { addHouse } from "../services/requestApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../hooks/useUserProfile";
import Input from "../components/Common/Input";
import CounterBox from "../components/Common/CounterBox";
import { ItemCard } from "../components/Common/ItemCard";
import TypeHouseCard from "../components/Common/TypeHouseCard";

const CreateHouse = () => {
  const { userProfile } = useUserProfile();

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  /* CATEGORY AND TYPE */
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");

  /* LOCATION */
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    province: "",
    title: "",
    description: "",
    price: 0,
  });

  const handleChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [guestCount, setGuestCount] = useState<number>(1);
  const [bedroomCount, setBedroomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);

  /* AMENITIES */
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  /* PHOTOS */
  const [photos, setPhotos] = useState<File[]>([]);
  const handleUploadPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhotos = Array.from(e.target.files || []);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleAddHouse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !category ||
      !type ||
      !formData.streetAddress ||
      !formData.city ||
      !formData.province ||
      !formData.title ||
      !formData.description ||
      formData.price <= 0 ||
      photos.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    const formDataObject = new FormData();
    formDataObject.append("address", formData.streetAddress);
    formDataObject.append("province", formData.province);
    formDataObject.append("city", formData.city);
    formDataObject.append("houseName", formData.title);
    formDataObject.append("houseType", type);
    formDataObject.append("category", category);
    formDataObject.append("housePrice", formData.price.toString());
    formDataObject.append("houseDescription", formData.description);
    formDataObject.append("bathroomCount", bathroomCount.toString());
    formDataObject.append("bedroomCount", bedroomCount.toString());
    formDataObject.append("guestCount", guestCount.toString());
    formDataObject.append("userId", userProfile?.id?.toString() || "");

    selectedAmenities.forEach((amenity) => {
      formDataObject.append("amenities[]", amenity);
    });

    photos.forEach((photo) => {
      formDataObject.append("photos", photo);
    });
    try {
      const response = await addHouse(formDataObject);
      if (response.statusCode === 200) {
        toast.success("House added successfully!");
        navigate("/properties");
      }
    } catch (error) {
      toast.error("Failed to add house.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="px-3 md:px-8 xl:px-40 py-8 bg-neutral-100">
      <h1 className="text-blue-1 text-2xl font-bold">Publish Your Place</h1>
      <form onSubmit={handleAddHouse} className="flex flex-col">
        <div className="bg-white py-8 px-10 mt-10 rounded-xl">
          <h2 className="pb-4 mb-7 text-xl font-semibold text-rose-500 border-b-[2px] border-neutral-600">
            Step 1: Tell us about your place
          </h2>
          <h3 className="text-blue-1 text-lg font-semibold mb-5">
            Which of these categories best describes your place?
          </h3>
          <div className="flex items-center flex-wrap gap-5 px-5">
            {categories.slice(1).map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                isSelected={category === item.name}
                onToggle={() => setCategory(item.name)}
              />
            ))}
          </div>
          <h3 className="text-blue-1 text-lg font-semibold mb-5 mt-10">
            What type of place will guests have?
          </h3>
          <div className="flex flex-col gap-5">
            {types.map((item, index) => (
              <TypeHouseCard
                key={index}
                item={item}
                isSelected={type === item.name}
                onToggle={() => setType(item.name)}
              />
            ))}
          </div>
          <h3 className="text-blue-1 text-lg font-semibold mb-5 mt-10">
            Where's your place located?
          </h3>
          <div className="flex flex-col gap-5">
            <Input
              title="Street Address"
              value={formData.streetAddress}
              handleChange={handleChangeData}
              name="streetAddress"
            />
            <Input
              title="City"
              value={formData.city}
              handleChange={handleChangeData}
              name="city"
            />
            <Input
              title="Province"
              value={formData.province}
              handleChange={handleChangeData}
              name="province"
            />
          </div>

          <h3 className="text-blue-1 text-lg font-semibold mb-5 mt-10">
            Share some basics about your place
          </h3>
          <div className="flex flex-wrap gap-10">
            <CounterBox
              title="Guests"
              value={guestCount}
              setValue={setGuestCount}
            />
            <CounterBox
              title="Bedrooms"
              value={bedroomCount}
              setValue={setBedroomCount}
            />
            <CounterBox
              title="Bathrooms"
              value={bathroomCount}
              setValue={setBathroomCount}
            />
          </div>
        </div>

        <div className="bg-white py-8 px-10 mt-10 rounded-xl">
          <h2 className="pb-4 mb-7 text-xl font-semibold text-rose-500 border-b-[2px] border-neutral-600">
            Step 2: Make your place stand out
          </h2>
          <h3 className="text-blue-1 text-lg font-semibold mb-5">
            Tell guests what your place has to offer
          </h3>
          <div className="flex items-center flex-wrap gap-5 px-5">
            {amenities.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                isSelected={selectedAmenities.includes(item.name)}
                onToggle={handleToggleAmenity}
              />
            ))}
          </div>
          <h3 className="text-blue-1 text-lg font-semibold mb-5 mt-10">
            Add some photos of your place
          </h3>
          <DragDropContext onDragEnd={handleDragPhoto}>
            <Droppable droppableId="photos" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-wrap gap-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {provided.placeholder}
                  {photos.length < 1 && (
                    <>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label
                        htmlFor="image"
                        className=" py-10 px-[100px] rounded-xl flex flex-col items-center cursor-pointer border border-neutral-300 border-dashed"
                      >
                        <IoIosImages className="text-5xl" />
                        <p className="text-center font-semibold">
                          Upload from your device
                        </p>
                      </label>
                    </>
                  )}

                  {photos.length >= 1 && (
                    <>
                      {photos.map((photo, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="relative w-[250px] h-[150px] cursor-move"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt="place"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  className="absolute right-0 top-0 p-1 border-none bg-white opacity-80 text-xl cursor-pointer hover:bg-rose-500"
                                  onClick={() => handleRemovePhoto(index)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUploadPhotos}
                        multiple
                      />
                      <label
                        htmlFor="image"
                        className="rounded-xl w-[250px] h-[150px] flex flex-col items-center justify-center cursor-pointer border border-neutral-300 border-dashed"
                      >
                        <IoIosImages className="text-5xl" />
                        <p className="text-center font-semibold">
                          Upload from your device
                        </p>
                      </label>
                    </>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <h3 className="text-blue-1 text-lg font-semibold mb-5 mt-10">
            What make your place attractive and exciting?
          </h3>
          <div className="flex flex-col gap-5">
            <Input
              title="Title"
              value={formData.title}
              handleChange={handleChangeData}
              name="title"
            />
            <Input
              isTextarea
              title="Description"
              value={formData.description}
              handleChange={handleChangeData}
              name="description"
            />
            <div className=" max-w-[500px]">
              <p className="font-medium mb-2">Now, set your PRICE</p>
              <span className="mr-3">$</span>
              <input
                type="number"
                placeholder="100"
                min={1}
                required
                className="border border-neutral-400 py-2 px-4 rounded-lg w-[100px]"
                name="price"
                value={formData.price}
                onChange={handleChangeData}
              />
              <span className="ml-3"> / night</span>
            </div>
          </div>
        </div>
        <div className="my-10 flex justify-center">
          <Button content="CREATE YOUR LISTING" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateHouse;
