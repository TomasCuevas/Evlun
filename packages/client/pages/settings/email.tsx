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
import { emailValidation } from "@/helpers";

//* services *//
import { settingServices } from "@/services";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsEmailPage: NextPage = () => {
  const { user, onChecking } = useAuthStore();
  const { onSetLocation, onSetNavbarData } = useNavbarTopStore();

  const {
    newEmail,
    onInputChange,
    error,
    setError,
    isSending,
    setIsSending,
    reset,
  } = useForm({
    newEmail: "",
  });

  //! on save data
  const onSave = async () => {
    const formData = new FormData();
    formData.append("email", newEmail);

    setIsSending(true);
    const result = await settingServices("email", formData);
    setIsSending(false);

    if (result.ok) {
      reset();
      await onChecking();
    } else {
      setError(result.msg);
    }
  };

  useEffect(() => {
    if (user) {
      onInputChange({
        target: {
          name: "newEmail",
          value: user.email ? user.email : "",
        },
      });
    }

    onSetLocation("settings");
    onSetNavbarData({ settingText: "Cambiar el correo electrónico" });
  }, [user]);

  if (isSending) return <FullLoader />;
  return (
    <SettingLayout
      title="Cambiar el correo electrónico | Evlun"
      description="Pagina para cambiar/modificar el correo electronico en Evlun"
    >
      <section className="px-[5%]">
        <Form onSubmit={onSave}>
          <FormInputPrimary
            inputChange={onInputChange}
            inputName="newEmail"
            inputValue={newEmail}
            label="Correo electronico"
            inputType="text"
          />
          <FormButtonPrimary
            isDisabled={
              isSending ||
              !emailValidation(newEmail) ||
              newEmail === user?.email
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

export default SettingsEmailPage;
