export const FormCheck = ({ checked, inputName, onCheckChange, label }) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-decorateorange pb-2">
      <label className="text-base text-text">{label}</label>
      <input
        type="checkbox"
        name={inputName}
        checked={checked}
        onChange={onCheckChange}
      />
    </div>
  );
};
