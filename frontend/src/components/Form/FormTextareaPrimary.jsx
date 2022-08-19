import { useEffect, useState } from 'react';

export const FormTextareaPrimary = ({
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
    <div
      className={`relative flex ${
        focus ? 'h-[200px]' : 'h-[60px]'
      }  flex-col  rounded-md bg-lightbackground/80 px-5`}
    >
      <label
        htmlFor={inputName}
        className={
          focus
            ? 'absolute top-[5px] text-xs font-light text-decorateorange'
            : 'absolute top-[50%] translate-y-[-50%] font-medium text-decorateorange'
        }
      >
        {label}
      </label>
      <textarea
        onFocus={inputFocus}
        onBlur={inputBlur}
        maxLength={max}
        type={inputType}
        name={inputName}
        autoComplete="off"
        id={inputName}
        value={inputValue}
        onChange={inputChange}
        className="mt-[20px] h-[400px] w-full resize-none overflow-hidden border-none bg-transparent text-lg font-medium text-darktext outline-none"
        rows={4}
      />
    </div>
  );
};
