//* icons *//
import { FaRegFlag, FaRegTrashAlt } from 'react-icons/fa';

//* hooks *//
import { useAuthStore, useCommentsStore } from '../../hooks';

//* components *//
import { CancelMore, MoreOption } from '../Post';

export const MoreFromComment = () => {
  const { startReportComment, startDeleteComment, disableMore, moreOptions } =
    useCommentsStore();
  const { _id: userId } = useAuthStore();
  const { addedBy, commentId } = moreOptions;

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
                dispatch={() => startDeleteComment(commentId)}
                handleMore={disableMore}
                color="#FF2222"
              />
            )}
            {addedBy._id !== userId && (
              <MoreOption
                icon={FaRegFlag}
                text="Denunciar comentario"
                dispatch={() => startReportComment(commentId)}
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
