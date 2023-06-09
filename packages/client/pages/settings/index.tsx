import { useEffect } from "react";
import { NextPage } from "next";

//* layout *//
import { SettingLayout } from "@/layouts";

//* components *//
import { SettingsOption } from "@/components/setting";

//* store *//
import { useNavbarTopStore } from "@/store";

const SettingsPage: NextPage = () => {
  const { onSetNavbarData } = useNavbarTopStore();

  useEffect(() => {
    onSetNavbarData({ settingText: "Configuración" });
  }, []);

  return (
    <SettingLayout
      title="Configuración | Evlun"
      description="Pagina principal de configuracion de Evlun"
    >
      <SettingsOption optionTitle="Tu cuenta" navigateLink="settings/account" />
    </SettingLayout>
  );
};

export default SettingsPage;
