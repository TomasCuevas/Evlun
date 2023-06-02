import { create } from "zustand";
import Cookies from "js-cookie";

//* service *//
import { checkService, loginService, registerService } from "@/services";

//* interfaces *//
import { IAuthenticated, ILogin, IRegister, IUser } from "@/interfaces";

interface useAuthState {
  isAuthenticated: IAuthenticated;
  user: IUser | undefined;

  setLogin(user: IUser, token: string): void;
  setLogout(): void;
  setChecking(): void;
  onCheckingWithoutLoader(): void;
  onChecking(): void;
  onLogin(data: ILogin): Promise<void>;
  onRegister(data: IRegister): Promise<void>;
}

export const useAuthStore = create<useAuthState>((set, get) => ({
  isAuthenticated: "checking",
  user: undefined,

  //! set login
  setLogin(user: IUser, token: string) {
    Cookies.set("evluntoken", token);
    set(() => ({ user, isAuthenticated: "authenticated" }));
  },

  //! logout
  setLogout() {
    Cookies.remove("evluntoken");
    set(() => ({ isAuthenticated: "no-authenticated", user: undefined }));
  },

  //! set checking
  setChecking() {
    set(() => ({ isAuthenticated: "checking", user: undefined }));
  },

  //! checking auth without loader
  async onCheckingWithoutLoader() {
    const { setLogin, setLogout } = get();

    try {
      const result = await checkService();
      setLogin(result.user, result.token);
    } catch (error) {
      setLogout();
      throw error;
    }
  },

  //! checking auth with loader
  async onChecking() {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    try {
      const result = await checkService();
      setLogin(result.user, result.token);
    } catch (error: any) {
      setLogout();
      throw error;
    }
  },

  //! login
  async onLogin(loginData) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    try {
      const result = await loginService(loginData);
      setLogin(result.user, result.token);
      return;
    } catch (error: any) {
      setLogout();
      throw error;
    }
  },

  //! register
  async onRegister(registerData) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    try {
      const result = await registerService(registerData);
      setLogin(result.user!, result.token!);
      return;
    } catch (error: any) {
      setLogout();
      throw error;
    }
  },
}));
