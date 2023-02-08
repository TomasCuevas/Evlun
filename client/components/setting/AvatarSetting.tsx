import { ChangeEvent, useRef } from "react";

//* icons *//
import { BsCamera } from "react-icons/bs";

//* tailwind-classes *//
const iconsContainerClass =
  "flex justify-center items-center gap-[20px] absolute top-0 left-0 h-full w-full";
const iconContainerClass =
  "grid cursor-pointer place-items-center rounded-full border border-orange/50 bg-orange/50 p-2 text-2xl text-white/80 transition-all duration-300 hover:bg-orange/40 hover:text-white";

//* interface *//
interface Props {
  avatar: string;
  loadNewAvatar: (file: File | false) => void;
}

export const AvatarSetting: React.FC<Props> = ({ avatar, loadNewAvatar }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 0) return;
    loadNewAvatar(event.target.files![0]);
  };

  return (
    <div className="relative h-[60px]">
      <div className="absolute left-0 top-[-45px]">
        <div className={iconsContainerClass}>
          <span
            onClick={() => fileInputRef.current!.click()}
            className={iconContainerClass}
          >
            <BsCamera />
          </span>
        </div>
        <img
          src={avatar}
          alt="user img"
          className="h-[90px] w-[90px] rounded-full border-[2px] border-orange bg-orange object-cover object-center"
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileInputChange}
        style={{ display: "none" }}
        accept=".png, .jpg"
      />
    </div>
  );
};
