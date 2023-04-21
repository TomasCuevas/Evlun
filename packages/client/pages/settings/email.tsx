import { useContext, useEffect } from "react";
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
import { emailValidation } from "../../helpers";

//* services *//
import { settingServices } from "../../services";

//* context *//
import { AuthContext } from "../../context";

const SettingsEmailPage: NextPage = () => {
  const { user, isAuthenticated, onChecking } = useContext(AuthContext);

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

  const router = useRouter();

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
  }, [user]);

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Cambiar el correo electronico"
        title="Cambiar el correo electronico | Evlun"
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
                newEmail === user!.email
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

export default SettingsEmailPage;
