export const FormSelectOption = ({
  inputValue,
  inputName,
  optionValues,
  label,
  onInputChange,
}) => {
  const changeOptions = ({ target }) => {
    const value = target.value;
    onInputChange({ target: { name: inputName, value } });
  };

  return (
    <div className="relative flex min-h-[60px] items-center rounded-md bg-lightbackground/80 px-[5%]">
      <label className="absolute top-[5px] text-xs font-light text-decorateorange">
        {label}
      </label>
      <select
        value={inputValue}
        name={inputName}
        onChange={changeOptions}
        className="h-[60px] w-full border-none bg-transparent text-darktext outline-none"
      >
        {optionValues.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-darkbackground text-lightbackground/80"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
