import { useRef, useState, useEffect } from "react";
import { categories } from "../../config/houseOptions";
import CategoryBox from "./CategoryBox";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const [categoryParams, setCategoryParams] = useSearchParams();
  const category = categoryParams?.get("category");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const updateScrollButtons = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener(
        "scroll",
        updateScrollButtons
      );
      updateScrollButtons();
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener(
          "scroll",
          updateScrollButtons
        );
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-2 overflow-x-auto relative">
      {canScrollLeft && (
        <div className="absolute top-0 left-0 flex items-center bg-gradient-left h-full w-[60px] md:w-[120px]">
          <MdKeyboardArrowLeft
            onClick={() => scroll("left")}
            className="border-[1px] border-neutral-300 hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12);] w-[35px] h-[35px] rounded-full md:ml-7 ml-2 cursor-pointer"
          />
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className="flex flex-row gap-4 overflow-x-hidden scroll-smooth hide-scrollbar"
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.name}
            label={item.name}
            icon={item.icon}
            selected={category === item.name.toLowerCase()}
          />
        ))}
      </div>
      {canScrollRight && (
        <div className="absolute top-0 right-0 flex items-center bg-gradient-right h-full  w-[60px] md:w-[120px] justify-end">
          <MdKeyboardArrowRight
            size={28}
            className="border-[1px] border-neutral-300 hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12);] w-[35px] h-[35px] rounded-full md:mr-7 mr-2 cursor-pointer"
            onClick={() => scroll("right")}
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
