//* icons *//
import { BsPerson, BsKey, BsEmojiFrown } from 'react-icons/bs';

//* components *//
import { Main } from '../../components/Main/Main';
import { SettingOptionFull } from '../../components/Settings/SettingOptionFull';

//* layouts *//
import { NavTopSettings, Nav } from '../../layouts';

export const SettingsAccountPage = () => {
  return (
    <Main>
      <NavTopSettings navText="Tu cuenta" />
      <SettingOptionFull
        icon={BsPerson}
        optionTitle="Información de la cuenta"
        optionText="Ve la información de tu cuenta, como el número de teléfono y la dirección de correo electrónico."
        navigateLink="/settings/your_evlun_data"
      />
      <SettingOptionFull
        icon={BsKey}
        optionTitle="Cambia tu contraseña"
        optionText="Cambia tu contraseña en cualquier momento."
        navigateLink="/settings/password"
      />
      <SettingOptionFull
        icon={BsEmojiFrown}
        optionTitle="Desactiva tu cuenta"
        optionText="Averigua cómo puedes desactivar tu cuenta.."
        navigateLink="/settings/deactivate"
      />
      <Nav />
    </Main>
  );
};
