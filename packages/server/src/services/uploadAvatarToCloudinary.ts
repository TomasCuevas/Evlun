import fileUpload from "express-fileupload";

//* helpers */
import { cloudinary } from "../helpers";

export const uploadAvatarToCloudinary = async (
  avatar: fileUpload.UploadedFile,
  oldAvatarId: string
): Promise<{ newAvatar: string; newAvatarId: string }> => {
  let newAvatar = "";
  let newAvatarId = "";

  if (avatar) {
    if (oldAvatarId) await cloudinary.uploader.destroy(oldAvatarId);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      {
        folder: "evlun/avatars",
      }
    );

    newAvatar = await secure_url;
    newAvatarId = await public_id;
  }

  return { newAvatar, newAvatarId };
};
