import { useEffect } from "react";
import { NextPage } from "next";

//* components *//
import { SettingsOption } from "@/components/setting";

//* layout *//
import { SettingLayout } from "@/layouts";

//* store *//
import { useAuthStore, useNavbarTopStore } from "@/store";

const SettingsYourDataPage: NextPage = () => {
  const { user } = useAuthStore();
  const { onSetNavbarData } = useNavbarTopStore();

  useEffect(() => {
    onSetNavbarData({ settingText: "Información de la cuenta" });
  }, []);

  return (
    <SettingLayout
      title="Información de la cuenta | Evlun"
      description="Informacion principal sobre la cuenta en Evlun"
    >
      <SettingsOption
        optionTitle="Nombre de usuario"
        optionText={user?.username}
        navigateLink="/settings/username"
      />
      <SettingsOption
        optionTitle="Teléfono"
        optionText={user?.phone}
        navigateLink="/settings/phone"
      />
      <SettingsOption
        optionTitle="Correo electrónico"
        optionText={user?.email}
        navigateLink="/settings/email"
      />
      <SettingsOption
        optionTitle="Creación de la cuenta"
        optionText={new Date(user?.date || 0).toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        arrow={false}
        navigateLink="/settings/your-evlun-data"
      />
      <SettingsOption
        optionTitle="País"
        optionText={user?.country}
        navigateLink="/settings/country"
      />
      <SettingsOption
        optionTitle="Género"
        optionText={user?.gender}
        navigateLink="/settings/gender"
      />
    </SettingLayout>
  );
};

export default SettingsYourDataPage;
