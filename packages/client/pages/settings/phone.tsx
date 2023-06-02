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

//* layout *//
import { SettingLayout } from "@/layouts";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsPhonePage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: { phone: user?.phone || "" },
    validationSchema: Yup.object({
      phone: Yup.string()
        .min(9)
        .max(15)
        .required()
        .test("diferent-value", (value) => value !== user?.phone),
    }),
    onSubmit: async (formValues) => {
      try {
        await settingServices("phone", formValues);
        await onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error.");
      }
    },
  });

  useEffect(() => {
    if (user) formik.setFieldValue("phone", user.phone);
  }, [user]);

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar número de teléfono" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Cambiar número de teléfono | Evlun"
      description="Pagina para cambiar/modificar el numero de telefono en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={formik.handleSubmit}>
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="phone"
            inputValue={formik.values.phone}
            label="Numero de telefono"
            inputType="number"
            max={15}
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

export default SettingsPhonePage;
