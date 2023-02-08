import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { countries, Country } from "countries-list";

//* components *//
import { FullLoader } from "../../components/ui";
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormSelectOption,
} from "../../components/form";

//* layout *//
import { SettingLayout } from "../../components/layouts";

//* hooks *//
import { useForm } from "../../hooks";

//* services *//
import { settingServices } from "../../services";

//* context *//
import { AuthContext } from "../../context";

const fullCountries: any = countries;
const AllCountries: Country[] = [];
for (const country in fullCountries) {
  AllCountries.push(fullCountries[country].name);
}

const SettingsCountryPage: NextPage = () => {
  const { user, isAuthenticated, onChecking } = useContext(AuthContext);

  const {
    newCountry,
    onInputChange,
    error,
    setError,
    isSending,
    setIsSending,
  } = useForm({
    newCountry: "",
  });

  const router = useRouter();

  const onSave = async () => {
    const formData = new FormData();
    formData.append("country", newCountry);

    setIsSending(true);
    const result = await settingServices("/country", formData);
    setIsSending(false);

    if (result.ok) {
      await onChecking();
    } else {
      setError(result.msg);
    }
  };

  useEffect(() => {
    if (user) {
      onInputChange({
        target: {
          name: "newCountry",
          value: user.country ? user.country : "",
        },
      });
    }
  }, [user]);

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Cambiar pais"
        title="Cambiar pais | Evlun"
        description="Pagina para cambiar/modificar el pais en Evlun"
      >
        <section className="px-[5%]">
          <Form onSubmit={onSave}>
            <FormSelectOption
              inputChange={onInputChange}
              inputName="newCountry"
              inputValue={newCountry}
              label="Pais"
              optionValues={AllCountries}
            />
            <FormButtonPrimary
              isDisabled={isSending}
              label="Guardar"
              type="submit"
            />
            {error ? <FormErrorMessage message={error} /> : null}
          </Form>
        </section>
      </SettingLayout>
    );
  }

  return <FullLoader />;
};

export default SettingsCountryPage;
