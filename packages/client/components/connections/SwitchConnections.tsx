import Link from "next/link";
import { useRouter } from "next/router";

//* interface *//
interface Props {
  username: string;
}

export const SwitchConnections: React.FC<Props> = ({ username }) => {
  const router = useRouter();

  const IS_IN_FOLLOWING = router.pathname.includes("following");
  const IS_IN_FOLLOWERS = router.pathname.includes("followers");

  return (
    <div className="flex w-full">
      <Link href={`/${username}/following`}>
        <div className="flex w-full cursor-pointer items-center justify-center hover:bg-white/5">
          <span
            style={{
              borderBottom: IS_IN_FOLLOWING ? "4px solid #e86d33" : "",
              fontWeight: IS_IN_FOLLOWING ? "bolder" : "normal",
              color: IS_IN_FOLLOWING ? "#fff" : "#6b7280",
            }}
            className="py-3"
          >
            Siguiendo
          </span>
        </div>
      </Link>
      <Link href={`/${username}/followers`}>
        <div className="flex w-full cursor-pointer justify-center hover:bg-white/5">
          <span
            style={{
              borderBottom: IS_IN_FOLLOWERS ? "4px solid #e86d33" : "",
              fontWeight: IS_IN_FOLLOWERS ? "bolder" : "normal",
              color: IS_IN_FOLLOWERS ? "#fff" : "#8b98a5",
            }}
            className="py-3"
          >
            Seguidores
          </span>
        </div>
      </Link>
    </div>
  );
};
