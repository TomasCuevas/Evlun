import { useContext, useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

//* icons *//
import {
  RiMoreFill,
  RiChat4Line,
  RiHeartLine,
  RiHeartFill,
  RiBookmarkLine,
  RiBookmarkFill,
} from "react-icons/ri";

//* components *//
import { MoreOptionsModalDesktop } from "./";

//* services *//
import { likePostService } from "../../services";

//* context *//
import { AuthContext, DataContext, UIContext } from "../../context";

//* interfaces *//
import { IPost } from "../../interfaces/post";

interface Props {
  post: IPost;
  postRef?: boolean;
}

export const FullPost: React.FC<Props> = ({ post, postRef }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { onSetPost, postModal } = useContext(UIContext);
  const { savedPostsList, onSetSavedPost, onRemoveSavedPost } =
    useContext(DataContext);

  const [likesValue, setLikesValue] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [date, setDate] = useState<{ time: string; date: string }>({
    time: "",
    date: "",
  });

  const queryClient = useQueryClient();

  //! like post
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
      time: new Date(post.date).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h24",
      }),
      date: new Date(post.date).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
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
          <Link href={`/profile/${post.added_by.username}`}>
            <div className="flex h-full gap-[10px]">
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
          </Link>

          <div
            onClick={(event) => {
              event.stopPropagation();
              onSetPost(post);
            }}
            className="flex h-full items-start justify-center"
          >
            <div>
              <RiMoreFill className="cursor-pointer text-xl text-white hover:text-orange" />
              {postModal?._id === post._id &&
              isAuthenticated === "authenticated" ? (
                <div className="relative -top-4 z-30">
                  <MoreOptionsModalDesktop />
                </div>
              ) : null}
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
            <RiChat4Line className="text-2xl" />
          </div>
          <button>
            {savedPostsList.includes(post._id) ? (
              <RiBookmarkFill
                onClick={() => onRemoveSavedPost(post._id)}
                className="text-2xl text-orange hover:text-orange/50"
              />
            ) : (
              <RiBookmarkLine
                onClick={() => onSetSavedPost(post._id)}
                className="text-2xl"
              />
            )}
          </button>
          <button>
            {isLiked ? (
              <RiHeartFill
                onClick={onLike}
                className="text-2xl text-orange hover:text-orange/50"
              />
            ) : (
              <RiHeartLine
                onClick={onLike}
                className="text-2xl hover:text-orange"
              />
            )}
          </button>
        </footer>
      </article>
    </>
  );
};
