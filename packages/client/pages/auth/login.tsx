import { FormEvent, useContext, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
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

//* helpers *//
import { emailValidation, passwordValidation } from "../../helpers";

//* context *//
import { AuthContext } from "../../context";

const LoginPage: NextPage = () => {
  const { isAuthenticated, onLogin } = useContext(AuthContext);
  const [isUserDisable, setIsUserDisable] = useState(false);

  const router = useRouter();

  const { email, password, formValues, error, onInputChange, onSetError } =
    useForm({
      email: "",
      password: "",
    });

  const startLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUserDisable(false);
    onSetError("");

    const result = await onLogin(formValues);

    if (result.ok) {
      return router.replace("/");
    } else {
      if (result.status === 410) setIsUserDisable(true);
      onSetError(result.msg || "Ocurrio un error. Intente de nuevo");
    }
  };

  if (isAuthenticated === "authenticated") router.replace("/");
  if (isAuthenticated === "no-authenticated") {
    return (
      <AuthLayout
        title="Login | Evlun"
        description="Iniciar sesión en en Evlun"
      >
        <section>
          <HeroText strong="Evlun" text="Iniciar Sesión en" />
        </section>
        <section>
          <Form onSubmit={startLogin}>
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
                !emailValidation(email) || !passwordValidation(password)
              }
              label="Iniciar Sesión"
              type="submit"
            />
            {error ? <FormErrorMessage message={error} /> : null}
            {isUserDisable ? (
              <div>
                <NextLink href="/auth/reactivate" passHref>
                  <a className="text-sm font-bold text-orange underline">
                    Click aquí si deseas reactivar tu cuenta.
                  </a>
                </NextLink>
              </div>
            ) : null}
          </Form>
          <FormQuestion
            link="/auth/register"
            linkPlaceholder="Regístrate"
            question="¿No tienes una cuenta?"
          />
        </section>
      </AuthLayout>
    );
  }

  return <FullLoader />;
};

export default LoginPage;
