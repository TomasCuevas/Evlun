//* components *//
import {
  ExploreLocation,
  HomeLocation,
  PostLocation,
  ProfileLocation,
  SettingsLocation,
} from "@/components/navbar";

//* store *//
import { useNavbarTopStore } from "@/store";

export const NavbarTop: React.FC = () => {
  const { location } = useNavbarTopStore();

  return (
    <div className="sticky top-0 z-10 w-full border-b-2 border-orange/50 bg-background/5 backdrop-blur-3xl [&>nav]:px-[16px] [&>nav]:py-2">
      {location === "home" && <HomeLocation />}
      {location === "post" && <PostLocation />}
      {location === "profile" && <ProfileLocation />}
      {location === "explore" && <ExploreLocation />}
      {location === "settings" && <SettingsLocation />}
      {location === "bookmarks" && <SettingsLocation />}
    </div>
  );
};
