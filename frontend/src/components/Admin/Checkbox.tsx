interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={label}
            className="sr-only"
            checked={checked}
            onChange={onChange}
            aria-checked={checked}
          />
          <div
            className={`mr-2 flex h-5 w-5 items-center justify-center rounded-full border ${
              checked && "border-[#3C50E0]"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                checked && "!bg-[#3C50E0]"
              }`}
            >
              {" "}
            </span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
