import { useQuery } from "@tanstack/react-query";

//* service *//
import { getUniquePostService } from "@/services";

//* interface *//
import { IPost } from "@/interfaces";

export const usePost = (postId: string) => {
  const postQuery = useQuery<{ post: IPost; postRef?: IPost }>(
    [`/post/${postId}`],
    () => getUniquePostService(postId)
  );

  return {
    post: postQuery.data?.post,
    postRef: postQuery.data?.postRef,
    postQuery,
  };
};
