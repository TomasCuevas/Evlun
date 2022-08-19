import dayjs from 'dayjs';

//* hooks *//
import { usePostsStore } from '../../hooks/usePostsStore';

export const OpenPostDate = () => {
  const { openPost } = usePostsStore();

  dayjs.locale('es');
  const time = dayjs(openPost.date).format('H:mm a');
  const date = dayjs(openPost.date).format('D MMM. YYYY');

  return (
    <section className="pd-[5%] flex w-full gap-[10px] border-b border-decorateorange py-[15px] pl-[5%]">
      <div>
        <span className="text-[15px] text-text/70">{time}</span>
      </div>
      <div className="flex items-center text-text">
        <span>·</span>
      </div>
      <div>
        <span className="text-[15px] text-text/70">{date}</span>
      </div>
    </section>
  );
};
