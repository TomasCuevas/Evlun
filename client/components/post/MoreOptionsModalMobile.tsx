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

export const MoreOptionsModalMobile: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { postModal, onSetPost } = useContext(UIContext);
  const { savedPostsList, onSetSavedPost, onRemoveSavedPost, onRemovePost } =
    useContext(DataContext);

  return (
    <section className="sticky bottom-0 z-30 min-h-screen w-full xs:hidden">
      <div className="h-full w-full overflow-hidden">
        <div
          onClick={() => onSetPost(undefined)}
          className="fixed top-0 left-0 h-screen w-screen cursor-default bg-white/5 backdrop-blur-sm"
        ></div>
        <div className="absolute bottom-0 left-0 flex w-full flex-col items-center overflow-hidden rounded-tl-[30px] rounded-tr-[30px] bg-black">
          <ul className="flex w-full flex-col">
            {postModal?.added_by._id === user?._id ? (
              <MoreOption
                icon={RiDeleteBin6Line}
                text="Eliminar"
                color="#FF2222"
                onClick={() => {
                  onRemovePost(postModal!._id);
                  onSetPost(undefined);
                }}
              />
            ) : (
              <MoreOption
                icon={RiFlag2Line}
                text="Denunciar post"
                onClick={() => {}}
              />
            )}
            {savedPostsList.includes(postModal!._id) ? (
              <MoreOption
                icon={RiBookmark2Line}
                text="Quitar de guardados"
                onClick={() => onRemoveSavedPost(postModal!._id)}
              />
            ) : (
              <MoreOption
                icon={RiBookmark3Line}
                text="Guardar post"
                onClick={() => onSetSavedPost(postModal!._id)}
              />
            )}
          </ul>
          <button
            onClick={() => onSetPost(undefined)}
            className="m-[10px] grid w-[90%] cursor-pointer place-items-center rounded-full border border-white p-3 text-white duration-100 hover:bg-white hover:text-bluedark"
          >
            <span className="font-bold">Cancelar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
