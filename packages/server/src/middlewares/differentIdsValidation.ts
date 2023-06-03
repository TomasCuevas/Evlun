import { Request, Response, NextFunction } from "express";

export const differentIdsValidation = async (
  req: Request & { _id?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const userToFollowId = req.body.userId;
    const userId = req._id;

    //? validar que los id no sean iguales
    if (userToFollowId === userId) {
      return res.status(400).json({
        msg: "Debes enviar un ID diferente al tuyo.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error en el servidor. Contacte con un administrador.",
    });
  }
};
