import { useContext } from "react";

//* icons *//
import { FaRegFlag, FaRegTrashAlt } from "react-icons/fa";
import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";

//* components *//
import { MoreOption } from "./";

//* context *//
import { UIContext } from "../../context/UIContext";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";

export const MoreOptionsModal: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { postModal, onSetPost } = useContext(UIContext);
  const { savedPostsList, onSetSavedPost, onRemoveSavedPost, onRemovePost } =
    useContext(DataContext);

  return (
    <section className="sticky bottom-0 z-20 min-h-screen w-full">
      <div className="h-full w-full overflow-hidden">
        <div
          onClick={() => onSetPost(undefined)}
          className="absolute h-full w-full cursor-pointer backdrop-blur-sm"
        ></div>
        <div className="absolute bottom-0 left-0 z-30 flex w-full flex-col items-center overflow-hidden rounded-tl-[30px] rounded-tr-[30px] border-t border-orange bg-bluedark">
          <ul className="flex w-full flex-col">
            {postModal?.added_by._id === user?._id ? (
              <MoreOption
                icon={FaRegTrashAlt}
                text="Eliminar"
                color="#FF2222"
                onClick={() => {
                  onRemovePost(postModal!._id);
                  onSetPost(undefined);
                }}
              />
            ) : (
              <MoreOption
                icon={FaRegFlag}
                text="Denunciar post"
                onClick={() => {}}
              />
            )}
            {savedPostsList.includes(postModal!._id) ? (
              <MoreOption
                icon={BsBookmarkDash}
                text="Quitar de guardados"
                onClick={() => onRemoveSavedPost(postModal!._id)}
              />
            ) : (
              <MoreOption
                icon={BsBookmarkPlus}
                text="Guardar post"
                onClick={() => onSetSavedPost(postModal!._id)}
              />
            )}
          </ul>
          <button
            onClick={() => onSetPost(undefined)}
            className="m-[10px] grid w-[90%] cursor-pointer place-items-center rounded-full border border-white p-[10px] text-white transition-all duration-300 hover:bg-white hover:text-bluedark"
          >
            <span className="font-bold">Cancelar</span>
          </button>
        </div>
      </div>
    </section>
  );
};
