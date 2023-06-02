import { useEffect, useState } from "react";

//* interface *//
interface Props {
  inputChange: any;
  inputName: string;
  inputValue: string | number;
  label: string;
  max?: number;
}

export const FormTextareaPrimary: React.FC<Props> = ({
  inputChange,
  inputName,
  inputValue,
  label,
  max = 100,
}) => {
  const [focus, setFocus] = useState(false);
  const inputFocus = () => setFocus(true);
  const inputBlur = () => {
    if (typeof inputValue === "string" && inputValue.length < 1) {
      setFocus(false);
    }
  };

  useEffect(() => {
    if (typeof inputValue === "string" && inputValue.length > 0) {
      setFocus(true);
    }
  }, [inputValue]);

  return (
    <div
      className={`relative flex ${
        focus ? "h-[200px]" : "h-[60px]"
      }  flex-col  rounded-md bg-white/80 px-5`}
    >
      <label
        htmlFor={inputName}
        className={
          focus
            ? "absolute top-[5px] text-xs font-light text-orange"
            : "absolute top-[50%] translate-y-[-50%] font-medium text-orange"
        }
      >
        {label}
      </label>
      <textarea
        onFocus={inputFocus}
        onBlur={inputBlur}
        maxLength={max}
        name={inputName}
        autoComplete="off"
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="text-darktext mt-[20px] h-[400px] w-full resize-none overflow-hidden border-none bg-transparent text-lg font-medium outline-none"
        rows={4}
      />
    </div>
  );
};
