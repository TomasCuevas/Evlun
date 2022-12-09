import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* layout *//
import { SettingLayout } from "../../components/layouts";

//* components *//
import { SettingsOption } from "../../components/setting";
import { FullLoader } from "../../components/ui";

//* context *//
import { AuthContext } from "../../context/AuthContext";

const SettingsPage: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Configuracion"
        title="Configuracion | Evlun"
        description="Pagina principal de configuracion de Evlun"
      >
        <SettingsOption
          optionTitle="Tu cuenta"
          navigateLink="settings/account"
        />
      </SettingLayout>
    );
  }

  return <FullLoader />;
};

export default SettingsPage;
