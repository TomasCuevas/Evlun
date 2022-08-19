export const FormButtonPrimary = ({ buttonText, buttonSubmit, option }) => {
  return (
    <button
      disabled={option}
      onClick={buttonSubmit}
      className="my-[10px] mx-0 h-[50px] cursor-pointer rounded-md border border-text bg-darkbackground text-xl font-bold text-text opacity-80 shadow-sm shadow-decorateorange  outline-none hover:opacity-100 hover:shadow-lg hover:shadow-decorateorange/20 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-sm"
    >
      {buttonText}
    </button>
  );
};
