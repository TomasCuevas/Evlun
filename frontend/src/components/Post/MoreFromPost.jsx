//* icons *//
import { FaRegFlag, FaRegTrashAlt } from 'react-icons/fa';
import { BsBookmarkPlus, BsBookmarkDash } from 'react-icons/bs';

//* hooks *//
import { useAuthStore, usePostsStore } from '../../hooks';

//* components *//
import { CancelMore, MoreOption } from '.';

export const MoreFromPost = () => {
  const {
    disableMore,
    moreOptions,
    savedPostsList,
    startDeletePost,
    startRemoveSavePost,
    startReportPost,
    startSavePost,
  } = usePostsStore();
  const { addedBy, postId } = moreOptions;
  const { _id: userId } = useAuthStore();

  return (
    <section className="sticky bottom-0 z-20 min-h-screen w-full">
      <div className="h-full w-full overflow-hidden">
        <div
          onClick={disableMore}
          className="absolute h-full w-full cursor-pointer bg-lightbackground/20"
        ></div>
        <div className="absolute bottom-0 left-0 z-30 flex w-full flex-col items-center overflow-hidden rounded-tl-[30px] rounded-tr-[30px] bg-darkbackground">
          <ul className="flex w-full flex-col">
            {addedBy._id === userId && (
              <MoreOption
                icon={FaRegTrashAlt}
                text="Eliminar"
                dispatch={() => startDeletePost(postId)}
                handleMore={disableMore}
                color="#FF2222"
              />
            )}
            {addedBy._id !== userId && (
              <MoreOption
                icon={FaRegFlag}
                text="Denunciar post"
                dispatch={() => startReportPost(postId)}
                handleMore={disableMore}
              />
            )}
            {savedPostsList.includes(postId) ? (
              <MoreOption
                icon={BsBookmarkDash}
                text="Quitar de guardados"
                dispatch={() => startRemoveSavePost(postId)}
                handleMore={disableMore}
              />
            ) : (
              <MoreOption
                icon={BsBookmarkPlus}
                text="Guardar post"
                dispatch={() => startSavePost(postId)}
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
