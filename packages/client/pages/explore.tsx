import { useEffect } from "react";
import { NextPage } from "next";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedExplore } from "@/components/explore";

//* context *//
import { useNavbarTopStore, useRightSidebarStore } from "@/store";

const ExplorePage: NextPage = () => {
  const { onChangeSidebarItems } = useRightSidebarStore();
  const { onSetLocation } = useNavbarTopStore();

  useEffect(() => {
    onChangeSidebarItems({
      explorer: false,
      profile: true,
      relevant: false,
    });
    onSetLocation("explore");
  }, []);

  return (
    <MainLayout
      title="Explorar | Evlun"
      description="Pagina para explorar usuarios en Evlun"
      withoutAuth
    >
      <FeedExplore />
    </MainLayout>
  );
};

export default ExplorePage;
