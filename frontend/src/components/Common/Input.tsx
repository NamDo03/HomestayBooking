import React from "react";

type InputProps = {
  title: string;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  name: string;
  isTextarea?: boolean;
};

const Input: React.FC<InputProps> = ({
  title,
  value,
  handleChange,
  isTextarea = false,
  name,
}) => {
  return (
    <div className="max-w-[500px]">
      <p className="font-medium mb-2">{title}</p>
      {isTextarea ? (
        <textarea
          placeholder={title}
          required
          className="border border-neutral-400 py-4 px-6 rounded-lg w-full"
          value={value}
          name={name}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          placeholder={title}
          required
          className="border border-neutral-400 py-4 px-6 rounded-lg w-full"
          value={value}
          name={name}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default Input;
