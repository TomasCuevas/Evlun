import { useState, useEffect } from 'react';

//* hooks *//
import { useForm, useAuthStore, useUpdateUser } from '../../hooks';

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

//* helpers *//
import { usernameValidation } from '../../helpers';

export const SettingsUsernamePage = () => {
  const [disabled, setDisabled] = useState(true);
  const { username } = useAuthStore();
  const { newUsername, onInputChange } = useForm({
    newUsername: username,
  });
  const { startUpdating, errorMessage } = useUpdateUser();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (disabled) return;

    const values = { username: newUsername };
    startUpdating(values);
  };

  useEffect(() => {
    if (newUsername === username) return setDisabled(true);
    const isValidation = usernameValidation(newUsername);
    isValidation ? setDisabled(false) : setDisabled(true);
  }, [newUsername]);

  return (
    <>
      <Main>
        <NavTopSettings navText="Cambiar nombre de usuario" />
        <div className="px-[5%]">
          <Form formSubmit={onSubmit}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="newUsername"
              inputType="text"
              inputValue={newUsername}
              label="Nombre de usuario"
              max={20}
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
