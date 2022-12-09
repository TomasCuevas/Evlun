import postApi from "../axios/postApi";

export const newPostService = async (formData: FormData): Promise<boolean> => {
  try {
    await postApi.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
