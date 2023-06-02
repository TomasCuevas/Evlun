import { ChangeEvent, useRef } from "react";

//* icons *//
import { BsCamera } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

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
          <img
            src={banner}
            alt="banner img"
            className="h-[130px] w-full bg-orange/30 object-cover object-center xs:h-[150px] sm:h-[200px]"
          />
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center gap-[20px] bg-background/70">
            <span
              onClick={() => fileInputRef.current!.click()}
              className="grid cursor-pointer place-items-center rounded-full border border-orange/50 bg-orange/50 p-2 text-2xl text-white/80 hover:bg-orange hover:text-white"
            >
              <BsCamera />
            </span>
            <span
              onClick={() => {
                fileInputRef.current!.value = "";
                loadNewBanner(false);
                deleteBanner(true);
              }}
              className="grid cursor-pointer place-items-center rounded-full border border-orange/50 bg-orange/50 p-2 text-2xl text-white/80 hover:bg-orange hover:text-white"
            >
              <MdOutlineClose />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="h-[130px] w-full bg-orange/30 object-cover object-center xs:h-[150px] sm:h-[200px]"></div>
          <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center gap-[20px] bg-background/70">
            <span
              onClick={() => fileInputRef.current!.click()}
              className="grid cursor-pointer place-items-center rounded-full border border-orange/50 bg-orange/50 p-2 text-2xl text-white/80 hover:bg-orange hover:text-white"
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
