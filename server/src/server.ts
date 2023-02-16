import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import CookieParser from "cookie-parser";

//* conexion a la base de datos
import databaseConnect from "./database/config";

//* routes *//
import AuthRoutes from "./api/auth/auth.routes";
import PostRoutes from "./api/post/post.routes";
import SettingRoutes from "./api/setting/setting.routes";
import UserRoutes from "./api/user/user.routes";

//* origines permitidos por cors
const origins = process.env.ORIGINS?.split(" ");

//* server *//
class Server {
  private app = express();
  private port = process.env.PORT || 4000;
  private paths = {
    auth: "/api/auth",
    post: "/api/post",
    settings: "/api/settings",
    user: "/api/user",
  };

  constructor() {
    this.dbConnection();
    this.middleware();
    this.routes();
  }

  private dbConnection() {
    databaseConnect();
  }

  private middleware() {
    this.app.use(express.json());
    this.app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
    this.app.use(cors({ origin: origins, credentials: true }));
    this.app.options("*", cors({ origin: origins, credentials: true }));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", origins);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
      );
      next();
    });
    this.app.use(CookieParser());
  }

  private routes() {
    this.app.use(this.paths.auth, AuthRoutes);
    this.app.use(this.paths.post, PostRoutes);
    this.app.use(this.paths.settings, SettingRoutes);
    this.app.use(this.paths.user, UserRoutes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}

export default Server;
