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

//* stores *//
import { useAuthStore, usePostsStore } from "@/store";

export const MoreOptionsModalMobile: React.FC = () => {
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
    <section className="sticky bottom-0 z-30 min-h-screen w-full xs:hidden">
      <div className="h-full w-full overflow-hidden">
        <div
          onClick={() => onRemovePostModal()}
          className="fixed top-0 left-0 h-screen w-screen cursor-default bg-white/5 backdrop-blur-sm"
        ></div>
        <div
          className="absolute bottom-0 left-0 flex w-full flex-col items-center overflow-hidden rounded-tl-[30px] rounded-tr-[30px]"
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
          <button
            onClick={() => onRemovePostModal()}
            className="m-[10px] grid w-[90%] cursor-pointer place-items-center rounded-full border border-white p-3 text-white duration-100 hover:bg-white hover:text-background"
          >
            <span className="font-bold">Cancelar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
