import { useState, useEffect } from 'react';

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
  FormQuestion,
} from '../../components/Form';
import { Main } from '../../components/Main/Main';

//* helpers *//
import {
  emailValidation,
  passwordValidation,
} from '../../helpers/fieldsValidations';

//* hooks *//
import { useAuthStore, useForm } from '../../hooks';

export const ReactivatePage = () => {
  const [disabled, setDisabled] = useState(true);
  const { errorMessage, startClearErrorAndStatusCode, startReactivateAccount } =
    useAuthStore();
  const { formValues, email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (disabled) return;

    await startReactivateAccount(email, password);
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
          Reactivar tu cuenta de{' '}
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
            buttonText="Reactivar Cuenta"
            buttonSubmit={onSubmit}
            option={disabled}
          />
          {errorMessage && <FormErrorMessage message={errorMessage} />}
        </Form>

        <FormQuestion
          question="¿Quieres iniciar sesíon?"
          linkQuestion="Iniciar sesíon"
          link="/auth/login"
        />
      </div>
    </Main>
  );
};
