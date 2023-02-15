import { useRouter } from "next/router";
import { useContext } from "react";

//* icons *//
import {
  RiDeleteBin6Line,
  RiBookmark3Line,
  RiBookmark2Line,
  RiFlag2Line,
} from "react-icons/ri";

//* components *//
import { MoreOption } from ".";

//* context *//
import { AuthContext, DataContext, UIContext } from "../../context";

export const MoreOptionsModalDesktop: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { postModal, onSetPost } = useContext(UIContext);
  const { savedPostsList, onSetSavedPost, onRemoveSavedPost, onRemovePost } =
    useContext(DataContext);

  const router = useRouter();

  return (
    <section className="absolute top-0 right-0 hidden xs:flex">
      <div
        onClick={(event) => {
          event.stopPropagation();
          onSetPost(undefined);
        }}
        className="fixed top-0 left-0 h-screen w-screen cursor-default"
      ></div>
      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl bg-black">
        <ul className="flex w-full flex-col">
          {postModal?.added_by._id === user?._id ? (
            <MoreOption
              icon={RiDeleteBin6Line}
              text="Eliminar"
              color="#FF2222"
              onClick={(event) => {
                event.stopPropagation();
                onRemovePost(postModal!._id);
                onSetPost(undefined);
                if (router.asPath === `/post/${postModal?._id}`) {
                  router.back();
                }
              }}
            />
          ) : (
            <MoreOption
              icon={RiFlag2Line}
              text="Denunciar post"
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          )}
          {savedPostsList.includes(postModal!._id) ? (
            <MoreOption
              icon={RiBookmark2Line}
              text="Quitar de guardados"
              onClick={(event) => {
                event.stopPropagation();
                onRemoveSavedPost(postModal!._id);
              }}
            />
          ) : (
            <MoreOption
              icon={RiBookmark3Line}
              text="Guardar post"
              onClick={(event) => {
                event.stopPropagation();
                onSetSavedPost(postModal!._id);
              }}
            />
          )}
        </ul>
      </div>
    </section>
  );
};
