//* components *//
import { Main } from '../../components/Main/Main';
import { SettingOption } from '../../components/Settings/SettingOption';

//* layouts *//
import { Nav, NavTopSettings } from '../../layouts';

export const SettingsPage = () => {
  return (
    <>
      <Main>
        <NavTopSettings navText="Configuración" />
        <SettingOption
          optionTitle="Tu cuenta"
          navigateLink="/settings/account"
        />
        <Nav />
      </Main>
    </>
  );
};
