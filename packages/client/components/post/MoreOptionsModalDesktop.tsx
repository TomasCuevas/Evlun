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
    onSetPostModal,
    onRemovePostModal,
  } = usePostsStore();

  const router = useRouter();

  if (!postModal || !user) return <></>;

  return (
    <section className="absolute top-0 right-0 hidden xs:flex">
      <div
        onClick={(event) => {
          event.stopPropagation();
          onRemovePostModal();
        }}
        className="fixed top-0 left-0 h-screen w-screen cursor-default"
        style={{ backgroundColor: "#5551" }}
      ></div>
      <div
        className="relative flex w-full flex-col items-center overflow-hidden rounded-xl"
        style={{ backgroundColor: "#05101b" }}
      >
        <ul
          className="flex w-full flex-col"
          onClick={(event) => event.stopPropagation()}
        >
          {postModal.added_by._id === user._id ? (
            <MoreOption
              icon={RiDeleteBin6Line}
              text="Eliminar"
              color="#FF2222"
              onClick={() => {
                onRemovePost(postModal._id);
                onRemovePostModal();
                if (router.asPath === `/post/${postModal._id}`) {
                  router.back();
                }
              }}
            />
          ) : (
            <MoreOption
              icon={RiFlag2Line}
              text="Denunciar post"
              onClick={() => onRemovePostModal()}
            />
          )}
          {savedPostsList.includes(postModal._id) ? (
            <MoreOption
              icon={RiBookmark2Line}
              text="Quitar de guardados"
              onClick={() => {
                onUpdateSavedPost(postModal._id);
                onRemovePostModal();
              }}
            />
          ) : (
            <MoreOption
              icon={RiBookmark3Line}
              text="Guardar post"
              onClick={() => {
                onUpdateSavedPost(postModal._id);
                onRemovePostModal();
              }}
            />
          )}
        </ul>
      </div>
    </section>
  );
};
