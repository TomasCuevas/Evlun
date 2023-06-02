//* components *//
import { SearchedUserFromModal } from "@/components/explore";

//* stores *//
import { useSearchesStore, useUiStore } from "@/store";

export const FeedExploreModal: React.FC = () => {
  const { isExploreModalOpen } = useUiStore();
  const { usersSearched } = useSearchesStore();

  if (usersSearched.length < 1) return <></>;

  return (
    <div className="relative flex w-full justify-center lg:mt-1">
      <div
        style={{ display: isExploreModalOpen ? "block" : "none" }}
        className="absolute z-50 w-[95%] overflow-hidden rounded-xl border border-orange/50 bg-background backdrop-blur-sm xl:w-full xl:bg-background/95"
      >
        <div className="flex flex-col gap-1">
          {usersSearched.map((user) => (
            <SearchedUserFromModal key={user._id} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
};
