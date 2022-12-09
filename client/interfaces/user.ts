export interface IUser {
  _id: string;
  avatar: string;
  banner?: string;
  biography?: string;
  country?: string;
  date?: number;
  email: string;
  followers: string[];
  followings: string[];
  gender?: "Masculino" | "Femenino";
  location?: string;
  name: string;
  phone?: number;
  savedPosts?: string[];
  username: string;
}
