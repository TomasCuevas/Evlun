import { useRouter } from "next/router";

//* icons *//
import { BsArrowLeftShort } from "react-icons/bs";

export const BackArrow: React.FC = () => {
  const { back } = useRouter();

  return (
    <div
      className="flex items-center justify-start rounded-full hover:bg-white/5"
      onClick={() => back()}
    >
      <BsArrowLeftShort className="cursor-pointer text-4xl text-orange" />
    </div>
  );
};
