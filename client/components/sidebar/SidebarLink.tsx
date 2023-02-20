import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons/lib";

//* context *//
import { AuthContext } from "../../context";

//* interface *//
interface Props {
  icon: IconType;
  iconFill: IconType;
  link: string;
  notAuthenticated?: boolean;
  text: string;
}

export const SidebarLink: React.FC<Props> = ({
  icon: Icon,
  iconFill: IconFill,
  link,
  notAuthenticated = false,
  text,
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  if (notAuthenticated === false && isAuthenticated !== "authenticated") {
    return <></>;
  }
  return (
    <div className="flex justify-center xl:justify-start">
      <Link href={link} passHref>
        <a className="flex items-center justify-center gap-4 rounded-full p-3 duration-100 hover:bg-orange/20 xl:pr-7">
          {router.asPath === link ? (
            <>
              <IconFill className="text-[26px] text-orange" />
              <span className="hidden text-xl font-semibold text-white xl:block">
                {text}
              </span>
            </>
          ) : (
            <>
              <Icon className="text-[26px] text-orange/70" />
              <span className="hidden text-xl font-semibold text-white/80 xl:block">
                {text}
              </span>
            </>
          )}
        </a>
      </Link>
    </div>
  );
};
