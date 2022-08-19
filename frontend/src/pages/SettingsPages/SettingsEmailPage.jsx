import { useEffect, useState } from 'react';

//* hooks *//
import { useForm, useAuthStore, useUpdateUser } from '../../hooks';

//* helpers *//
import { emailValidation } from '../../helpers';

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
  FormInputPrimary,
} from '../../components/Form';
import { Main } from '../../components/Main/Main';

//* layouts *//
import { Nav, NavTopSettings } from '../../layouts';

export const SettingsEmailPage = () => {
  const [disabled, setDisabled] = useState(true);
  const { email } = useAuthStore();
  const { newEmail, onInputChange } = useForm({
    newEmail: email,
  });
  const { startUpdating, errorMessage } = useUpdateUser();

  const onSubmit = (event) => {
    event.preventDefault();
    if (disabled) return;

    const values = { email: newEmail };
    startUpdating(values);
  };

  useEffect(() => {
    if (newEmail === email) return setDisabled(true);
    const isValidation = emailValidation(newEmail);
    isValidation ? setDisabled(false) : setDisabled(true);
  }, [newEmail]);

  return (
    <>
      <Main>
        <NavTopSettings navText="Cambiar el correo electrónico" />
        <div className="px-[5%]">
          <Form formSubmit={onSubmit}>
            <FormInputPrimary
              inputName="newEmail"
              inputValue={newEmail}
              inputChange={onInputChange}
              label="Correo electrónico"
            />
            <FormButtonPrimary
              buttonSubmit={onSubmit}
              buttonText="Guardar"
              option={disabled}
            />
            {errorMessage && <FormErrorMessage message={errorMessage} />}
          </Form>
        </div>
        <Nav />
      </Main>
    </>
  );
};
