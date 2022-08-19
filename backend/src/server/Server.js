const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const origins = process.env.ORIGINS.split(' ');

//* db connection *//
const databaseConnect = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.paths = {
      auth: '/api/auth',
      comment: '/api/comment',
      post: '/api/post',
      user: '/api/user',
    };

    this.dbConnection();
    this.middleware();
    this.routes();
  }

  dbConnection() {
    databaseConnect();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
      }),
    );
    this.app.use(
      cors({
        origin: origins,
      }),
    );
  }

  routes() {
    this.app.use(this.paths.auth, require('../APIs/auth/auth-routes'));
    this.app.use(this.paths.comment, require('../APIs/comment/comment-routes'));
    this.app.use(this.paths.post, require('../APIs/post/post-routes'));
    this.app.use(this.paths.user, require('../APIs/user/user-routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server iniciado en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
