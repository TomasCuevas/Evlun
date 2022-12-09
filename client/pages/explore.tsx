import { NextPage } from "next";

//* layout *//
import { MainLayout } from "../components/layouts";

//* components *//
import { FeedExplore } from "../components/explore";

const ExplorePage: NextPage = () => {
  return (
    <MainLayout
      title="Explorar | Evlun"
      description="Pagina para explorar usuarios en Evlun"
      location="explore"
      explore={false}
    >
      <FeedExplore />
    </MainLayout>
  );
};

export default ExplorePage;
