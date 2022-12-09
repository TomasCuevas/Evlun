interface Props {
  message: string;
}

export const FormErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="m-0 flex items-center justify-center rounded-md border border-error font-bold">
      <span className="p-[10px] text-center text-sm text-error">{message}</span>
    </div>
  );
};
