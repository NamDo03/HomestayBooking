import React from "react";
import { IconType } from "react-icons";

type TypeHouseCard = {
  item: { name: string; icon: IconType; description: string };
  isSelected: boolean;
  onToggle: (name: string) => void;
};
const TypeHouseCard: React.FC<TypeHouseCard> = ({
  item,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(item.name)}
      className={`flex items-center justify-between max-w-[600px] py-3 px-7 border rounded-xl cursor-pointer transition delay-100 ease-in
 hover:border-[2px] hover:bg-neutral-100 hover:border-rose-500
 ${
   isSelected
     ? "border-rose-500 bg-neutral-100 border-[2px]"
     : "border-neutral-300 bg-white"
 }`}
    >
      <div className="max-w-[400px]">
        <div className="mb-1 text-blue-1 text-lg font-semibold">
          {item.name}
        </div>
        <div>{item.description}</div>
      </div>
      <item.icon size={30} />
    </div>
  );
};

export default TypeHouseCard;
