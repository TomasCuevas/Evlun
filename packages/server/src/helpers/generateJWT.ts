import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const generateJWT = (_id: Types.ObjectId, username: string) => {
  return new Promise((resolve, reject) => {
    const payload = { _id, username };

    jwt.sign(
      payload,
      process.env.PRIVATE_SECRET_KEY_JWT!,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          reject(new Error("Error al generar el token."));
        }

        resolve(token);
      }
    );
  });
};
