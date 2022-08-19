import { useState, useEffect } from 'react';

//* hooks *//
import { useAuthStore, useCheckbox, useUpdateUser } from '../../hooks';

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
} from '../../components/Form';
import { FormCheck } from '../../components/Form/FormCheck';
import { Main } from '../../components/Main/Main';

//* layouts *//
import { Nav, NavTopSettings } from '../../layouts';

export const SettingsGenderPage = () => {
  const [disabled, setDisabled] = useState(false);
  const { gender } = useAuthStore();
  const { startUpdating, errorMessage } = useUpdateUser();
  const { famele, male, onCheckboxChange } = useCheckbox({
    famele: gender === 'Femenino',
    male: gender === 'Masculino',
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (famele !== true && male !== true) return;

    const values = famele ? { gender: 'Femenino' } : { gender: 'Masculino' };
    startUpdating(values);
  };

  useEffect(() => {
    if (famele !== true && male !== true) return setDisabled(true);
    if (gender === 'Masculino' && male === true) return setDisabled(true);
    if (gender === 'Femenino' && famele === true) return setDisabled(true);
    setDisabled(false);
  }, [famele, male]);

  return (
    <>
      <Main>
        <NavTopSettings navText="Género" />
        <div className="px-[5%]">
          <Form formSubmit={onSubmit}>
            <FormCheck
              checked={famele === true}
              inputName="famele"
              label="Femenino"
              onCheckChange={onCheckboxChange}
            />
            <FormCheck
              checked={male === true}
              inputName="male"
              label="Masculino"
              onCheckChange={onCheckboxChange}
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
