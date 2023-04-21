import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
} from "../../components/form";

//* layout *//
import { SettingLayout } from "../../components/layouts";

//* hooks *//
import { useForm } from "../../hooks";

//* helpers *//
import { passwordValidation } from "../../helpers";

//* services *//
import { settingServices } from "../../services";

//* context *//
import { AuthContext } from "../../context";

const SettingsPasswordPage: NextPage = () => {
  const { isAuthenticated, onChecking } = useContext(AuthContext);

  const {
    currentPassword,
    newPassword,
    repeatNewPassword,
    onInputChange,
    error,
    setError,
    isSending,
    setIsSending,
    reset,
  } = useForm({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const router = useRouter();

  const onSave = async () => {
    const formData = new FormData();
    let error = false;
    setError("");

    if (passwordValidation(currentPassword)) {
      formData.append("currentPassword", currentPassword);
    } else {
      error = true;
    }

    if (passwordValidation(newPassword)) {
      formData.append("newPassword", newPassword);
    } else {
      error = true;
    }

    if (passwordValidation(repeatNewPassword)) {
      formData.append("repeatNewPassword", repeatNewPassword);
    } else {
      error = true;
    }

    if (error) {
      return setError(
        "Alguna de las contraseñas ingresada no tiene un formato valido."
      );
    }

    setIsSending(true);
    const result = await settingServices("password", formData);
    setIsSending(false);

    if (result.ok) {
      reset();
      await onChecking();
    } else {
      setError(result.msg);
    }
  };

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Cambiar tu contraseña"
        title="Cambiar contraseña | Evlun"
        description="Pagina para cambiar/modificar el correo electronico en Evlun"
      >
        <section className="px-[5%]">
          <Form onSubmit={onSave}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="currentPassword"
              inputValue={currentPassword}
              label="Contraseña actual"
              inputType="password"
            />
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="newPassword"
              inputValue={newPassword}
              label="Nueva contraseña"
              inputType="password"
            />
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="repeatNewPassword"
              inputValue={repeatNewPassword}
              label="Confirmar contraseña"
              inputType="password"
            />
            <FormButtonPrimary
              isDisabled={
                isSending ||
                !passwordValidation(currentPassword) ||
                !passwordValidation(newPassword) ||
                !passwordValidation(repeatNewPassword) ||
                newPassword !== repeatNewPassword
              }
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

export default SettingsPasswordPage;
