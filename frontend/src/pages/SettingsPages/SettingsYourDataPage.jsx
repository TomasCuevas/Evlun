import dayjs from 'dayjs';

//* hooks *//
import { useAuthStore } from '../../hooks/useAuthStore';

//* components *//
import { Main } from '../../components/Main/Main';
import { NavTopSettings } from '../../layouts/NavTopSettings/NavTopSettings';
import { SettingOption } from '../../components/Settings/SettingOption';

//* layouts *//
import { Nav } from '../../layouts/Nav/Nav';

export const SettingsYourDataPage = () => {
  const { username, phone, email, date, country, gender } = useAuthStore();

  const transformDate = dayjs(date).format('D/MM/YYYY H:mm:ss');

  return (
    <Main>
      <NavTopSettings navText="Información de la cuenta" />
      <SettingOption
        optionTitle="Nombre de usuario"
        optionText={username}
        navigateLink="/settings/screen_name"
      />
      <SettingOption
        optionTitle="Teléfono"
        optionText={phone}
        navigateLink="/settings/phone"
      />
      <SettingOption
        optionTitle="Correo electrónico"
        optionText={email}
        navigateLink="/settings/email"
      />
      <SettingOption
        optionTitle="Creación de la cuenta"
        optionText={transformDate}
        arrow={false}
      />
      <SettingOption
        optionTitle="País"
        optionText={country}
        navigateLink="/settings/country"
      />
      <SettingOption
        optionTitle="Género"
        optionText={gender}
        navigateLink="/settings/gender"
      />
      <Nav />
    </Main>
  );
};
