import mongoose from "mongoose";

const databaseConnect = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI!);
    console.log("------> Base de datos conectada.");
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectarse a la base de datos.");
  }
};

export default databaseConnect;
