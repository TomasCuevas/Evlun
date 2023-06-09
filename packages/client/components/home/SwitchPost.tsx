//* store *//
import { useNavbarTopStore } from "@/store";

export const SwitchPost: React.FC = () => {
  const {
    navbarData: { homeLocation },
    onSetNavbarData,
  } = useNavbarTopStore();

  const IS_IN_FOLLOWING = homeLocation === "following";

  return (
    <div className="flex w-full">
      <div
        onClick={() => onSetNavbarData({ homeLocation: "all" })}
        className="flex w-full cursor-pointer items-center justify-center hover:bg-white/5"
      >
        <span
          style={{
            borderBottom: !IS_IN_FOLLOWING ? "4px solid #e86d33" : "",
            fontWeight: !IS_IN_FOLLOWING ? "bolder" : "normal",
            color: !IS_IN_FOLLOWING ? "#fff" : "#6b7280",
          }}
          className="py-3"
        >
          Todos
        </span>
      </div>
      <div
        onClick={() => onSetNavbarData({ homeLocation: "following" })}
        className="flex w-full cursor-pointer justify-center hover:bg-white/5"
      >
        <span
          style={{
            borderBottom: IS_IN_FOLLOWING ? "4px solid #e86d33" : "",
            fontWeight: IS_IN_FOLLOWING ? "bolder" : "normal",
            color: IS_IN_FOLLOWING ? "#fff" : "#8b98a5",
          }}
          className="py-3"
        >
          Siguiendo
        </span>
      </div>
    </div>
  );
};
