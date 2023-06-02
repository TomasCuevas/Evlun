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

//* components *//
import { ProfileDeactivate } from "@/components/setting";

//* services *//
import { deactivateService } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsDeactivatePage: NextPage = () => {
  const { onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: Yup.object({
      password: Yup.string().matches(passwordRegex).required(),
    }),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      try {
        await deactivateService(formValues);
        formik.resetForm();
        await onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error.");
      }
    },
  });

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Desactivar tu cuenta" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Desactivar tu cuenta | Evlun"
      description="Pagina para desactivar cuenta en Evlun"
    >
      <ProfileDeactivate />
      <section className="mt-[30px] flex flex-col px-4">
        <span className="border-b border-orange py-3 text-xl font-extrabold text-white">
          Esta acción desactivará tu cuenta
        </span>
        <span className="border-b border-orange py-3 text-base font-light text-white/80">
          Estás por iniciar el proceso de desactivación de tu cuenta de Evlun.
          Tu nombre visible, tu @usuario y tu perfil público ya no se podrán ver
          en Evlun.
        </span>
        <Form onSubmit={formik.handleSubmit}>
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="password"
            inputValue={formik.values.password}
            label="Confirmar contraseña"
            inputType="password"
          />
          <FormButtonPrimary
            label="Desactivar"
            type="submit"
            isDisabled={Object.keys(formik.errors).length > 0}
            className="mt-2 flex h-[50px] w-full cursor-pointer items-center justify-center rounded-md border border-error font-bold text-error disabled:cursor-not-allowed disabled:border-error/50 disabled:text-error/60"
          />
          {formik.status ? <FormErrorMessage message={formik.status} /> : null}
        </Form>
      </section>
    </SettingLayout>
  );
};

export default SettingsDeactivatePage;
