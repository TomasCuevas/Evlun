//* components *//
import { Main } from '../../components/Main/Main';

//* layouts *//
import { FeedSearch, Nav, NavSwitch, NavTopExplore } from '../../layouts';

//* context *//
import { NavSwitchProvider, SearchProvider } from '../../context';

export const ExplorePage = () => {
  return (
    <NavSwitchProvider>
      <Main>
        <NavSwitch />
        <SearchProvider>
          <NavTopExplore />
          <FeedSearch />
        </SearchProvider>
        <Nav />
      </Main>
    </NavSwitchProvider>
  );
};
