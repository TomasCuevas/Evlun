//* interface *//
interface Props {
  onClick: () => void;
}

export const Follow: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex h-[35px] cursor-pointer items-center justify-center rounded-full bg-orange py-[7px] px-[15px] hover:bg-orange/80"
    >
      <span className="text-[15px] font-bold text-white">Seguir</span>
    </div>
  );
};
