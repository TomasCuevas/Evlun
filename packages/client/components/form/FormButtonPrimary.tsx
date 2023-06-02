//* interface *//
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
          : "border-text  my-[10px] mx-0 h-[50px] cursor-pointer rounded-md border border-orange bg-background text-xl font-bold text-orange outline-none hover:bg-orange hover:text-white  disabled:cursor-not-allowed disabled:border-white disabled:text-white disabled:opacity-40"
      }
    >
      {label}
    </button>
  );
};
