interface Props {
  className?: string;
  isDisabled: boolean;
  label: string;
  type: "button" | "submit" | "reset";
  onClick?: any;
}

export const FormButtonPrimary: React.FC<Props> = ({
  className,
  isDisabled,
  label,
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={() => {
        onClick ? onClick() : null;
      }}
      type={type}
      disabled={isDisabled}
      className={
        className
          ? className
          : "border-text shadow-decorateorange my-[10px] mx-0 h-[50px] cursor-pointer rounded-md border bg-bluedark text-xl font-bold text-white opacity-80 shadow-sm  outline-none transition-all duration-300 hover:opacity-100 hover:shadow-lg hover:shadow-orange/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-sm"
      }
    >
      {label}
    </button>
  );
};
