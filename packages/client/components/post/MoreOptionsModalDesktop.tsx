import { useRouter } from "next/router";

//* icons *//
import {
  RiDeleteBin6Line,
  RiBookmark3Line,
  RiBookmark2Line,
  RiFlag2Line,
} from "react-icons/ri";

//* components *//
import { MoreOption } from "@/components/post";

//* store *//
import { useAuthStore, usePostsStore } from "@/store";

export const MoreOptionsModalDesktop: React.FC = () => {
  const { user } = useAuthStore();
  const {
    savedPostsList,
    postModal,
    onUpdateSavedPost,
    onRemovePost,
    onCloseModal,
  } = usePostsStore();

  const IsModalOpenByOwner = postModal?.added_by._id === user?._id;
  const IsPostSaved = savedPostsList.includes(postModal?._id || "");

  const router = useRouter();

  if (!postModal || !user) return <></>;

  return (
    <section className="absolute top-0 right-0 hidden xs:flex">
      <div
        onClick={(event) => {
          event.stopPropagation();
          onCloseModal();
        }}
        className="fixed top-0 left-0 h-screen w-screen cursor-default"
        style={{ backgroundColor: "#5551" }}
      />

      <div
        className="relative flex w-full flex-col items-center overflow-hidden rounded-xl"
        style={{ backgroundColor: "#05101b" }}
      >
        <ul
          onClick={(event) => {
            onCloseModal();
            event.stopPropagation();
          }}
          className="flex w-full flex-col"
        >
          {IsModalOpenByOwner ? (
            <MoreOption
              icon={RiDeleteBin6Line}
              text="Eliminar"
              color="#FF2222"
              onClick={() => {
                onRemovePost(postModal._id);
                if (router.asPath === `/post/${postModal._id}`) {
                  router.back();
                }
              }}
            />
          ) : (
            <MoreOption icon={RiFlag2Line} text="Denunciar post" />
          )}

          <MoreOption
            icon={IsPostSaved ? RiBookmark2Line : RiBookmark3Line}
            text={IsPostSaved ? "Quitar de guardados" : "Guardar post"}
            onClick={() => onUpdateSavedPost(postModal._id)}
          />
        </ul>
      </div>
    </section>
  );
};
