const { DataTypes } = require("sequelize");

const db = require("../config/db");

const options = {
    tableName: "locations",
    comment: "",
    indexes: [],
};

const attributes = {
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: true,
        field: "location_id",
        autoIncrement: true,
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "user_id",
        autoIncrement: false,
        references: {
            key: "user_id",
            model: "users_model",
        },
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "latitude",
        autoIncrement: false,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "longitude",
        autoIncrement: false,
    }
};

const locationsModel = db.define("locations_model", attributes, options);

module.exports = locationsModel;
