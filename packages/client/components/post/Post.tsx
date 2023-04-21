import { useState, useContext, MouseEvent, useEffect } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

//* icons *//
import {
  RiMoreFill,
  RiChat4Line,
  RiHeartLine,
  RiHeartFill,
} from "react-icons/ri";

//* components *//
import { MoreOptionsModalDesktop } from "./MoreOptionsModalDesktop";

//* helpers *//
import { getRelativeTime } from "../../helpers";

//* services *//
import { likePostService } from "../../services";

//* context *//
import { AuthContext, UIContext } from "../../context";

//* interfaces *//
import { IPost } from "../../interfaces/post";

interface Props {
  post: IPost;
  fromAnswer?: boolean;
}

export const Post: React.FC<Props> = ({ post, fromAnswer }) => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { onSetPost, postModal } = useContext(UIContext);

  const [likesValue, setLikesValue] = useState<number>(post.likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");

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
      if (fromAnswer) {
        return queryClient.refetchQueries([`/answers/${post.postRef!}`]);
      }

      return queryClient.refetchQueries(["/all"]);
    }
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(user?._id.valueOf() || false));
    setDate(getRelativeTime(post.date));
  }, []);

  return (
    <Link href={`/post/${post._id}`}>
      <article
        className={
          fromAnswer
            ? "max-w-screen grid w-full cursor-pointer grid-cols-[45px_calc(100%_-_55px)] gap-[10px]  py-3 px-4 pb-0 hover:bg-light"
            : "max-w-screen grid w-full cursor-pointer grid-cols-[45px_calc(100%_-_55px)] gap-[10px] border-b border-orange/50 py-[10px] px-4 hover:bg-light"
        }
      >
        <section className="relative flex w-full flex-col items-center">
          <Link href={`/profile/${post.added_by.username}`}>
            <img
              src={post.added_by.avatar}
              alt={post.added_by.name}
              className="absolute z-[1] h-[45px] w-[45px] cursor-pointer rounded-full object-cover"
            />
          </Link>

          {fromAnswer ? (
            <span className="absolute left-[22px] z-0 h-full w-[2px] bg-orange/50"></span>
          ) : null}
        </section>

        <section className="flex max-w-full flex-col">
          <header className="mb-[2px] flex h-[24px] max-w-full justify-between">
            <div className="flex h-full w-[90%] items-start justify-start gap-[5px]">
              <div className="max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap text-white">
                <Link href={`/profile/${post.added_by.username}`}>
                  <span className="w-full cursor-pointer text-ellipsis text-sm font-bold">
                    {post.added_by.name}
                  </span>
                </Link>
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-orange/70">
                <Link href={`/profile/${post.added_by.username}`}>
                  <span className="cursor-pointer text-ellipsis text-sm">{`@${post.added_by.username}`}</span>
                </Link>
              </div>
              <div className="flex h-full items-center text-white">
                <span>·</span>
              </div>
              <div className="min-w-[15%] overflow-hidden whitespace-nowrap">
                <span className="min-w-full text-ellipsis text-[13px] font-bold text-white">
                  {date}
                </span>
              </div>
            </div>

            <div className="flex h-full items-start justify-center">
              <div>
                <RiMoreFill
                  onClick={(event) => {
                    event.stopPropagation();
                    onSetPost(post);
                  }}
                  className="cursor-pointer text-xl text-white hover:text-orange"
                />
                {postModal?._id === post._id &&
                isAuthenticated === "authenticated" ? (
                  <div className="relative -top-4 z-30">
                    <MoreOptionsModalDesktop />
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <div
            id="post"
            className="w-full break-words"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></div>

          <footer className="mt-[10px] flex h-[22px] w-full items-center gap-[50px] text-orange">
            <div className="flex h-full items-center gap-[10px]">
              <RiChat4Line className="text-xl text-orange/50" />
              <span className="text-base font-light">
                {post.answers.length}
              </span>
            </div>

            <div className="flex h-full items-center gap-[10px]">
              {isLiked ? (
                <RiHeartFill
                  onClick={onLike}
                  className="relative z-0 cursor-pointer text-[21px] text-orange hover:text-orange/50"
                />
              ) : (
                <RiHeartLine
                  onClick={onLike}
                  className="relative z-0 cursor-pointer text-[21px] text-orange/50 hover:text-orange/100"
                />
              )}
              <span className="text-base font-light">{likesValue}</span>
            </div>
          </footer>
        </section>
      </article>
    </Link>
  );
};
