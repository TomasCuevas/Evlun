import { useRouter } from "next/router";

//* components *//
import {
  ExploreLocation,
  HomeLocation,
  PostLocation,
  ProfileLocation,
  SettingsLocation,
} from "@/components/navbar";

export const NavbarTop: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <div className="sticky top-0 z-10 w-full border-b-2 border-orange/50 bg-background/5 backdrop-blur-3xl [&>nav]:px-[16px] [&>nav]:py-2">
      {pathname === "/" && <HomeLocation />}

      {pathname === "/post/[id]" && <PostLocation />}

      {pathname === "/[username]" && <ProfileLocation />}

      {pathname === "/[username]/following" && (
        <ProfileLocation connections={true} />
      )}

      {pathname === "/[username]/followers" && (
        <ProfileLocation connections={true} />
      )}

      {pathname === "/explore" && <ExploreLocation />}

      {pathname.includes("/settings") && <SettingsLocation />}

      {pathname === "/bookmarks" && <SettingsLocation />}
    </div>
  );
};
