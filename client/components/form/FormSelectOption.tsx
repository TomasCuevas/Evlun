import { ChangeEvent } from "react";

interface Props {
  inputChange: any;
  inputName: string;
  inputType?: string;
  inputValue: string | number;
  label: string;
  optionValues: any[];
}

export const FormSelectOption: React.FC<Props> = ({
  inputChange,
  inputName,
  inputValue,
  label,
  optionValues,
}) => {
  const changeOptions = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const value = target.value;
    inputChange({ target: { name: inputName, value } });
  };

  return (
    <div className="relative flex min-h-[60px] items-center rounded-md bg-white/80 px-[5%]">
      <label className="absolute top-[5px] text-xs font-light text-orange">
        {label}
      </label>
      <select
        value={inputValue}
        name={inputName}
        onChange={changeOptions}
        className="h-[60px] w-full border-none  bg-[#0000] text-bluedark outline-none"
      >
        {optionValues.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-bluedark text-white/80"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
