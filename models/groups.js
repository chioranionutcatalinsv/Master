const { DataTypes } = require("sequelize");

const db = require("../config/db");

const attributes = {
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: null,
    comment: null,
    primaryKey: true,
    field: "group_id",
    autoIncrement: true,
  },
  group_name: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    comment: null,
    primaryKey: false,
    field: "group_name",
    autoIncrement: false,
  },
};
const options = {
  tableName: "groups",
  comment: "",
  indexes: [],
};

const groupsModel = db.define("groups_model", attributes, options);

module.exports = groupsModel;
