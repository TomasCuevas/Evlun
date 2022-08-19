export const Form = ({ autocomplete = 'off', formSubmit, children }) => {
  return (
    <form
      onSubmit={formSubmit}
      className="mx-0 my-[30px] flex flex-col gap-3"
      autoComplete={autocomplete}
    >
      {children}
    </form>
  );
};
