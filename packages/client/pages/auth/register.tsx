import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
  FormQuestion,
} from "@/components/form";
import { HeroText } from "@/components/auth";

//* layout *//
import { AuthLayout } from "@/layouts";

//* hooks *//
import { useForm } from "@/hooks";

//* store *//
import { useAuthStore } from "@/store";

const RegisterPage: NextPage = () => {
  const { onRegister } = useAuthStore();
  const router = useRouter();

  const {
    email,
    name,
    password,
    username,
    formValues,
    error,
    onInputChange,
    onSetError,
  } = useForm({
    email: "",
    name: "",
    password: "",
    username: "",
  });

  const startRegister = async () => {
    const result = await onRegister(formValues);

    if (result.ok) {
      return router.replace("/");
    } else {
      onSetError(result.msg || "Ocurrio un error. Intente de nuevo");
    }
  };

  return (
    <AuthLayout title="Registro | Evlun" description="Registrarse en Evlun">
      <section>
        <HeroText strong="Evlun" text="Unete a" textAfterStrong="hoy mismo" />
      </section>
      <section>
        <Form onSubmit={() => startRegister()}>
          <FormInputPrimary
            inputChange={onInputChange}
            inputName="name"
            inputType="text"
            inputValue={name}
            label="Nombre completo"
          />
          <FormInputPrimary
            inputChange={onInputChange}
            inputName="username"
            inputType="text"
            inputValue={username}
            label="Nombre de usuario"
          />
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
              email.length < 1 ||
              name.length < 1 ||
              password.length < 1 ||
              username.length < 1
            }
            label="Registrarme"
            type="submit"
          />
          {error ? <FormErrorMessage message={error!} /> : null}
        </Form>
        <FormQuestion
          link="/auth/login"
          linkPlaceholder="Iniciar sesión"
          question="¿Ya tienes una cuenta?"
        />
      </section>
    </AuthLayout>
  );
};

export default RegisterPage;
