import { IconType } from "react-icons";

type ItemCardProps = {
  item: { name: string; icon: IconType };
  isSelected: boolean;
  onToggle: (name: string) => void;
};

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(item.name)}
      className={`flex flex-col gap-2 items-center justify-center w-[110px] h-[90px] border rounded-xl cursor-pointer transition ease-in delay-100
    hover:border-[2px] hover:bg-neutral-100 hover:border-rose-500
    ${
      isSelected
        ? "border-rose-500 bg-neutral-100 border-[2px]"
        : "border-neutral-300 bg-white"
    }`}
    >
      <item.icon size={26} />
      <div className="font-medium text-sm text-center">{item.name}</div>
    </div>
  );
};
