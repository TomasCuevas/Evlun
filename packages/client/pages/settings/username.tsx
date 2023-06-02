import { useEffect } from "react";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";

//* components *//
import { FullLoader } from "@/components/ui";
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
} from "@/components/form";

//* regex *//
import { usernameRegex } from "@/regex";

//* layout *//
import { SettingLayout } from "@/layouts";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsUsernamePage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: { username: user?.username || "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(usernameRegex)
        .test("diferent-value", (value) => value !== user?.username)
        .required(),
    }),
    onSubmit: async (formValues) => {
      try {
        await settingServices("username", formValues);
        await onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error.");
      }
    },
  });

  useEffect(() => {
    if (user) formik.setFieldValue("username", user.username);
  }, [user]);

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar nombre de usuario" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Cambiar nombre de usuario | Evlun"
      description="Pagina para cambiar/modificar el nombre de usuario en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={formik.handleSubmit}>
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="username"
            inputValue={formik.values.username}
            label="Nombre de usuario"
            inputType="text"
          />
          <FormButtonPrimary
            isDisabled={Object.keys(formik.errors).length > 0}
            label="Guardar"
            type="submit"
          />
          {formik.status ? <FormErrorMessage message={formik.status} /> : null}
        </Form>
      </section>
    </SettingLayout>
  );
};

export default SettingsUsernamePage;
