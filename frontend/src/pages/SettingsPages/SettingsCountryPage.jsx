import { useEffect } from 'react';
import { countries } from 'countries-list';

//* hooks *//
import { useForm, useAuthStore, useUpdateUser } from '../../hooks';

//* components *//
import {
  Form,
  FormButtonPrimary,
  FormErrorMessage,
} from '../../components/Form';
import { FormSelectOption } from '../../components/Form/FormSelectOption';
import { Main } from '../../components/Main/Main';

//* layouts *//
import { Nav, NavTopSettings } from '../../layouts';

export const SettingsCountryPage = () => {
  const { country = '' } = useAuthStore();
  const { newCountry, onInputChange } = useForm({
    newCountry: country,
  });
  const { startUpdating, errorMessage } = useUpdateUser();

  const allCountries = [];
  for (const country in countries) {
    allCountries.push(countries[country].name);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (country === newCountry) return;

    const values = { country: newCountry };
    startUpdating(values);
  };

  useEffect(() => {
    if (country === '') {
      onInputChange({ target: { name: 'newCountry', value: 'Andorra' } });
    }
  }, [country]);

  return (
    <>
      <Main>
        <NavTopSettings navText="Cambiar país" />
        <div className="px-[5%]">
          <Form formSubmit={onSubmit}>
            <FormSelectOption
              inputValue={newCountry}
              inputName="newCountry"
              optionValues={allCountries}
              onInputChange={onInputChange}
              label="País"
            />
            <FormButtonPrimary
              buttonSubmit={onSubmit}
              buttonText="Guardar"
              option={country === newCountry}
            />
            {errorMessage && <FormErrorMessage message={errorMessage} />}
          </Form>
        </div>
        <Nav />
      </Main>
    </>
  );
};
