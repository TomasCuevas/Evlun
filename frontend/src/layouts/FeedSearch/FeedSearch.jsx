import { useContext } from 'react';

//* components *//
import { Search } from '../../components/Search/Search';

//* context *//
import { SearchContext } from '../../context';

export const FeedSearch = () => {
  const { users, isLoading } = useContext(SearchContext);

  return (
    <section>
      <div className="flex flex-col">
        {isLoading === false &&
          users.map((user) => <Search key={user._id} {...user} />)}
      </div>
    </section>
  );
};
