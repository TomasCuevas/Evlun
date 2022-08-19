//* icons *//
import { FaRegFlag, FaRegTrashAlt } from 'react-icons/fa';
import { BsBookmarkPlus, BsBookmarkDash } from 'react-icons/bs';

//* hooks *//
import { useAuthStore, usePostsStore } from '../../hooks';

//* components *//
import { CancelMore, MoreOption } from '../Post';

export const MoreFromOpenPost = () => {
  const {
    disableMore,
    openPost,
    savedPostsList,
    startDeleteOpenPost,
    startRemoveSavePost,
    startReportPost,
    startSavePost,
  } = usePostsStore();
  const { _id } = useAuthStore();

  return (
    <section className="sticky bottom-0 z-20 min-h-screen w-full">
      <div className="h-full w-full overflow-hidden">
        <div
          onClick={disableMore}
          className="absolute h-full w-full cursor-pointer bg-lightbackground/20"
        ></div>
        <div className="absolute bottom-0 left-0 z-30 flex w-full flex-col items-center overflow-hidden rounded-tl-[30px] rounded-tr-[30px] bg-darkbackground">
          <ul className="flex w-full flex-col">
            {openPost.added_by._id === _id && (
              <MoreOption
                icon={FaRegTrashAlt}
                text="Eliminar"
                dispatch={() => startDeleteOpenPost(openPost._id)}
                handleMore={disableMore}
                color="#FF2222"
              />
            )}
            {openPost.added_by._id !== _id && (
              <MoreOption
                icon={FaRegFlag}
                text="Denunciar post"
                dispatch={startReportPost}
                handleMore={disableMore}
              />
            )}
            {savedPostsList.includes(openPost._id) ? (
              <MoreOption
                icon={BsBookmarkDash}
                text="Quitar de guardados"
                dispatch={() => startRemoveSavePost(openPost._id)}
                handleMore={disableMore}
              />
            ) : (
              <MoreOption
                icon={BsBookmarkPlus}
                text="Guardar post"
                dispatch={() => startSavePost(openPost._id)}
                handleMore={disableMore}
              />
            )}
          </ul>
          <CancelMore handleMore={disableMore} />
        </div>
      </div>
    </section>
  );
};
