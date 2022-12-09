import { ChangeEvent, useRef } from "react";

//* icons *//
import { BsCamera } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

//* tailwind-classes *//
const bannerClass =
  "h-[130px] w-full bg-orange/30 object-cover object-center xs:h-[150px] sm:h-[200px]";
const iconsContainerClass =
  "flex justify-center items-center gap-[20px] absolute top-0 left-0 h-full w-full bg-bluedark/70";
const iconContainerClass =
  "grid cursor-pointer place-items-center rounded-full border border-orange/50 bg-orange/50 p-2 text-2xl text-white/80 transition-all duration-300 hover:bg-orange hover:text-white";

//* interface *//
interface Props {
  banner: string | null;
  loadNewBanner: (file: File | false) => void;
  deleteBanner: React.Dispatch<any>;
}

export const BannerSetting: React.FC<Props> = ({
  banner,
  loadNewBanner,
  deleteBanner,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 0) return;
    loadNewBanner(event.target.files![0]);
  };

  return (
    <section className="relative min-w-full overflow-hidden">
      {banner ? (
        <>
          <img src={banner} alt="banner img" className={bannerClass} />
          <div className={iconsContainerClass}>
            <span
              onClick={() => fileInputRef.current!.click()}
              className={iconContainerClass}
            >
              <BsCamera />
            </span>
            <span
              onClick={() => {
                fileInputRef.current!.value = "";
                loadNewBanner(false);
                deleteBanner(true);
              }}
              className={iconContainerClass}
            >
              <MdOutlineClose />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className={bannerClass}></div>
          <div className={iconsContainerClass}>
            <span
              onClick={() => fileInputRef.current!.click()}
              className={iconContainerClass}
            >
              <BsCamera />
            </span>
          </div>
        </>
      )}
      <input
        ref={fileInputRef}
        type="file"
        onChange={onFileInputChange}
        style={{ display: "none" }}
        accept=".png, .jpg"
      />
    </section>
  );
};
