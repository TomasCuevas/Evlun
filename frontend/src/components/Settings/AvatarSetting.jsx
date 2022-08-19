import { useRef } from 'react';

//* icons *//
import { BsCamera } from 'react-icons/bs';

//* tailwind-classes *//
const iconsContainerClass =
  'flex justify-center items-center gap-[20px] absolute top-0 left-0 h-full w-full';
const iconContainerClass =
  'grid cursor-pointer place-items-center rounded-full border border-decorateorange/50 bg-decorateorange/20 p-2 text-2xl text-text/50 transition-all duration-300 hover:bg-decorateorange/40 hover:text-text';

export const AvatarSetting = ({ loadAvatar, preview }) => {
  const fileInputRef = useRef();

  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    loadAvatar(target.files[0]);
  };

  return (
    <div className="relative h-[60px]">
      <div className="absolute left-0 top-[-45px]">
        <div className={iconsContainerClass}>
          <span
            onClick={() => fileInputRef.current.click()}
            className={iconContainerClass}
          >
            <BsCamera />
          </span>
        </div>
        <img
          src={preview}
          alt="user img"
          className="h-[90px] w-[90px] rounded-full border-[2px] border-decorateorange bg-decorateorange object-cover object-center"
        />
      </div>
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
