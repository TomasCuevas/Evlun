//* components *//
import { SearchedUser } from "@/components/explore";

//* stores *//
import { useSearchesStore } from "@/store";

export const FeedExplore: React.FC = () => {
  const { usersSearched } = useSearchesStore();

  return (
    <section className="flex flex-col">
      {usersSearched.map((user) => (
        <SearchedUser key={user._id} {...user} />
      ))}
    </section>
  );
};
