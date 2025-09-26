// models/user.js
import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js"; // ton fichier de connexion sequelize

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
    public_key: {
    type: DataTypes.TEXT("long"), // supporte de longues clés RSA/ECC
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false,
    defaultValue: "user",
  },
}, {
  tableName: "users",
  timestamps: true,
});

export default User;
