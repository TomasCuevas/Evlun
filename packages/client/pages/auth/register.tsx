import { NextPage } from "next";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
  FormQuestion,
} from "@/components/form";
import { HeroText } from "@/components/auth";

//* regexs *//
import { emailRegex, nameRegex, usernameRegex } from "@/regex";

//* form-values and form-validations *//
const initialValues = () => ({
  email: "",
  name: "",
  password: "",
  repeatPassword: "",
  username: "",
});

const formValidations = () => {
  return Yup.object({
    email: Yup.string().matches(emailRegex).required(),
    name: Yup.string().matches(nameRegex).required(),
    password: Yup.string().min(8).max(30).required(),
    repeatPassword: Yup.string().min(8).max(30).required(),
    username: Yup.string().matches(usernameRegex).required(),
  });
};

//* layout *//
import { AuthLayout } from "@/layouts";

//* store *//
import { useAuthStore } from "@/store";

const RegisterPage: NextPage = () => {
  const { onRegister } = useAuthStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: formValidations(),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      const { repeatPassword, ...values } = formValues;
      if (repeatPassword !== values.password) {
        formik.setStatus("Las contraseñas ingresadas no coinciden.");
        return;
      }

      try {
        await onRegister(values);
        router.replace("/");
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error. Intente de nuevo.");
      }
    },
  });

  return (
    <AuthLayout title="Registro | Evlun" description="Registrarse en Evlun">
      <section>
        <HeroText strong="Evlun" text="Unete a" textAfterStrong="hoy mismo" />
      </section>
      <section>
        <Form onSubmit={formik.handleSubmit}>
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="name"
            inputType="text"
            inputValue={formik.values.name}
            label="Nombre completo"
          />
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="username"
            inputType="text"
            inputValue={formik.values.username}
            label="Nombre de usuario"
          />
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="email"
            inputType="email"
            inputValue={formik.values.email}
            label="Correo electronico"
          />
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="password"
            inputType="password"
            inputValue={formik.values.password}
            label="Contraseña"
          />
          <FormInputPrimary
            inputChange={formik.handleChange}
            inputName="repeatPassword"
            inputType="password"
            inputValue={formik.values.repeatPassword}
            label="Repite la Contraseña"
          />
          <FormButtonPrimary
            isDisabled={Object.keys(formik.errors).length > 0}
            label="Registrarme"
            type="submit"
          />
          {formik.status ? <FormErrorMessage message={formik.status} /> : null}
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
