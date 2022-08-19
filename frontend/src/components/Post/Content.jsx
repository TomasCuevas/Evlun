import { useContext } from 'react';

//* context *//
import { PostContext } from '../../context';

export const Content = () => {
  const { content } = useContext(PostContext);

  return (
    <section className="w-full">
      <span className="block text-sm font-medium leading-5 text-text/80">
        {content}
      </span>
    </section>
  );
};
