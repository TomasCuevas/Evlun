import { useRouter } from "next/router";

//* components *//
import { BackArrow, NavText } from "@/components/navbar";
import { SwitchConnections } from "@/components/connections";

//* store *//
import { useNavbarTopStore } from "@/store";

interface Props {
  connections?: boolean;
}

export const ProfileLocation: React.FC<Props> = ({ connections }) => {
  const {
    navbarData: { profileName, profileUsername },
  } = useNavbarTopStore();
  const router = useRouter();

  return (
    <nav
      style={{
        padding: connections ? "8px 0px 0px 0px" : "8px 16px",
      }}
      className="mx-auto flex h-full w-full flex-col items-center gap-2"
    >
      <section
        style={{ padding: connections ? "0px 5%" : "0px 0px" }}
        className="flex h-full w-full items-center gap-[20px]"
      >
        <BackArrow />
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/${profileUsername}`)}
        >
          <NavText textBig={profileName!} textSmall={`@${profileUsername}`} />
        </div>
      </section>
      <section className="w-full">
        {connections ? <SwitchConnections username={profileUsername!} /> : null}
      </section>
    </nav>
  );
};
