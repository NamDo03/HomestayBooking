import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  title: string;
  subtitle?: string;
  value: number;
  setValue: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  setValue,
}) => {
  const onAdd = () => {
    setValue(value + 1);
  };
  const onReduce = () => {
    if (value === 1) {
      return;
    }
    setValue(value - 1);
  };
  return (
    <div className="flex flex-row items-center justify-between gap-10">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="text-gray-600 font-light">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition "
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600"> {value}</div>
        <div
          onClick={onAdd}
          className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
