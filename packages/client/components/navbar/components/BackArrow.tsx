import { useRouter } from "next/router";

//* icons *//
import { BsArrowLeftShort } from "react-icons/bs";

export const BackArrow: React.FC = () => {
  const { back } = useRouter();

  return (
    <div className="flex items-center justify-start" onClick={() => back()}>
      <BsArrowLeftShort className="cursor-pointer text-3xl text-orange/70 hover:text-orange" />
    </div>
  );
};
