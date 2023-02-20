import { useEffect, useContext } from "react";
import { NextPage } from "next";

//* layout *//
import { MainLayout } from "../components/layouts";

//* components *//
import { FeedExplore } from "../components/explore";

//* context *//
import { RightSidebarContext } from "../context";

const ExplorePage: NextPage = () => {
  const { onChangeSidebarItems } = useContext(RightSidebarContext);

  useEffect(() => {
    onChangeSidebarItems({
      explorer: false,
      profile: true,
      relevant: false,
    });
  }, []);

  return (
    <MainLayout
      title="Explorar | Evlun"
      description="Pagina para explorar usuarios en Evlun"
      location="explore"
    >
      <FeedExplore />
    </MainLayout>
  );
};

export default ExplorePage;
