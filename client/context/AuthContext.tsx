import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

//* services *//
import { loginService, registerService, checkService } from "../services";

//* interfaces *//
import { IAuthenticated } from "../interfaces/authenticated";
import { ILogin } from "../interfaces/login";
import { IRegister } from "../interfaces/register";
import { IUser } from "../interfaces/user";

//* CONTEXT *//
//* CONTEXT *//
interface AuthContextProps {
  isAuthenticated: IAuthenticated;
  user: IUser | undefined;

  onChecking(): void;
  onLogin(
    loginData: ILogin
  ): Promise<{ ok: boolean; msg?: string; status?: number }>;
  onLogout(): void;
  onRegister(registerData: IRegister): Promise<{ ok: boolean; msg?: string }>;
}

export const AuthContext = createContext({} as AuthContextProps);

//* PROVIDER *//
//* PROVIDER *//

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const [isAuthenticated, setIsAuthenticated] =
    useState<IAuthenticated>("checking");

  useEffect(() => {
    onChecking();
  }, []);

  //! check auth
  const onChecking = async () => {
    setIsAuthenticated("checking");
    setUser(undefined);

    const result = await checkService();
    if (!result.ok) {
      setIsAuthenticated("no-authenticated");
      setUser(undefined);
      return;
    }

    Cookies.set("evluntoken", result.token);
    setIsAuthenticated("authenticated");
    setUser(result.user);
  };

  //! register user
  const onRegister = async (registerData: IRegister) => {
    setIsAuthenticated("checking");

    const result = await registerService(registerData);
    if (!result.ok) {
      setIsAuthenticated("no-authenticated");
      return {
        ok: false,
        msg: result.msg,
      };
    }

    Cookies.set("evluntoken", result.token);
    setIsAuthenticated("authenticated");
    setUser(result.user);

    return {
      ok: true,
    };
  };

  //! login user
  const onLogin = async (loginData: ILogin) => {
    setIsAuthenticated("checking");

    const result = await loginService(loginData);
    if (!result.ok) {
      setIsAuthenticated("no-authenticated");
      return {
        ok: false,
        msg: result.msg,
        status: result.status || 400,
      };
    }

    Cookies.set("evluntoken", result.token);
    setIsAuthenticated("authenticated");
    setUser(result.user);

    return {
      ok: true,
    };
  };

  //! logout user
  const onLogout = () => {
    setIsAuthenticated("no-authenticated");
    setUser(undefined);
    Cookies.remove("evluntoken");
  };

  return (
    <AuthContext.Provider
      value={{
        //* properties
        isAuthenticated,
        user,

        //* methods
        onChecking,
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
