import { useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
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

//* regex *//
import { emailRegex } from "@/regex";

//* form-values and form-validations *//
const formValues = () => ({
  email: "",
  password: "",
});

const formValidations = () => {
  return Yup.object({
    email: Yup.string().matches(emailRegex).required(),
    password: Yup.string().min(8).max(30).required(),
  });
};

//* layout *//
import { AuthLayout } from "@/layouts";

//* store *//
import { useAuthStore } from "@/store";

const LoginPage: NextPage = () => {
  const { onLogin } = useAuthStore();
  const [isUserDisable, setIsUserDisable] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: formValues(),
    validationSchema: formValidations(),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      setIsUserDisable(false);

      try {
        await onLogin(formValues);
        router.replace("/");
      } catch (error: any) {
        if (error.status === 410) setIsUserDisable(true);
        formik.setStatus(error.msg);
      }
    },
  });

  return (
    <AuthLayout title="Login | Evlun" description="Iniciar sesión en en Evlun">
      <section>
        <HeroText strong="Evlun" text="Iniciar Sesión en" />
      </section>
      <section>
        <Form onSubmit={formik.handleSubmit}>
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
          <FormButtonPrimary
            isDisabled={Object.keys(formik.errors).length > 0}
            label="Iniciar Sesión"
            type="submit"
          />
          {formik.status ? <FormErrorMessage message={formik.status} /> : null}
          <div style={{ display: isUserDisable ? "block" : "none" }}>
            <NextLink href="/auth/reactivate" passHref>
              <a className="text-sm font-bold text-orange underline">
                Clic aquí si deseas reactivar tu cuenta.
              </a>
            </NextLink>
          </div>
        </Form>
        <FormQuestion
          link="/auth/register"
          linkPlaceholder="Regístrate"
          question="¿No tienes una cuenta?"
        />
      </section>
    </AuthLayout>
  );
};

export default LoginPage;
