import { useEffect } from "react";
import { NextPage } from "next";

//* layout *//
import { MainLayout } from "@/layouts";

//* components *//
import { FeedExplore } from "@/components/explore";

//* context *//
import { useRightSidebarStore } from "@/store";

const ExplorePage: NextPage = () => {
  const { onChangeSidebarItems } = useRightSidebarStore();

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
      withoutAuth
    >
      <FeedExplore />
    </MainLayout>
  );
};

export default ExplorePage;
