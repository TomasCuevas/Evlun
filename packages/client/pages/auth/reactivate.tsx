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
import { FullLoader } from "@/components/ui";
import { HeroText } from "@/components/auth";

//* regex *//
import { emailRegex } from "@/regex";

//* form-values and for-validations
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

//* services *//
import { reactivateService } from "@/services";

const ReactivatePage: NextPage = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: formValues(),
    validationSchema: formValidations(),
    validateOnMount: true,
    onSubmit: async (formValues) => {
      try {
        await reactivateService(formValues);
        router.replace("/auth/login");
      } catch (error: any) {
        formik.setStatus(error.msg || "Ocurrio un error. Intente de nuevo.");
        return;
      }
    },
  });

  if (formik.isSubmitting) return <FullLoader />;

  return (
    <AuthLayout
      title="Reactivar cuenta| Evlun"
      description="Reactivar cuenta de Evlun"
    >
      <section>
        <HeroText strong="Evlun" text="Reactivar tu cuenta de" />
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
            label="Reactivar Cuenta"
            type="submit"
          />
          {formik.status ? <FormErrorMessage message={formik.status} /> : null}
        </Form>
        <FormQuestion
          link="/auth/login"
          linkPlaceholder="Iniciar sesion"
          question="¿Quieres iniciar sesion?"
        />
      </section>
    </AuthLayout>
  );
};

export default ReactivatePage;
