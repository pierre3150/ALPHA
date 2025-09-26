import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de donnée réussie");
  } catch (error) {
    console.error("❌ Echec de connexion à la base de donnée :", error.message);
  }
})();

export default sequelize;