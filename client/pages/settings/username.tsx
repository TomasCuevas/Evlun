/* eslint-disable react-hooks/exhaustive-deps */
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

//* context *//
import { AuthContext } from "../../context/AuthContext";
import { usernameValidation } from "../../helpers";
import { settingsService } from "../../services";

const SettingsUsernamePage: NextPage = () => {
  const { user, isAuthenticated, onChecking } = useContext(AuthContext);

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

  const router = useRouter();

  const onSave = async () => {
    const formData = new FormData();
    formData.append("username", newUsername);

    setIsSending(true);
    const result = await settingsService("/username", formData);
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
  }, [user]);

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Cambiar nombre de usuario"
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
  }

  return <FullLoader />;
};

export default SettingsUsernamePage;
