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

//* helpers *//
import { passwordValidation } from "../../helpers";

//* components *//
import { ProfileDeactivate } from "../../components/setting";

//* services *//
import { deactivateService } from "../../services";

//* hooks *//
import { useForm } from "../../hooks";

//* context *//
import { AuthContext } from "../../context";

const SettingsDeactivatePage: NextPage = () => {
  const { isAuthenticated, onChecking } = useContext(AuthContext);

  const {
    password,
    onInputChange,
    isSending,
    setIsSending,
    onSetError,
    error,
    reset,
  } = useForm({
    password: "",
  });

  const onSave = async (event: Event) => {
    event.preventDefault();
    const formData = new FormData();
    onSetError("");

    if (passwordValidation(password)) {
      formData.append("password", password);
    } else {
      return onSetError(
        "La contraseña ingresa, no contiene un formato valido."
      );
    }

    setIsSending(true);
    const result = await deactivateService(formData);
    setIsSending(false);

    if (result.ok) {
      reset();
      await onChecking();
    } else {
      onSetError(result.msg || "Ocurrio un error");
    }
  };

  const router = useRouter();

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Desactivar tu cuenta"
        title="Desactivar tu cuenta | Evlun"
        description="Pagina para desactivar cuenta en Evlun"
      >
        <ProfileDeactivate />
        <section className="mt-[30px] flex flex-col px-4">
          <span className="border-b border-orange py-3 text-xl font-extrabold text-white">
            Esta acción desactivará tu cuenta
          </span>
          <span className="border-b border-orange py-3 text-base font-light text-white/80">
            Estás por iniciar el proceso de desactivación de tu cuenta de Evlun.
            Tu nombre visible, tu @usuario y tu perfil público ya no se podrán
            ver en Evlun.
          </span>
          <Form onSubmit={onSave}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="password"
              inputValue={password}
              label="Confirmar contraseña"
              inputType="password"
            />
            <FormButtonPrimary
              label="Desactivar"
              type="submit"
              isDisabled={isSending || !passwordValidation(password)}
              className="mt-2 flex h-[50px] w-full cursor-pointer items-center justify-center rounded-md border border-error font-bold text-error transition-all duration-300 disabled:cursor-not-allowed disabled:border-error/50 disabled:text-error/60"
            />
            {error ? <FormErrorMessage message={error} /> : null}
          </Form>
        </section>
      </SettingLayout>
    );
  }

  return <FullLoader />;
};

export default SettingsDeactivatePage;
