import { useContext, useState, useEffect, MouseEvent } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

//* icons *//
import {
  MdMoreHoriz,
  MdOutlineChatBubbleOutline,
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
} from "react-icons/md";

//* services *//
import { likePostService } from "../../services";

//* context *//
import { AuthContext, UIContext } from "../../context";

//* interfaces *//
import { IPost } from "../../interfaces/post";

interface Props {
  post: IPost;
  postRef?: boolean;
}

export const FullPost: React.FC<Props> = ({ post, postRef }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { onSetPost } = useContext(UIContext);

  const [likesValue, setLikesValue] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [date, setDate] = useState<{ time: string; date: string }>({
    time: "",
    date: "",
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  dayjs.locale("es");

  const onLike = async (event: MouseEvent) => {
    event.stopPropagation();
    if (isAuthenticated !== "authenticated") return;

    if (post.likes.includes(user!._id)) {
      if (isLiked) setLikesValue((prev) => prev - 1);
      if (!isLiked) setLikesValue(post.likes.length);
    } else {
      if (isLiked) setLikesValue((prev) => prev - 1);
      if (!isLiked) setLikesValue(post.likes.length + 1);
    }

    isLiked ? setIsLiked(false) : setIsLiked(true);

    const result = await likePostService(post._id);
    if (result.ok) {
      return queryClient.refetchQueries(["/all"]);
    }
  };

  useEffect(() => {
    setLikesValue(post.likes.length);
    setIsLiked(post.likes.includes(user?._id.valueOf() || false));
    setDate({
      time: dayjs(post.date).format("H:mm a"),
      date: dayjs(post.date).format("D MMM. YYYY"),
    });
  }, []);

  return (
    <>
      {postRef ? (
        <div className="flex w-full px-4">
          <span className="ml-[22px] h-3 w-[2px] bg-orange"></span>
        </div>
      ) : null}
      <article
        className={postRef ? "flex flex-col" : "mt-[20px] flex flex-col"}
      >
        <header className="flex h-[50px] w-full justify-between px-4">
          <div
            onClick={() => router.push(`/profile/${post.added_by.username}`)}
            className="flex h-full gap-[10px]"
          >
            <div>
              <img
                src={post.added_by?.avatar}
                alt={post.added_by?.username}
                className="h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="cursor-pointer text-ellipsis text-base font-semibold  text-white">
                {post.added_by?.name}
              </span>
              <span className="cursor-pointer text-ellipsis text-base font-light text-orange">
                @{post.added_by?.username}
              </span>
            </div>
          </div>

          <div
            onClick={(event) => {
              event.stopPropagation();
              onSetPost(post);
            }}
            className="flex h-full items-start justify-center"
          >
            <div>
              <MdMoreHoriz className="cursor-pointer text-xl text-white hover:text-orange" />
            </div>
          </div>
        </header>

        <div className="mt-[20px] px-4">
          <div
            id="post"
            className="w-full break-words"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>
        </div>

        <time className="flex w-full gap-[10px] border-b border-orange py-[15px] px-4">
          <div>
            <span className="text-[15px] text-white/80">{date.time}</span>
          </div>
          <div className="flex items-center text-white">
            <span>·</span>
          </div>
          <div>
            <span className="text-[15px] text-white/80">{date.date}</span>
          </div>
        </time>

        {likesValue > 0 ? (
          <section className="w-full border-b border-orange py-[15px] px-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                {likesValue}
              </span>
              <span className="text-sm font-light text-orange">Likes</span>
            </div>
          </section>
        ) : null}

        <footer className="flex w-full items-center justify-around gap-[100px] border-b border-orange py-[10px] px-4 text-orange/50">
          <div>
            <MdOutlineChatBubbleOutline className="text-2xl" />
          </div>
          <div>
            {isLiked ? (
              <MdOutlineFavorite
                onClick={onLike}
                className="relative bottom-[2px] cursor-pointer text-2xl text-orange hover:text-orange/50"
              />
            ) : (
              <MdOutlineFavoriteBorder
                onClick={onLike}
                className="relative bottom-[2px] cursor-pointer text-2xl hover:text-orange"
              />
            )}
          </div>
        </footer>
      </article>
    </>
  );
};
