import fileUpload from "express-fileupload";

//* helpers */
import { cloudinary } from "../helpers";

export const uploadBannerToCloudinary = async (
  banner: fileUpload.UploadedFile,
  oldBannerId: string
): Promise<{ newBanner: string; newBannerId: string }> => {
  let newBanner = "";
  let newBannerId = "";

  if (banner) {
    if (oldBannerId) await cloudinary.uploader.destroy(oldBannerId);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      banner.tempFilePath,
      {
        folder: "evlun/banners",
      }
    );

    newBanner = await secure_url;
    newBannerId = await public_id;
  }

  return { newBanner, newBannerId };
};
