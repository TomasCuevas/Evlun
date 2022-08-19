import { useEffect, useState } from 'react';

//* hooks *//
import { useUpdateUser, useForm, useAuthStore } from '../../hooks';

//* helpers *//
import { phoneValidation } from '../../helpers';

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

export const SettingsPhonePage = () => {
  const [disabled, setDisabled] = useState(true);
  const { phone = '' } = useAuthStore();
  const { newPhone, onInputChange } = useForm({
    newPhone: phone,
  });
  const { startUpdating, errorMessage } = useUpdateUser();

  const onSubmit = (event) => {
    event.preventDefault();
    if (disabled) return;

    const values = { phone: newPhone };
    startUpdating(values);
  };

  useEffect(() => {
    if (newPhone === phone) return setDisabled(true);
    const isValidation = phoneValidation(newPhone);
    isValidation ? setDisabled(false) : setDisabled(true);
  }, [newPhone]);

  return (
    <>
      <Main>
        <NavTopSettings navText="Cambiar teléfono" />
        <div className="px-[5%]">
          <Form formSubmit={onSubmit}>
            <FormInputPrimary
              inputChange={onInputChange}
              inputName="newPhone"
              inputValue={newPhone}
              label="Numero de teléfono"
              inputType="number"
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
