import { useState } from 'react';

//* hooks *//
import { useForm, useCommentsStore, usePostsStore } from '../../hooks';

export const CommentFormSection = () => {
  const { startCreateNewComment, isCreating } = useCommentsStore();
  const { openPost } = usePostsStore();
  const { comment, onInputChange } = useForm({
    comment: '',
  });
  const [height, setHeight] = useState(40);

  const onInput = (input) => {
    if (comment.length < 20) return setHeight(40);
    const heightInput = input.target.scrollHeight;
    setHeight(heightInput);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (comment.length < 1 || comment.length > 155) return;

    await startCreateNewComment(comment, openPost._id);
    onInputChange({ target: { value: '', name: 'comment' } });
    setHeight(40);
  };

  return (
    <section className="w-full">
      <form className="flex flex-col">
        <textarea
          className="w-full resize-none overflow-hidden border-b border-transparent bg-transparent py-[10px] px-0 text-lg text-text outline-none placeholder:text-text/50 disabled:text-text/70"
          disabled={isCreating}
          maxLength={155}
          name="comment"
          onChange={onInputChange}
          onInput={onInput}
          placeholder="Publica tu respuesta"
          style={{ height }}
          value={comment}
        />
        <div className="my-[10px] mx-0 flex w-full items-center justify-end">
          <button
            type="submit"
            disabled={isCreating}
            className="cursor-pointer rounded-2xl bg-decorateorange py-[10px] px-[20px] text-sm font-medium text-darktext disabled:bg-decorateorange/50"
            onClick={onSubmit}
          >
            Postear
          </button>
        </div>
      </form>
    </section>
  );
};
