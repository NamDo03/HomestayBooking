import { IconType } from "react-icons";
import { useSearchParams } from "react-router-dom";

type CategoryBoxProps = {
  label: string;
  icon: IconType;
  selected?: boolean;
};

const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const [categoryParams, setCategoryParams] = useSearchParams();
  const handleSelectCategory = () => {
    const params = new URLSearchParams(categoryParams);
    if (label) {
      params.set("category", label.toLowerCase());
    } else {
      params.delete("category");
    }
    params.delete("keyword");

    setCategoryParams(params);
  };
  return (
    <div
      onClick={handleSelectCategory}
      className={`px-5 flex flex-col items-center justify-center gap-2 border-b-[3px] hover:text-neutral-800 transition cursor-pointer
        ${
          selected
            ? "border-b-neutral-800 text-neutral-800"
            : "border-transparent text-neutral-500"
        }
        `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
