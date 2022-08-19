export const CancelMore = ({ handleMore }) => {
  return (
    <div
      onClick={handleMore}
      className="m-[10px] grid w-[90%] cursor-pointer place-items-center rounded-full border border-lightbackground p-[10px] text-lightbackground transition-all duration-300 hover:bg-lightbackground hover:text-darktext"
    >
      <span className="font-bold">Cancelar</span>
    </div>
  );
};
