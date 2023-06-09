import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
useRouter;

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

//* regexs *//
import { biographyRegex, locationRegex, nameRegex } from "@/regex";

//* form-values and form-validations
const formValues = (
  avatar: string,
  banner?: string,
  biography?: string,
  location?: string,
  name?: string
) => ({
  avatar: avatar,
  banner: banner || "",
  biography: biography || "",
  location: location || "",
  name: name || "",
});

const formValidation = () => {
  return Yup.object({
    avatar: Yup.string().required(),
    banner: Yup.string(),
    biography: Yup.string().matches(
      biographyRegex,
      "Por favor, ingresa una biografía válida."
    ),
    location: Yup.string().matches(
      locationRegex,
      "Por favor, ingresa una ubicación válida."
    ),
    name: Yup.string()
      .matches(nameRegex, "Por favor, ingresa un nombre válido.")
      .required("Por favor, ingresa tu nombre."),
  });
};

//* service *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingProfilePage: NextPage = () => {
  const { user, onCheckingWithoutLoader } = useAuthStore();
  const { onSetNavbarData } = useNavbarTopStore();

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [bannerPreview, setBannerPreview] = useState(user?.banner || "");
  const [deleteBanner, setDeleteBanner] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: formValues(
      user?.avatar || "",
      user?.banner,
      user?.biography,
      user?.location,
      user?.name
    ),
    validationSchema: formValidation(),
    onSubmit: async (formValues) => {
      try {
        await settingServices("profile", {
          ...formValues,
          noBanner: deleteBanner ? true : false,
        });

        router.replace(`/${user?.username}`);
        onCheckingWithoutLoader();
      } catch (error: any) {
        formik.setStatus(error.msg);
      }
    },
  });

  //! on load new banner
  const onLoadNewBanner = (newBanner: File | false) => {
    if (!newBanner) {
      setBannerPreview("");
      formik.setFieldValue("banner", "");
    } else {
      setBannerPreview(URL.createObjectURL(newBanner));
      formik.setFieldValue("banner", newBanner);
    }
  };

  //! on load new avatar
  const onLoadNewAvatar = (newAvatar: File | false) => {
    if (!newAvatar) {
      setAvatarPreview("");
      formik.setFieldValue("avatar", "");
    } else {
      setDeleteBanner(false);
      setAvatarPreview(URL.createObjectURL(newAvatar));
      formik.setFieldValue("avatar", newAvatar);
    }
  };

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar);
      setBannerPreview(user?.banner || "");
      formik.setValues({
        avatar: user.avatar,
        banner: user.banner || "",
        biography: user.biography || "",
        location: user.location || "",
        name: user.name,
      });
    }
  }, [user]);

  useEffect(() => {
    onSetNavbarData({
      isButton: true,
      buttonOnClick: () => formik.submitForm(),
      buttonText: "Guardar",
      settingText: "Editar perfil",
    });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

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
          <Form onSubmit={formik.handleSubmit}>
            <FormInputPrimary
              inputChange={formik.handleChange}
              inputName="name"
              inputValue={formik.values.name}
              label="Nombre"
              max={30}
            />
            <FormTextareaPrimary
              inputChange={formik.handleChange}
              inputName="biography"
              inputValue={formik.values.biography}
              label="Biografia"
              max={300}
            />
            <FormInputPrimary
              inputChange={formik.handleChange}
              inputName="location"
              inputValue={formik.values.location}
              label="Ubicacion"
              max={30}
            />
            {Object.keys(formik.errors).length > 0 && (
              <FormErrorMessage
                message={
                  formik.errors.biography ||
                  formik.errors.location ||
                  formik.errors.name ||
                  ""
                }
              />
            )}
            {formik.status ? (
              <FormErrorMessage message={formik.status} />
            ) : null}
          </Form>
        </div>
      </section>
    </SettingLayout>
  );
};

export default SettingProfilePage;
