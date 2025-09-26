import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    canalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    encryptedMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    encryptedForSender: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: "messages",
    timestamps: true // createdAt + updatedAt
});

export default Message;
