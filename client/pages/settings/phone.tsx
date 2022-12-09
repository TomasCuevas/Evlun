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

//* helpers *//
import { phoneValidation } from "../../helpers";

//* services *//
import { settingsService } from "../../services";

//* context *//
import { AuthContext } from "../../context/AuthContext";

const SettingsPhonePage: NextPage = () => {
  const { user, isAuthenticated, onChecking } = useContext(AuthContext);

  const { newPhone, onInputChange, error, setError, isSending, setIsSending } =
    useForm({
      newPhone: "",
    });

  const router = useRouter();

  const onSave = async () => {
    const formData = new FormData();
    formData.append("phone", newPhone);

    setIsSending(true);
    const result = await settingsService("/phone", formData);
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
          name: "newPhone",
          value: user.phone ? user.phone : "",
        },
      });
    }
  }, [user]);

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Cambiar numero de telefono"
        title="Cambiar numero de telefono | Evlun"
        description="Pagina para cambiar/modificar el numero de telefono en Evlun"
      >
        <section className="px-[5%]">
          <Form onSubmit={onSave}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="newPhone"
              inputValue={newPhone}
              label="Numero de telefono"
              inputType="number"
              max={30}
            />
            <FormButtonPrimary
              isDisabled={isSending || !phoneValidation(newPhone)}
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

export default SettingsPhonePage;
