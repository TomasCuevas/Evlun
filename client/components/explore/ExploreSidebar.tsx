import { Explore, FeedExploreModal } from "./";

interface Props {
  explore?: boolean;
}

export const ExploreSidebar: React.FC<Props> = ({ explore = true }) => {
  return (
    <aside
      className={
        explore
          ? "top-0 hidden h-screen max-w-[350px] flex-col px-4 py-2 xl:sticky xl:flex"
          : "top-0 hidden h-screen max-w-[350px] flex-col px-4 py-2 opacity-0 xl:sticky xl:flex"
      }
    >
      <Explore />
      <div className="relative w-full">
        <FeedExploreModal />
      </div>
    </aside>
  );
};
