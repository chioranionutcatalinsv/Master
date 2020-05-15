const { Sequelize } = require("sequelize");

//configs and creds
const serverConfig = {
  userDb: "postgres",
  passwordDb: "admin",
  nameDb: "disertatiev2",
  host: "localhost",
  dialect: "postgres",
};

//db connection
module.exports = new Sequelize(
  serverConfig.nameDb,
  serverConfig.userDb,
  serverConfig.passwordDb,
  {
    host: serverConfig.host,
    dialect: serverConfig.dialect,
    define: {
      timestamps: false,
    },
  }
);
