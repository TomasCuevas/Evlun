require('dotenv').config();
const Server = require('./src/server/Server');

const server = new Server();
server.listen();
