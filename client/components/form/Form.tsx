//* interface *//
interface Props {
  onSubmit: any;
  children: React.ReactNode;
  className?: string;
  autocomplete?: boolean;
}

export const Form: React.FC<Props> = ({
  onSubmit,
  children,
  className,
  autocomplete = true,
}) => {
  return (
    <form
      onSubmit={(event) => onSubmit(event)}
      className={className ? className : "my-[25px] flex flex-col gap-2"}
      autoComplete={autocomplete ? "on" : "off"}
    >
      {children}
    </form>
  );
};
