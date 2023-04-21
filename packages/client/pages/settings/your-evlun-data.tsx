import { useContext } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

//* components *//
import { FullLoader } from "../../components/ui";
import { SettingsOption } from "../../components/setting";

//* layout *//
import { SettingLayout } from "../../components/layouts";

//* context *//
import { AuthContext } from "../../context";

const SettingsYourDataPage: NextPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (isAuthenticated === "no-authenticated") router.replace("/auth/login");
  if (isAuthenticated === "authenticated") {
    return (
      <SettingLayout
        navText="Informacion de la cuenta"
        title="Informacion de la cuenta | Evlun"
        description="Informacion principal sobre la cuenta en Evlun"
      >
        <SettingsOption
          optionTitle="Nombre de usuario"
          optionText={user!.username}
          navigateLink="/settings/username"
        />
        <SettingsOption
          optionTitle="Teléfono"
          optionText={user!.phone}
          navigateLink="/settings/phone"
        />
        <SettingsOption
          optionTitle="Correo electrónico"
          optionText={user!.email}
          navigateLink="/settings/email"
        />
        <SettingsOption
          optionTitle="Creación de la cuenta"
          optionText={new Date(user!.date || 0).toLocaleDateString(undefined, {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          arrow={false}
          navigateLink="/settings/your-evlun-data"
        />
        <SettingsOption
          optionTitle="País"
          optionText={user!.country}
          navigateLink="/settings/country"
        />
        <SettingsOption
          optionTitle="Género"
          optionText={user!.gender}
          navigateLink="/settings/gender"
        />
      </SettingLayout>
    );
  }

  return <FullLoader />;
};

export default SettingsYourDataPage;
