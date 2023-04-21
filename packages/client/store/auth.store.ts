import { create } from "zustand";
import Cookies from "js-cookie";

//* service *//
import { checkService, loginService, registerService } from "../services";

//* interfaces *//
import { IAuthenticated, ILogin, IRegister, IUser } from "../interfaces";

interface useAuthState {
  isAuthenticated: IAuthenticated;
  user: IUser | undefined;

  setLogin(user: IUser, token: string): void;
  setLogout(): void;
  setChecking(): void;
  onCheckingWithoutLoader(): void;
  onChecking(): void;
  onLogin(
    loginData: ILogin
  ): Promise<{ ok: boolean; msg?: string; status?: number }>;
  onRegister(registerData: IRegister): Promise<{ ok: boolean; msg?: string }>;
}

export const useAuthStore = create<useAuthState>((set, get) => ({
  isAuthenticated: "checking",
  user: undefined,
  setLogin(user: IUser, token: string) {
    Cookies.set("evluntoken", token);
    set(() => ({ user, isAuthenticated: "authenticated" }));
  },
  setLogout() {
    Cookies.remove("evluntoken");
    set(() => ({ isAuthenticated: "no-authenticated", user: undefined }));
  },
  setChecking() {
    set(() => ({ isAuthenticated: "checking", user: undefined }));
  },
  async onCheckingWithoutLoader() {
    const { setLogin, setLogout } = get();

    const result = await checkService();
    if (result.ok) {
      setLogin(result.user!, result.token!);
      return;
    }

    setLogout();
  },
  async onChecking() {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    const result = await checkService();
    if (result.ok) {
      setLogin(result.user!, result.token!);
      return;
    }

    setLogout();
  },
  async onLogin(loginData: ILogin) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    const result = await loginService(loginData);
    if (result.ok) {
      setLogin(result.user!, result.token!);
      return {
        ok: true,
      };
    }

    setLogout();
    return {
      ok: false,
      msg: result.msg,
      status: result.status,
    };
  },
  async onRegister(registerData: IRegister) {
    const { setChecking, setLogin, setLogout } = get();
    setChecking();

    const result = await registerService(registerData);
    if (result.ok) {
      setLogin(result.user!, result.token!);
      return {
        ok: true,
      };
    }

    setLogout();
    return {
      ok: false,
      msg: result.msg,
    };
  },
}));
