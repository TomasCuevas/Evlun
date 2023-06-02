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
    onCloseModal,
  } = usePostsStore();

  const IsModalOpenByOwner = postModal?.added_by._id === user?._id;
  const IsPostSaved = savedPostsList.includes(postModal?._id || "");

  const router = useRouter();

  if (!postModal || !user) return <></>;

  return (
    <section className="sticky bottom-0 z-30 min-h-screen w-full xs:hidden">
      <div className="h-full w-full overflow-hidden">
        <div
          onClick={() => onCloseModal()}
          className="fixed top-0 left-0 h-screen w-screen cursor-default bg-white/5 backdrop-blur-sm"
        />

        <div
          className="absolute bottom-0 left-0 flex w-full flex-col items-center overflow-hidden rounded-tl-[30px] rounded-tr-[30px]"
          style={{ backgroundColor: "#05101b" }}
        >
          <ul
            className="flex w-full flex-col"
            onClick={(event) => {
              onCloseModal();
              event.stopPropagation();
            }}
          >
            {IsModalOpenByOwner ? (
              <MoreOption
                icon={RiDeleteBin6Line}
                text="Eliminar"
                color="#FF2222"
                onClick={() => {
                  onRemovePost(postModal._id);
                  if (router.asPath === `/post/${postModal._id}`) router.back();
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

          <button
            onClick={() => onCloseModal()}
            className="m-[10px] grid w-[90%] cursor-pointer place-items-center rounded-full border border-white p-3 text-white hover:bg-white hover:text-background"
          >
            <span className="font-bold">Cancelar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
