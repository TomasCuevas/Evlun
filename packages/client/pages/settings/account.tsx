import { useEffect } from "react";
import { NextPage } from "next";

//* icons *//
import { RiUserLine, RiKey2Line, RiEmotionUnhappyLine } from "react-icons/ri";

//* components *//
import { SettingsOptionFull } from "@/components/setting";

//* layout *//
import { SettingLayout } from "@/layouts";

//* store *//
import { useNavbarTopStore } from "@/store";

const SettingsAccountPage: NextPage = () => {
  const { onSetNavbarData } = useNavbarTopStore();

  useEffect(() => {
    onSetNavbarData({ settingText: "Tu cuenta" });
  }, []);

  return (
    <SettingLayout
      title="Tu cuenta | Evlun"
      description="Opciones de configuracion globales de la cuenta en Evlun"
    >
      <SettingsOptionFull
        icon={RiUserLine}
        optionTitle="Información de la cuenta"
        optionText="Ve la información de tu cuenta, como el número de teléfono y la dirección de correo electrónico."
        navigateLink="/settings/your-evlun-data"
      />
      <SettingsOptionFull
        icon={RiKey2Line}
        optionTitle="Cambia tu contraseña"
        optionText="Cambia tu contraseña en cualquier momento."
        navigateLink="/settings/password"
      />
      <SettingsOptionFull
        icon={RiEmotionUnhappyLine}
        optionTitle="Desactiva tu cuenta"
        optionText="Averigua cómo puedes desactivar tu cuenta."
        navigateLink="/settings/deactivate"
      />
    </SettingLayout>
  );
};

export default SettingsAccountPage;
