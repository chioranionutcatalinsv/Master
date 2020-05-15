const { DataTypes } = require("sequelize");

const db = require("../config/db");

const attributes = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: true,
    field: "user_id",
    autoIncrement: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "group_id",
    autoIncrement: false,
    references: {
      key: "group_id",
      model: "groups_model",
    },
  },
  mail: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "mail",
    autoIncrement: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "password",
    autoIncrement: false,
  },
};

const options = {
  tableName: "users",
  comment: "",
  indexes: [],
};

const usersModel = db.define("users_model", attributes, options);

module.exports = usersModel;
