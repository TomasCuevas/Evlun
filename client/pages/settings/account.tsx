import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* icons *//
import { RiUserLine, RiKey2Line, RiEmotionUnhappyLine } from "react-icons/ri";

//* components *//
import { FullLoader } from "../../components/ui";
import { SettingsOptionFull } from "../../components/setting";

//* layout *//
import { SettingLayout } from "../../components/layouts";

//* context *//
import { AuthContext } from "../../context";

const SettingsAccountPage: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Tu cuenta"
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
  }

  return <FullLoader />;
};

export default SettingsAccountPage;
