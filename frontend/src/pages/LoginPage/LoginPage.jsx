import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//* hooks *//
import { useForm, useAuthStore } from '../../hooks';

//* helpers *//
import {
  emailValidation,
  passwordValidation,
} from '../../helpers/fieldsValidations';

//* components *//
import { Main } from '../../components/Main/Main';
import {
  Form,
  FormInputPrimary,
  FormButtonPrimary,
  FormQuestion,
  FormErrorMessage,
} from '../../components/Form';

export const LoginPage = () => {
  const [disabled, setDisabled] = useState(true);
  const { startLogin, errorMessage, statusCode, startClearErrorAndStatusCode } =
    useAuthStore();
  const { formValues, email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (disabled) return;

    startLogin(email, password);
  };

  useEffect(() => {
    emailValidation(email) && passwordValidation(password)
      ? setDisabled(false)
      : setDisabled(true);
  }, [formValues]);

  useEffect(() => {
    return startClearErrorAndStatusCode();
  }, []);

  return (
    <Main>
      <div className="px-[5%]">
        <p className="mt-[50px] block text-[50px] font-normal italic tracking-[10px] text-text">
          Iniciar sesión en{' '}
          <span className="text-6xl font-bold text-decorateorange">Evlun</span>
        </p>

        <Form formSubmit={onSubmit}>
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
            buttonText="Iniciar Sesión"
            buttonSubmit={onSubmit}
            option={disabled}
          />
          {statusCode === 410 && (
            <div className="text-textsmall font-bold underline">
              <Link to="/auth/reactivate" className="text-decorateorange">
                Click aquí si deseas reactivar tu cuenta.
              </Link>
            </div>
          )}
          {errorMessage && <FormErrorMessage message={errorMessage} />}
        </Form>

        <FormQuestion
          question="¿No tienes una cuenta?"
          linkQuestion="Regístrate"
          link="/auth/signup"
        />
      </div>
    </Main>
  );
};
