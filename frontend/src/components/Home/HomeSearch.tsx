import React, { useRef, useState } from "react";
import Button from "../Common/Button";
import { IoPerson } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import useClickOutside from "../../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Counter from "../Common/Counter";

const HomeSearch = () => {
  const navigate = useNavigate();
  const optionsRef = useRef(null);
  const datesRef = useRef(null);
  useClickOutside(optionsRef, () => setOpenOptions(false));
  useClickOutside(datesRef, () => setShowDateRange(false));

  const [inputValue, setInputValue] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [showDateRange, setShowDateRange] = useState<boolean>(false);
  const [selectedDates, setSelectedDates] = useState<boolean>(false);
  const [date, setDate] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [bedroomCount, setBedroomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsEmpty(value === "");
    if (value !== "") {
      setError(false);
    }
  };

  const handleDateClick = () => {
    setShowDateRange(!showDateRange);
    setSelectedDates(false);
  };

  const handleSearch = () => {
    if (!inputValue) {
      setError(true);
    } else {
      navigate(
        `/houses?keyword=${inputValue}&startDate=${format(
          date[0].startDate,
          "yyyy/MM/dd"
        )}&endDate=${format(
          date[0].endDate,
          "yyyy/MM/dd"
        )}&guestCount=${guestCount}&bedroomCount=${bedroomCount}&bathroomCount=${bathroomCount}`
      );
    }
  };

  return (
    <div className="text-black hidden lg:flex w-80% rounded-md bg-white gap-4 justify-around items-center shadow-[0_2px_8px_4px_rgba(178,178,178,0.45)] py-6 px-4 absolute -bottom-[10%] w-full max-w-[1080px] ">
      <div
        className={`
          ${isEmpty ? "border-neutral-300" : "border-black"}
           flex items-center gap-4 border-[2px] hover:border-black hover:bg-neutral-100 rounded-full pt-3 pb-2 px-5`}
      >
        <FaLocationDot className=" text-neutral-600" size={22} />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">Where</p>
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search destination"
            className="border-none bg-transparent outline-none text-base"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Please enter a destination to search."
            data-tooltip-variant="warning"
          />
          {error && <Tooltip id="my-tooltip" place="bottom" isOpen={error} />}
        </div>
      </div>
      <div ref={datesRef} className="cursor-pointer flex flex-row">
        <div
          onClick={handleDateClick}
          className="flex items-center gap-4 border-[2px] border-r-[1px] hover:bg-neutral-100 rounded-l-full pt-3 pb-2 px-5"
        >
          <FaRegCalendarAlt className=" text-neutral-600" size={22} />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Check in</p>
            {selectedDates ? (
              <p className="text-base">
                {format(date[0].startDate, "dd/MM/yyyy")}
              </p>
            ) : (
              <p className="text-base">Add Dates</p>
            )}
          </div>
        </div>
        <div
          onClick={handleDateClick}
          className="flex items-center gap-4 border-[2px] border-l-[1px] hover:bg-neutral-100 rounded-r-full pt-3 pb-2 px-5"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Check out</p>
            {selectedDates ? (
              <p className="text-base">
                {format(date[0].endDate, "dd/MM/yyyy")}
              </p>
            ) : (
              <p className="text-base">Add Dates</p>
            )}
          </div>
          <FaRegCalendarAlt className=" text-neutral-600" size={22} />
        </div>
        {showDateRange && (
          <div className="absolute top-24 z-10 shadow-lg">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setDate([item.selection]);
                setSelectedDates(true);
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              minDate={new Date()}
            />
          </div>
        )}
      </div>

      <div
        ref={optionsRef}
        className=" border-[2px] hover:bg-neutral-100 rounded-full pt-3 pb-2 px-5 cursor-pointer"
      >
        <div
          onClick={() => setOpenOptions(!openOptions)}
          className="flex items-center gap-4"
        >
          <IoPerson className=" text-neutral-600" size={22} />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Add Guests</p>
            <p className="text-sm">{`${guestCount} Guests`}</p>
          </div>
        </div>

        {openOptions && (
          <div className=" absolute bg-white top-28 text-neutral-500 z-10 shadow-lg rounded-lg p-4 flex flex-col gap-4">
            <Counter
              title="Guests"
              value={guestCount}
              setValue={setGuestCount}
            />
            <Counter
              title="Bedrooms"
              value={bedroomCount}
              setValue={setBedroomCount}
            />
            <Counter
              title="Bathrooms"
              value={bathroomCount}
              setValue={setBathroomCount}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button content="Search" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default HomeSearch;
