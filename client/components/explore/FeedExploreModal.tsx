import { useContext } from "react";

//* components *//
import { SearchedUserFromModal } from "./";

//* context *//
import { DataContext, UIContext } from "../../context";

export const FeedExploreModal = () => {
  const { isExploreModalOpen } = useContext(UIContext);
  const { usersSearch } = useContext(DataContext);

  return (
    <div className="relative flex w-full justify-center lg:mt-1">
      <div
        className={
          isExploreModalOpen
            ? "absolute z-50 w-[95%] overflow-hidden rounded-xl border border-orange/50 bg-background backdrop-blur-sm xl:w-full xl:bg-background/80"
            : "hidden"
        }
      >
        <div className="flex flex-col gap-1">
          {usersSearch.map((user) => (
            <SearchedUserFromModal key={user._id} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};
