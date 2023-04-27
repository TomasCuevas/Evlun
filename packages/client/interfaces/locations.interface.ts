export interface INavbarData {
  buttonOnClick?: any;
  buttonText?: string;
  isButton?: boolean;
  profileName?: string;
  settingText?: string;
}

export type ILocation =
  | "bookmarks"
  | "explore"
  | "home"
  | "no-auth"
  | "none"
  | "post"
  | "profile"
  | "settings";
