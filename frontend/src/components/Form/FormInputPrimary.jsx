import { useState, useEffect } from 'react';

export const FormInputPrimary = ({
  inputChange,
  inputName,
  inputType = 'text',
  inputValue,
  label,
  max,
}) => {
  const [focus, setFocus] = useState(false);

  const inputFocus = () => setFocus(true);

  const inputBlur = () => inputValue.length <= 0 && setFocus(false);

  useEffect(() => {
    if (inputValue.length > 0 || inputValue > 0) setFocus(true);
  }, []);

  return (
    <div className="relative flex h-[60px] items-center rounded-md bg-lightbackground/80 px-5">
      <label
        htmlFor={inputName}
        className={
          focus
            ? 'absolute top-[5px] text-xs font-light text-decorateorange transition-all duration-300'
            : 'absolute font-medium text-decorateorange transition-all duration-300'
        }
      >
        {label}
      </label>
      <input
        maxLength={max}
        onFocus={inputFocus}
        onBlur={inputBlur}
        type={inputType}
        name={inputName}
        autoComplete="off"
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="w-full border-none bg-transparent pt-[10px] text-lg font-medium text-darktext outline-none"
      />
    </div>
  );
};
