import { useState, useEffect } from 'react';

//* components *//
import {
  AvatarSetting,
  BannerSetting,
  ButtonNavbar,
} from '../../components/Settings';
import { Main } from '../../components/Main/Main';
import {
  FormErrorMessage,
  FormInputPrimary,
  FormTextareaPrimary,
} from '../../components/Form';

//* layout *//
import { NavTopSettings } from '../../layouts/NavTopSettings/NavTopSettings';

//* hooks *//
import { useAuthStore, useForm, useUpdateUser } from '../../hooks';

//* helpers *//
import {
  biographyValidation,
  locationValidation,
  nameValidation,
} from '../../helpers';

//* pages *//
import { LoadingPage } from '../LoadingPage/LoadingPage';

export const SettingsProfile = () => {
  const { errorMessage, setErrorMessage, startUpdating, isLoading } =
    useUpdateUser();
  const {
    avatar: userAvatar,
    banner: userBanner,
    name: userName,
    biography: userBiography,
    location: userLocation,
  } = useAuthStore();

  const { name, biography, location, onInputChange } = useForm({
    name: userName || '',
    biography: userBiography || '',
    location: userLocation || '',
  });

  const [avatar, setAvatar] = useState(userAvatar || null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [banner, setBanner] = useState(userBanner || null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const onSave = () => {
    const formData = new FormData();

    if (typeof avatar === 'object' && avatar)
      formData.append('avatar', avatar, 'avatar');

    if (typeof banner === 'object' && banner)
      formData.append('banner', banner, 'banner');

    if (banner === false) formData.append('banner', banner);

    if (nameValidation(name)) {
      formData.append('name', name);
    } else {
      return setErrorMessage('El nombre ingresado no es valido.');
    }

    if (biographyValidation(biography)) {
      formData.append('biography', biography);
    } else {
      return setErrorMessage('La biografia ingresado no es valida.');
    }

    if (locationValidation(location)) {
      formData.append('location', location);
    } else {
      return setErrorMessage('La ubicacion  ingresada no es valida.');
    }

    startUpdating(formData);
  };

  useEffect(() => {
    if (avatar !== userAvatar && userAvatar)
      return setAvatarPreview(URL.createObjectURL(avatar));
    if (avatar !== userAvatar && !userAvatar)
      return setAvatarPreview(URL.createObjectURL(avatar));
    if (userAvatar) return setAvatarPreview(userAvatar);
    return setAvatarPreview(false);
  }, [avatar]);

  useEffect(() => {
    if (banner === false) return setBannerPreview(false);
    if (banner !== userBanner && userBanner)
      return setBannerPreview(URL.createObjectURL(banner));
    if (banner && !userBanner)
      return setBannerPreview(URL.createObjectURL(banner));
    if (userBanner) return setBannerPreview(userBanner);
  }, [banner]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Main>
        <NavTopSettings
          navText="Editar perfil"
          button={ButtonNavbar}
          buttonText="Guardar"
          onClick={onSave}
        />
        <BannerSetting loadBanner={setBanner} preview={bannerPreview} />
        <div className="mx-auto w-[90%]">
          <AvatarSetting loadAvatar={setAvatar} preview={avatarPreview} />
          <section className="flex w-full flex-col gap-[20px]">
            <FormInputPrimary
              inputName="name"
              inputValue={name}
              inputChange={onInputChange}
              label="Nombre"
              max={30}
            />
            <FormTextareaPrimary
              inputName="biography"
              inputValue={biography}
              inputChange={onInputChange}
              label="Biografia"
              max={300}
            />
            <FormInputPrimary
              inputName="location"
              inputValue={location}
              inputChange={onInputChange}
              label="Ubicacion"
              max={30}
            />
            {errorMessage && <FormErrorMessage message={errorMessage} />}
          </section>
        </div>
      </Main>
    </>
  );
};
