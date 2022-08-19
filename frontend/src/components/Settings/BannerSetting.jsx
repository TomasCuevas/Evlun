import { useRef } from 'react';

//* icons *//
import { BsCamera } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

//* tailwind-classes *//
const bannerClass =
  'bg-decorateorange/30 h-[130px] w-full object-cover object-center';
const iconsContainerClass =
  'flex justify-center items-center gap-[20px] absolute top-0 left-0 h-full w-full bg-darkbackground/70';
const iconContainerClass =
  'grid cursor-pointer place-items-center rounded-full border border-decorateorange/50 bg-decorateorange/20 p-2 text-2xl text-text/50 transition-all duration-300 hover:bg-decorateorange/40 hover:text-text';

export const BannerSetting = ({ loadBanner, preview }) => {
  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    loadBanner(target.files[0]);
  };

  return (
    <div className="relative min-w-full overflow-hidden">
      {preview ? (
        <>
          <img src={preview} alt="banner img" className={bannerClass} />
          <div className={iconsContainerClass}>
            <span
              onClick={() => fileInputRef.current.click()}
              className={iconContainerClass}
            >
              <BsCamera />
            </span>
            <span
              onClick={() => loadBanner(false)}
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
              onClick={() => fileInputRef.current.click()}
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
        style={{ display: 'none' }}
        accept=".png, .jpg"
      />
    </div>
  );
};
