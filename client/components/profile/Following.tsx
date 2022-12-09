import { useState } from "react";

interface Props {
  onClick: () => void;
}

export const Following: React.FC<Props> = ({ onClick }) => {
  const [text, setText] = useState("Siguiendo");

  const unfollow = () => setText("Dejar de seguir");
  const defaultValue = () => setText("Siguiendo");

  return (
    <div
      onClick={onClick}
      onMouseOver={unfollow}
      onMouseLeave={defaultValue}
      className="flex h-[35px] cursor-pointer items-center justify-center rounded-full border border-orange text-white transition-all duration-300 hover:border-error hover:text-error"
    >
      <span className="block h-full w-full py-[7px] px-[15px] leading-[18px]">
        {text}
      </span>
    </div>
  );
};
