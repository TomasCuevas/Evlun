import { useEffect } from "react";
import { NextPage } from "next";

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

//* hooks *//
import { useForm } from "@/hooks";

//* helpers *//
import { passwordValidation } from "@/helpers";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsPasswordPage: NextPage = () => {
  const { onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

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

  //! on save data
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

  useEffect(() => {
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar tu contraseña" });
  }, []);

  if (isSending) return <FullLoader />;
  return (
    <SettingLayout
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
};

export default SettingsPasswordPage;
