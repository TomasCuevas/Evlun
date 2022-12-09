import postApi from "../axios/postApi";

interface Props {
  pageParam?: number;
  url: string;
}

export const getPostsService = async ({ pageParam = 0, url }: Props) => {
  try {
    const params = new URLSearchParams();
    params.append("page", pageParam.toString());

    const { data } = await postApi.get(url, { params });

    return data.posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los posts");
  }
};
