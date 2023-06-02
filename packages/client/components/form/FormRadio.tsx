//* interface *//
interface Props {
  inputName: string;
  inputValue: string;
  isChecked: boolean;
  label: string;
  onCheckChange: any;
}

export const FormRadio: React.FC<Props> = ({
  inputName,
  inputValue,
  isChecked,
  label,
  onCheckChange,
}) => {
  return (
    <div
      className={`mb-2 flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2 ${
        isChecked ? "border-orange/60 bg-orange" : "b border-white/60"
      }`}
    >
      <label
        className={`flex w-full cursor-pointer items-center justify-between text-base ${
          isChecked ? "text-white" : "text-white"
        }`}
      >
        <span className="cursor-pointer">{label}</span>
        <input
          type="radio"
          name={inputName}
          value={inputValue}
          checked={isChecked}
          onChange={onCheckChange}
          className="cursor-pointer"
        />
      </label>
    </div>
  );
};
