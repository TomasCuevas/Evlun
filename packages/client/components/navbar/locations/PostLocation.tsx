//* components *//
import { BackArrow, NavText } from "@/components/navbar";

export const PostLocation: React.FC = () => {
  return (
    <nav
      style={{ padding: "13px 16px" }}
      className="mx-auto flex h-full w-full items-center"
    >
      <div className="flex h-full w-full items-center gap-[20px]">
        <BackArrow />
        <NavText textBig="Post" />
      </div>
    </nav>
  );
};
