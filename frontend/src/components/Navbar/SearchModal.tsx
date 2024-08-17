import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { DateRange } from "react-date-range";
import img from "../../assets/Location.gif";
import { Tooltip } from "react-tooltip";
import { useNavigate, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import Button from "../Common/Button";
import Counter from "../Common/Counter";

interface SearchModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal: React.FC<SearchModalProps> = ({ setShowModal }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [bedroomCount, setBedroomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);

  const handleNextStep = () => {
    if (step === 1 && keyword.trim() === "") {
      setError(true);
    } else {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    if (value.trim() !== "") {
      setError(false);
    }
  };

  const handleSearch = () => {
    const params = {
      keyword: keyword,
      startDate: format(dateRange[0].startDate, "yyyy/MM/dd"),
      endDate: format(dateRange[0].startDate, "yyyy/MM/dd"),
      guestCount: guestCount.toString(),
      bedroomCount: bedroomCount.toString(),
      bathroomCount: bathroomCount.toString(),
    };

    setSearchParams(params);
    navigate(`/houses?${new URLSearchParams(params).toString()}`);
    setShowModal(false);
  };

  return (
    <div className=" flex justify-center items-center overflow-x-hidden fixed inset-0 z-50 bg-neutral-800/70">
      <div className="overflow-hidden relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div className="duration-300 h-full transition animate-slideUp">
          <div className="h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
            <div className="flex items-center rounded-t justify-center relative p-6 border-b-[1px]">
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={20} />
              </button>
              <div className="text-lg font-semibold">Filters</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">
              {step === 1 && (
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg font-semibold ">
                    Where do you wanna go?
                  </h1>
                  <span className="text-neutral-400">
                    Find the perfect location!
                  </span>
                  <div className="mt-6">
                    <input
                      type="text"
                      value={keyword}
                      onChange={handleInputChange}
                      placeholder="Enter keyword"
                      className="border border-neutral-400 rounded p-4 w-full"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Please enter a destination to search."
                      data-tooltip-variant="warning"
                    />
                    {error && (
                      <Tooltip id="my-tooltip" place="bottom" isOpen={error} />
                    )}
                  </div>
                  <div className=" h-[230px] flex justify-center items-center">
                    <img src={img} alt="" className="h-full object-cover" />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="flex flex-col gap-2 w-full">
                  <h1 className="text-lg font-semibold ">
                    When do you plan to go?
                  </h1>
                  <span className="text-neutral-400">
                    Make sure everyone is free!
                  </span>
                  <div className="searchModal flex flex-col">
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => {
                        setDateRange([item.selection]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      minDate={new Date()}
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold ">More infomation</h1>
                    <span className="text-neutral-400">
                      Find your perfect place!
                    </span>
                  </div>
                  <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    setValue={setGuestCount}
                  />
                  <Counter
                    title="Bedrooms"
                    subtitle="How many bedrooms do you need?"
                    value={bedroomCount}
                    setValue={setBedroomCount}
                  />
                  <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    setValue={setBathroomCount}
                  />
                </div>
              )}
            </div>
            {/* FOOTER */}
            <div className="p-6 flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4 w-full">
                {step > 1 && (
                  <Button
                    wfull
                    outline
                    content="Back"
                    onClick={handlePreviousStep}
                  />
                )}
                {step < 3 ? (
                  <Button wfull content="Next" onClick={handleNextStep} />
                ) : (
                  <Button wfull content="Search" onClick={handleSearch} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
