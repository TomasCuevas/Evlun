import { useRouter } from "next/router";

//* icons *//
import { BsArrowLeftShort } from "react-icons/bs";

export const BackArrow = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-start"
      onClick={() => router.back()}
    >
      <BsArrowLeftShort className="cursor-pointer text-3xl text-orange/70 hover:text-orange" />
    </div>
  );
};
