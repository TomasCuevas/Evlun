import cloudinary from "cloudinary";

const v2 = cloudinary.v2;

v2.config(process.env.CLOUDINARY_URL!);

export default v2;
