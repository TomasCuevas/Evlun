import { useState, useEffect } from 'react';

//* hooks *//
import { useForm, useAuthStore } from '../../hooks';

//* helpers *//
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} from '../../helpers/fieldsValidations';

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
  FormQuestion,
} from '../../components/Form';
import { Main } from '../../components/Main/Main';

export const SignupPage = () => {
  const [disabled, setDisabled] = useState(true);
  const { startSignup, errorMessage, startClearErrorAndStatusCode } =
    useAuthStore();
  const { formValues, name, username, email, password, onInputChange } =
    useForm({
      name: '',
      username: '',
      email: '',
      password: '',
    });

  const onSubmit = (event) => {
    event.preventDefault();

    startSignup(name, username, email, password);
  };

  useEffect(() => {
    nameValidation(name) &&
    usernameValidation(username) &&
    emailValidation(email) &&
    passwordValidation(password)
      ? setDisabled(false)
      : setDisabled(true);
  }, [formValues]);

  useEffect(() => {
    return startClearErrorAndStatusCode();
  }, []);

  return (
    <Main>
      <div className="px-[5%]">
        <p className=" mt-[50px] block text-[50px] font-normal italic tracking-[10px] text-text">
          Únete a{' '}
          <span className="text-6xl font-bold text-decorateorange">Evlun</span>{' '}
          hoy mismo
        </p>

        <Form autocomplete="off" formSubmit={onSubmit}>
          <FormInputPrimary
            inputName="name"
            label="Nombre completo"
            inputValue={name}
            inputChange={onInputChange}
            inputType="text"
          />
          <FormInputPrimary
            inputName="username"
            label="Nombre de usuario"
            inputValue={username}
            inputChange={onInputChange}
            inputType="text"
          />
          <FormInputPrimary
            inputName="email"
            label="Correo electronico"
            inputValue={email}
            inputChange={onInputChange}
            inputType="email"
          />
          <FormInputPrimary
            inputName="password"
            label="Contraseña"
            inputValue={password}
            inputChange={onInputChange}
            inputType="password"
          />
          <FormButtonPrimary
            buttonText="Registrarme"
            buttonSubmit={onSubmit}
            option={disabled}
          />
          {errorMessage && <FormErrorMessage message={errorMessage} />}
        </Form>

        <FormQuestion
          question="¿Ya tienes una cuenta?"
          linkQuestion="Iniciar sesión"
          link="/auth/login"
        />
      </div>
    </Main>
  );
};
