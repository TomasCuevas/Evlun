//* interface *//
interface Props {
  inputName: string;
  inputValue: string;
  isChecked: boolean;
  label: string;
  onCheckChange: React.Dispatch<any>;
}

export const FormCheckbox: React.FC<Props> = ({
  inputName,
  inputValue,
  isChecked,
  label,
  onCheckChange,
}) => {
  return (
    <div className="mb-2 flex w-full items-center justify-between border-b border-orange pb-1">
      <label
        className={`text-base ${isChecked ? "text-orange" : "text-white"}`}
      >
        {label}
      </label>
      <input
        type="checkbox"
        name={inputName}
        checked={isChecked}
        onClick={() =>
          onCheckChange({ target: { name: inputName, value: inputValue } })
        }
      />
    </div>
  );
};
