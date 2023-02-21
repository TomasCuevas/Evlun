import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";
import {
  Form,
  FormButtonPrimary,
  FormCheckbox,
  FormErrorMessage,
} from "../../components/form";

//* layout *//
import { SettingLayout } from "../../components/layouts";

//* hooks *//
import { useForm } from "../../hooks";

//* services *//
import { settingServices } from "../../services";

//* context *//
import { AuthContext } from "../../context";

const SettingsGenderPage: NextPage = () => {
  const { user, isAuthenticated, onChecking } = useContext(AuthContext);

  const { newGender, onInputChange, error, setError, isSending, setIsSending } =
    useForm({
      newGender: "",
    });

  const router = useRouter();

  const onSave = async () => {
    const formData = new FormData();
    formData.append("gender", newGender);

    setIsSending(true);
    const result = await settingServices("gender", formData);
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
          name: "newGender",
          value: user.gender ? user.gender : "",
        },
      });
    }
  }, [user]);

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Genero"
        title="Cambiar genero | Evlun"
        description="Pagina para cambiar/modificar el genero en Evlun"
      >
        <section className="px-[5%]">
          <Form onSubmit={onSave}>
            <FormCheckbox
              inputName="newGender"
              isChecked={newGender === "Femenino"}
              label="Femenino"
              onCheckChange={onInputChange}
              inputValue={newGender === "Femenino" ? "" : "Femenino"}
            />
            <FormCheckbox
              inputName="newGender"
              isChecked={newGender === "Masculino"}
              label="Masculino"
              onCheckChange={onInputChange}
              inputValue={newGender === "Masculino" ? "" : "Masculino"}
            />
            <FormCheckbox
              inputName="newGender"
              isChecked={newGender === "Otro"}
              label="Otro"
              onCheckChange={onInputChange}
              inputValue={newGender === "Otro" ? "" : "Otro"}
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

export default SettingsGenderPage;
