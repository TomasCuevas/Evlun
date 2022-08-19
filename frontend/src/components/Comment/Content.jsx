import { useContext } from 'react';

//* context *//
import { CommentContext } from '../../context';

export const Content = () => {
  const { content } = useContext(CommentContext);

  return (
    <section className="min-w-full">
      <span className="block text-sm font-medium leading-5 text-text/80">
        {content}
      </span>
    </section>
  );
};
