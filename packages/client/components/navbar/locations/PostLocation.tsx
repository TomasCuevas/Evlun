//* components *//
import { BackArrow } from "@/components/navbar";

export const PostLocation: React.FC = () => {
  return (
    <nav className="mx-auto flex h-full w-full items-center">
      <div className="flex h-full w-full items-center gap-[20px]">
        <BackArrow />
        <span className="font-bold text-orange">Post</span>
      </div>
    </nav>
  );
};
