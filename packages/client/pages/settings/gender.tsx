import { useEffect } from "react";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";

//* components *//
import { FullLoader } from "@/components/ui";
import {
  Form,
  FormButtonPrimary,
  FormCheckbox,
  FormErrorMessage,
} from "@/components/form";

//* layout *//
import { SettingLayout } from "@/layouts";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsGenderPage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: { gender: user?.gender || "" },
    validationSchema: Yup.object({
      gender: Yup.string().oneOf(["Masculino", "Femenino", "Otro"]).required(),
    }),
    onSubmit: async (formValues) => {
      try {
        await settingServices("gender", formValues);
        await onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg);
      }
    },
  });

  useEffect(() => {
    if (user) formik.setFieldValue("gender", user.gender);
  }, [user]);

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Género" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Cambiar género | Evlun"
      description="Pagina para cambiar/modificar el genero en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={formik.handleSubmit}>
          <FormCheckbox
            inputName="gender"
            isChecked={formik.values.gender === "Femenino"}
            label="Femenino"
            onCheckChange={formik.handleChange}
            inputValue={formik.values.gender === "Femenino" ? "" : "Femenino"}
          />
          <FormCheckbox
            inputName="gender"
            isChecked={formik.values.gender === "Masculino"}
            label="Masculino"
            onCheckChange={formik.handleChange}
            inputValue={formik.values.gender === "Masculino" ? "" : "Masculino"}
          />
          <FormCheckbox
            inputName="gender"
            isChecked={formik.values.gender === "Otro"}
            label="Otro"
            onCheckChange={formik.handleChange}
            inputValue={formik.values.gender === "Otro" ? "" : "Otro"}
          />
          <FormButtonPrimary
            isDisabled={
              Object.keys(formik.errors).length > 0 ||
              formik.values.gender === user?.gender
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

export default SettingsGenderPage;
