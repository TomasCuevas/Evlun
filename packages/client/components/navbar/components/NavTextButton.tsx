//* interface *//
interface Props {
  text: string;
  onClick: any;
}

export const NavTextButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center justify-center rounded-full border border-orange py-[7px] px-4 hover:bg-orange/10"
    >
      <span className="text-[15px] font-bold text-white">{text}</span>
    </button>
  );
};
