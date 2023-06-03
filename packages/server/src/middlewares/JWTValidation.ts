import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const JWTValidation = (
  req: Request & { _id?: Types.ObjectId; username?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const { evluntoken: token } = req.headers as { evluntoken: string };
    if (!token) {
      return res.status(400).json({
        msg: "No hay token en la petición.",
      });
    }

    //? verificar token
    const payload = jwt.verify(token, process.env.PRIVATE_SECRET_KEY_JWT!);

    req._id = (payload as { _id: Types.ObjectId })._id;
    req.username = (payload as { username: string }).username;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      msg: "El token ingresado no es valido.",
    });
  }
};
