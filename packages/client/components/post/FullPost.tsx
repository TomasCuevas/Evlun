import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";

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
import { MoreOptionsModalDesktop } from "@/components/post";

//* query-client *//
import { queryClient } from "@/pages/_app";

//* store *//
import { useAuthStore, usePostsStore } from "@/store";

//* interfaces *//
import { IPost } from "@/interfaces";

interface Props {
  post: IPost;
  postRef?: boolean;
}

export const FullPost: React.FC<Props> = ({ post, postRef }) => {
  const { user, isAuthenticated } = useAuthStore();
  const {
    onLikeOrDislikePost,
    onOpenModal,
    onUpdateSavedPost,
    postModal,
    savedPostsList,
  } = usePostsStore();

  const [likesValue, setLikesValue] = useState<number>(0);
  const [IsLiked, setIsLiked] = useState<boolean>(false);
  const [date, setDate] = useState({ time: "", date: "" });

  const IsPostSaved = savedPostsList.includes(post._id);

  //! like post
  const onLike = async (event: MouseEvent) => {
    event.stopPropagation();
    if (isAuthenticated !== "authenticated") return;

    if (post.likes.includes(user!._id)) {
      IsLiked
        ? setLikesValue((prev) => prev - 1)
        : setLikesValue(post.likes.length);
    } else {
      IsLiked
        ? setLikesValue((prev) => prev - 1)
        : setLikesValue(post.likes.length + 1);
    }

    IsLiked ? setIsLiked(false) : setIsLiked(true);

    try {
      await onLikeOrDislikePost(post._id);

      queryClient.refetchQueries([`/post/${post._id}`]);
      queryClient.refetchQueries(["/all"]);
    } catch (error) {}
  };

  useEffect(() => {
    setLikesValue(post.likes.length);
    setIsLiked(post.likes.includes(user ? user._id : "") || false);
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
      <div
        style={{ display: postRef ? "flex" : "none" }}
        className="flex w-full px-4"
      >
        <span className="ml-[22px] h-3 w-[2px] bg-orange/50"></span>
      </div>

      <article
        className={
          postRef
            ? "flex flex-col overflow-hidden"
            : "mt-[20px] flex flex-col overflow-hidden"
        }
      >
        <header className="flex h-[50px] w-full max-w-full justify-between px-4">
          <Link href={`/${post.added_by.username}`}>
            <div className="flex h-full w-full gap-[10px]">
              <div>
                <img
                  src={post.added_by?.avatar}
                  alt={post.added_by?.username}
                  className="h-[45px] min-h-[45px] w-[45px] min-w-[45px] cursor-pointer rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="cursor-pointer overflow-hidden text-ellipsis text-base font-semibold  text-white">
                  {post.added_by?.name}
                </span>
                <span className="cursor-pointer overflow-hidden text-ellipsis text-base font-light text-orange">
                  @{post.added_by?.username}
                </span>
              </div>
              <div className="ml-auto">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpenModal(post);
                  }}
                >
                  <RiMoreFill className="cursor-pointer text-xl text-white hover:text-orange" />
                </button>
                {postModal?._id === post._id &&
                isAuthenticated === "authenticated" ? (
                  <div className="relative -top-6 z-30">
                    <MoreOptionsModalDesktop />
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        </header>

        <div className="mt-[20px] px-4">
          <div
            id="post"
            className="w-full break-words text-lg"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>
        </div>

        <time className="flex w-full gap-[10px] border-b border-orange/50 py-[15px] px-4">
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

        <section
          style={{ display: likesValue > 0 ? "block" : "none" }}
          className="w-full border-b border-orange/50 py-[15px] px-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white">{likesValue}</span>
            <span className="text-sm font-light text-orange">Likes</span>
          </div>
        </section>

        <footer className="flex w-full items-center justify-around gap-[100px] border-b border-orange/50 py-[10px] px-4 text-orange/50">
          <div>
            <RiChat4Line className="text-2xl" />
          </div>
          <button>
            {IsPostSaved ? (
              <RiBookmarkFill
                onClick={() => onUpdateSavedPost(post._id)}
                className="text-2xl text-orange hover:text-orange/50"
              />
            ) : (
              <RiBookmarkLine
                onClick={() => onUpdateSavedPost(post._id)}
                className="text-2xl text-orange/50 hover:text-orange"
              />
            )}
          </button>
          <button>
            {IsLiked ? (
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
