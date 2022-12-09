import { useContext } from "react";

//* components *//
import { SearchedUserFromModal } from "./";

//* context *//
import { DataContext } from "../../context/DataContext";
import { UIContext } from "../../context/UIContext";

export const FeedExploreModal = () => {
  const { isExploreModalOpen } = useContext(UIContext);
  const { usersSearch } = useContext(DataContext);

  return (
    <section
      className={
        isExploreModalOpen
          ? "absolute z-50 mx-4 w-[90%] rounded-b-xl border-r-8 border-b-4 border-l border-orange bg-bluedark shadow-lg shadow-orange/30"
          : "hidden"
      }
    >
      <div className="flex flex-col gap-1">
        {usersSearch.map((user) => (
          <SearchedUserFromModal key={user._id} {...user} />
        ))}
      </div>
    </section>
  );
};
