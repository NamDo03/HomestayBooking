import {
  MdOutlineRemoveCircleOutline,
  MdOutlineAddCircleOutline,
} from "react-icons/md";

type CounterBoxProps = {
  title: string;
  value: number ;
  setValue: (value: number) => void;
};
const CounterBox: React.FC<CounterBoxProps> = ({ title, value, setValue }) => {
  return (
    <div className="flex items-center gap-7 p-4 border border-neutral-400 rounded-lg">
      <p className="font-medium">{title}</p>
      <div className="flex items-center gap-3 text-lg">
        <MdOutlineRemoveCircleOutline
          onClick={() => {
            value > 1 && setValue(value - 1);
          }}
          size={30}
          className={`${
            value <= 1
              ? "cursor-not-allowed text-neutral-400"
              : "cursor-pointer hover:text-rose-500 "
          }`}
        />
        <p>{value}</p>
        <MdOutlineAddCircleOutline
          onClick={() => {
            setValue(value + 1);
          }}
          size={30}
          className="cursor-pointer hover:text-rose-500"
        />
      </div>
    </div>
  );
};

export default CounterBox;
