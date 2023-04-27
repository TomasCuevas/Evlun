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

//* helpers *//
import { usernameValidation } from "@/helpers";

//* hooks *//
import { useForm } from "@/hooks";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsUsernamePage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const {
    newUsername,
    onInputChange,
    error,
    setError,
    isSending,
    setIsSending,
  } = useForm({
    newUsername: "",
  });

  //! on save data
  const onSave = async () => {
    const formData = new FormData();
    formData.append("username", newUsername);

    setIsSending(true);
    const result = await settingServices("username", formData);
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
          name: "newUsername",
          value: user.username,
        },
      });
    }
    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar nombre de usuario" });
  }, [user]);

  if (isSending) return <FullLoader />;
  return (
    <SettingLayout
      title="Cambiar nombre de usuario | Evlun"
      description="Pagina para cambiar/modificar el nombre de usuario en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={onSave}>
          <FormInputPrimary
            inputChange={onInputChange}
            inputName="newUsername"
            inputValue={newUsername}
            label="Nombre de usuario"
            inputType="text"
            max={20}
          />
          <FormButtonPrimary
            isDisabled={
              isSending ||
              !usernameValidation(newUsername) ||
              newUsername === user!.username
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

export default SettingsUsernamePage;
