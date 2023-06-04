//* components *//
import { BackArrow, NavText } from "@/components/navbar";
import { SwitchConnections } from "@/components/connections";

//* store *//
import { useNavbarTopStore } from "@/store";

export const ProfileLocation: React.FC = () => {
  const {
    navbarData: { profileName, profileUsername, connections },
  } = useNavbarTopStore();

  return (
    <nav
      style={{
        padding: connections ? "8px 0px 0px 0px" : "8px 5%",
      }}
      className="mx-auto flex h-full w-full flex-col items-center gap-2"
    >
      <div
        style={{ padding: connections ? "0px 5%" : "0px 0px" }}
        className="flex h-full w-full items-center gap-[20px]"
      >
        <BackArrow />
        <NavText textBig={profileName!} textSmall={`@${profileUsername}`} />
      </div>
      {connections ? <SwitchConnections username={profileUsername!} /> : null}
    </nav>
  );
};
