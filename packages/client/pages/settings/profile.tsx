import { useState, useEffect } from "react";
import { NextPage } from "next";

//* layout *//
import { SettingLayout } from "@/layouts";

//* components *//
import { AvatarSetting, BannerSetting } from "@/components/setting";
import { FullLoader } from "@/components/ui";
import {
  Form,
  FormErrorMessage,
  FormInputPrimary,
  FormTextareaPrimary,
} from "@/components/form";

//* helpers *//
import {
  biographyValidation,
  locationValidation,
  nameValidation,
} from "@/helpers";

//* hooks *//
import { useForm } from "@/hooks";

//* service *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingProfilePage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const [avatar, setAvatar] = useState<File | false>(false);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    user?.avatar || ""
  );
  const [banner, setBanner] = useState<File | false>(false);
  const [deleteBanner, setDeleteBanner] = useState<boolean>(false);
  const [bannerPreview, setBannerPreview] = useState<string>(
    user?.banner || ""
  );

  const {
    biography,
    location,
    name,
    onInputChange,
    setError,
    error,
    setIsSending,
    isSending,
  } = useForm({
    name: user?.name || "",
    biography: user?.biography || "",
    location: user?.location || "",
  });

  //! on load new banner
  const onLoadNewBanner = (newBanner: File | false) => {
    if (!newBanner) {
      setBannerPreview("");
      setBanner(false);
    } else {
      setBannerPreview(URL.createObjectURL(newBanner!));
      setBanner(newBanner);
    }
  };

  //! on load new avatar
  const onLoadNewAvatar = (newAvatar: File | false) => {
    if (!newAvatar) {
      setAvatarPreview("");
      setAvatar(false);
    } else {
      setAvatarPreview(URL.createObjectURL(newAvatar!));
      setAvatar(newAvatar);
    }
  };

  //! on save data
  const onSave = async () => {
    const formData = new FormData();

    avatar ? formData.append("avatar", avatar, "avatar") : null;
    banner ? formData.append("banner", banner, "banner") : null;
    deleteBanner ? formData.append("noBanner", "false") : null;

    if (biographyValidation(biography)) {
      formData.append("biography", biography);
    } else {
      return setError("La biografia ingresada no es valida.");
    }
    if (locationValidation(location)) {
      formData.append("location", location);
    } else {
      return setError("La ubicacion ingresada no es valida.");
    }
    if (nameValidation(name)) {
      formData.append("name", name);
    } else {
      return setError("El nombre ingresado no es valido.");
    }

    setIsSending(true);
    const result = await settingServices("profile", formData);
    setIsSending(false);

    if (result.ok) {
      await onChecking();
    } else {
      setError(result.msg);
    }
  };

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar || "");
      setBannerPreview(user.banner || "");
      onInputChange({
        target: {
          name: "name",
          value: user.name,
        },
      });
      onInputChange({
        target: {
          name: "biography",
          value: user.biography || "",
        },
      });
      onInputChange({
        target: {
          name: "location",
          value: user.location || "",
        },
      });
    }

    onSetLocation("settings");
    onSetNavbarData({
      isButton: true,
      buttonOnClick: () => onSave(),
      buttonText: "Guardar",
      settingText: "Editar perfil",
    });
  }, [user]);

  if (isSending) return <FullLoader />;
  return (
    <SettingLayout
      title={`${user?.name} (${user?.username}) | Evlun`}
      description="Editar avatar, banner, nombre, biografia y ubicacion en Evlun"
    >
      <BannerSetting
        banner={bannerPreview}
        loadNewBanner={onLoadNewBanner}
        deleteBanner={setDeleteBanner}
      />
      <section className="px-[5%]">
        <AvatarSetting avatar={avatarPreview} loadNewAvatar={onLoadNewAvatar} />
        <div>
          <Form onSubmit={onSave}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="name"
              inputValue={name}
              label="Nombre"
              max={30}
            />
            <FormTextareaPrimary
              inputChange={onInputChange}
              inputName="biography"
              inputValue={biography}
              label="Biografia"
              max={300}
            />
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="location"
              inputValue={location}
              label="Ubicacion"
              max={30}
            />
            {error ? <FormErrorMessage message={error} /> : null}
          </Form>
        </div>
      </section>
    </SettingLayout>
  );
};

export default SettingProfilePage;
