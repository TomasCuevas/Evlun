import { useContext } from "react";

//* components *//
import { SearchedUser } from "./";

//* context *//
import { DataContext } from "../../context";

export const FeedExplore = () => {
  const { usersSearch } = useContext(DataContext);

  return (
    <section className="flex flex-col">
      {usersSearch.map((user) => (
        <SearchedUser key={user._id} {...user} />
      ))}
    </section>
  );
};
