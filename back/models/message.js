import sequelize from "../database/connection.js";
import { DataTypes, Model } from "sequelize";

export default class Message extends Model {}

Message.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_sender: {
        type: DataTypes.INTEGER(),
            references: {
            model: 'User',
            key: 'id'
            },
        allowNull: false
    },
    id_receiver: {
        type: DataTypes.INTEGER(),
            references: {
                model: 'User',
                key: 'idResistant'
            }
    }
    }, 
    {
    sequelize,
    tableName: "message",
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
    }
);