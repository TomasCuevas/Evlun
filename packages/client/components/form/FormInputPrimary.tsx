import { useState, useEffect } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

//* interface *//
interface Props {
  inputChange: any;
  inputName: string;
  inputType?: string;
  inputValue: string | number;
  label: string;
  max?: number;
}

export const FormInputPrimary: React.FC<Props> = ({
  inputChange,
  inputName,
  inputType = "text",
  inputValue,
  label,
  max,
}) => {
  const [viewPassword, setViewPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  const inputBlur = () => {
    if (typeof inputValue === "string" && inputValue.length < 1) {
      setFocus(false);
    }
  };

  useEffect(() => {
    if (typeof inputValue === "string" && inputValue.length > 0) {
      setFocus(true);
    }
    if (typeof inputValue === "number" && inputValue) {
      setFocus(true);
    }
  }, [inputValue]);

  return (
    <div className="relative flex h-[60px] items-center rounded-md bg-white/80 px-5">
      <label
        htmlFor={inputName}
        className={
          focus
            ? "absolute top-[5px] text-xs font-light text-orange"
            : "absolute font-semibold text-orange"
        }
      >
        {label}
      </label>
      <input
        maxLength={max}
        onFocus={() => setFocus(true)}
        onBlur={inputBlur}
        type={viewPassword ? "text" : inputType}
        name={inputName}
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="w-full border-none bg-[#0000] pt-[10px] text-lg font-medium text-background outline-none autofill:bg-[#0000]"
      />
      {inputType === "password" &&
        (viewPassword ? (
          <BsEyeSlash
            onClick={() => setViewPassword(false)}
            className="mt-1 cursor-pointer text-2xl text-orange"
          />
        ) : (
          <BsEye
            onClick={() => setViewPassword(true)}
            className="mt-1 cursor-pointer text-2xl text-orange"
          />
        ))}
    </div>
  );
};
