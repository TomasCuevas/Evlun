import { useState, useEffect } from 'react';

//* hooks *//
import { useForm, useUpdateUser } from '../../hooks';

//* helpers *//
import { passwordValidation } from '../../helpers';

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

export const SettingsChangeYourPasswordPage = () => {
  const [disabled, setDisabled] = useState(true);
  const { formValues, oldPassword, newPassword, confirm, onInputChange } =
    useForm({
      oldPassword: '',
      newPassword: '',
      confirm: '',
    });
  const { startUpdating, errorMessage } = useUpdateUser();

  const onSubmit = (event) => {
    event.preventDefault();
    if (disabled) return;

    const values = { newPassword, oldPassword };
    startUpdating(values);
  };

  useEffect(() => {
    const isValidation =
      passwordValidation(oldPassword) &&
      passwordValidation(newPassword) &&
      passwordValidation(confirm);
    isValidation ? setDisabled(false) : setDisabled(true);
    if (oldPassword === newPassword || newPassword !== confirm)
      return setDisabled(true);
  }, [formValues]);

  return (
    <>
      <Main>
        <NavTopSettings navText="Cambia tu contraseña" />
        <div className="px-[5%]">
          <Form formSubmit={onSubmit}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="oldPassword"
              inputType="password"
              inputValue={oldPassword}
              label="Contraseña actual"
            />
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="newPassword"
              inputType="password"
              inputValue={newPassword}
              label="Nueva contraseña"
            />
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="confirm"
              inputType="password"
              inputValue={confirm}
              label="Confirmar contraseña"
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
