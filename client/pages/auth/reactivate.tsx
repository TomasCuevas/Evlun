import { FormEvent, useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
  FormQuestion,
} from "../../components/form";
import { FullLoader } from "../../components/ui";
import { HeroText } from "../../components/auth";

//* layout *//
import { AuthLayout } from "../../components/layouts";

//* hooks *//
import { useForm } from "../../hooks";

//* services *//
import { reactivateService } from "../../services";

//* helpers *//
import { emailValidation, passwordValidation } from "../../helpers";

//* context *//
import { AuthContext } from "../../context";

const ReactivatePage: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const router = useRouter();

  const {
    email,
    error,
    formValues,
    isSending,
    onInputChange,
    onSetError,
    password,
    reset,
    setIsSending,
  } = useForm({
    email: "",
    password: "",
  });

  const startReactivate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSetError("");

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    setIsSending(true);
    const result = await reactivateService(formValues);
    setIsSending(false);

    if (result.ok) {
      reset();
      return router.replace("/auth/login");
    } else {
      onSetError(result.msg || "Ocurrio un error.");
    }
  };

  if (isSending) return <FullLoader />;
  if (isAuthenticated === "authenticated") router.replace("/");
  if (isAuthenticated === "no-authenticated") {
    return (
      <AuthLayout
        title="Reactivar cuenta| Evlun"
        description="Reactivar cuenta de Evlun"
      >
        <section>
          <HeroText strong="Evlun" text="Reactivar tu cuenta de" />
        </section>
        <section>
          <Form onSubmit={startReactivate}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="email"
              inputType="email"
              inputValue={email}
              label="Correo electronico"
            />
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="password"
              inputType="password"
              inputValue={password}
              label="Contraseña"
            />
            <FormButtonPrimary
              isDisabled={
                isSending ||
                !emailValidation(email) ||
                !passwordValidation(password)
              }
              label="Reactivar Cuenta"
              type="submit"
            />
            {error ? <FormErrorMessage message={error} /> : null}
          </Form>
          <FormQuestion
            link="/auth/login"
            linkPlaceholder="Iniciar sesion"
            question="¿Quieres iniciar sesion?"
          />
        </section>
      </AuthLayout>
    );
  }

  return <FullLoader />;
};

export default ReactivatePage;
