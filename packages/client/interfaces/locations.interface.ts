export interface INavbarData {
  buttonOnClick?: any;
  buttonText?: string;
  connections?: boolean;
  isButton?: boolean;
  profileName?: string;
  profileUsername?: string;
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
