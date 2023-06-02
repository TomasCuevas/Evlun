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
import { passwordRegex } from "@/regex";

//* layout *//
import { SettingLayout } from "@/layouts";

//* services *//
import { settingServices } from "@/services";

//* form-values and form-validations
const formValues = () => ({
  currentPassword: "",
  newPassword: "",
  repeatNewPassword: "",
});

const formValidations = () => {
  return Yup.object({
    currentPassword: Yup.string().matches(passwordRegex).required(),
    newPassword: Yup.string()
      .matches(passwordRegex)
      .notOneOf([Yup.ref("currentPassword")])
      .required(),
    repeatNewPassword: Yup.string()
      .matches(passwordRegex)
      .oneOf([Yup.ref("newPassword")])
      .required(),
  });
};

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsPasswordPage: NextPage = () => {
  const { onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: formValues(),
    validationSchema: formValidations(),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      try {
        await settingServices("password", formValues);
        await onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error.");
      }
    },
  });

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar tu contraseña" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Cambiar contraseña | Evlun"
      description="Pagina para cambiar/modificar el correo electronico en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={formik.handleSubmit}>
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="currentPassword"
            inputValue={formik.values.currentPassword}
            label="Contraseña actual"
            inputType="password"
          />
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="newPassword"
            inputValue={formik.values.newPassword}
            label="Nueva contraseña"
            inputType="password"
          />
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="repeatNewPassword"
            inputValue={formik.values.repeatNewPassword}
            label="Confirmar contraseña"
            inputType="password"
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

export default SettingsPasswordPage;
