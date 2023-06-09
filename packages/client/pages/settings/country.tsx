import { useEffect } from "react";
import { NextPage } from "next";
import { countries, Country } from "countries-list";
import { useFormik } from "formik";

//* components *//
import { FullLoader } from "@/components/ui";
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormSelectOption,
} from "@/components/form";

//* layout *//
import { SettingLayout } from "@/layouts";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

//* countries *//
const fullCountries: any = countries;
const AllCountries: Country[] = [];
for (const country in fullCountries) {
  AllCountries.push(fullCountries[country].name);
}

const SettingsCountryPage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetNavbarData } = useNavbarTopStore();

  const formik = useFormik({
    initialValues: { country: user?.country || "" },
    onSubmit: async (formValues) => {
      try {
        await settingServices("country", formValues);
        onChecking();
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error.");
      }
    },
  });

  useEffect(() => {
    if (user) formik.setFieldValue("country", user.country);
  }, [user]);

  useEffect(() => {
    onSetNavbarData({ settingText: "Cambiar país" });
  }, []);

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <SettingLayout
      title="Cambiar país | Evlun"
      description="Pagina para cambiar/modificar el pais en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={formik.handleSubmit}>
          <FormSelectOption
            inputChange={formik.handleChange}
            inputName="country"
            inputValue={formik.values.country}
            label="Pais"
            optionValues={AllCountries}
          />
          <FormButtonPrimary
            isDisabled={
              formik.isSubmitting || formik.values.country === user?.country
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

export default SettingsCountryPage;
