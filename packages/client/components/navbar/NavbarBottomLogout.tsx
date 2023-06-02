import { useState, useEffect } from "react";
import Link from "next/link";

export const NavbarBottomLogout: React.FC = () => {
  const [mainLeft, setMainLeft] = useState(0);

  useEffect(() => {
    setMainLeft(document.querySelector("main")?.getBoundingClientRect().left!);

    const resizeEvent = () => {
      setMainLeft(
        document.querySelector("main")?.getBoundingClientRect().left!
      );
    };

    window.addEventListener("resize", resizeEvent);

    return () => removeEventListener("resize", resizeEvent);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full bg-orange px-4 py-2 shadow-[0_0_20px_0px] shadow-white/30 md:px-0">
      <div
        style={{
          marginLeft: mainLeft < 116 ? 0 : mainLeft - 50,
          transitionDuration: "0s",
        }}
        className="flex w-full items-center gap-8 lg:gap-14 xl:gap-[370px]"
      >
        <div className="hidden flex-col md:flex">
          <span className="text-2xl font-bold text-white">
            No te pierdas lo que pasa
          </span>
          <span className="text-white">
            Los usuarios de Evlun son los primeros en enterarse.
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-start">
          <Link href="/auth/login">
            <button className="w-full rounded-full border border-white/50 px-4 py-2 hover:bg-white/10 md:w-auto">
              <span className="font-bold text-white">Iniciar Sesión</span>
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="w-full rounded-full bg-white px-4 py-2 hover:bg-gray-300 md:w-auto">
              <span className="font-bold text-black">Regístrate</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
