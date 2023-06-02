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
import { emailRegex } from "@/regex";

//* layout *//
import { SettingLayout } from "@/layouts";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsEmailPage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: { email: user?.email || "" },
    validationSchema: Yup.object({
      email: Yup.string().matches(emailRegex).required(),
    }),
    onSubmit: async (formValues) => {
      try {
        await settingServices("email", formValues);
        await onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg);
      }
    },
  });

  useEffect(() => {
    if (user) formik.setFieldValue("email", user.email);
  }, [user]);

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar el correo electrónico" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Cambiar el correo electrónico | Evlun"
      description="Pagina para cambiar/modificar el correo electronico en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={formik.handleSubmit}>
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="email"
            inputValue={formik.values.email}
            label="Correo electronico"
            inputType="text"
          />
          <FormButtonPrimary
            isDisabled={
              Object.keys(formik.errors).length > 0 ||
              formik.values.email === user?.email
            }
            label="Guardar"
            type="submit"
          />
          {formik.status ? <FormErrorMessage message={formik.status} /> : null}
        </Form>
      </section>
    </SettingLayout>
  );
};

export default SettingsEmailPage;
