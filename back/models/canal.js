// models/canal.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Canal = sequelize.define("Canal", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid1: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userid2: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "canaux", // nom de ta table en BDD
    timestamps: true,    // createdAt et updatedAt
});

export default Canal;
