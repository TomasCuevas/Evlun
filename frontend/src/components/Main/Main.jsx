export const Main = ({ children }) => {
  return (
    <main className="relative flex min-h-screen w-full max-w-[400px] flex-col bg-darkbackground">
      {children}
    </main>
  );
};
