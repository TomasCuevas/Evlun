const mongoose = require('mongoose');

const databaseConnect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Base de datos conectada.');
  } catch (error) {
    console.log(error);
    throw new Error('Error al conectarse a la base de datos.');
  }
};

module.exports = databaseConnect;
