import "dotenv/config";
import { Sequelize } from "sequelize";

// Debug des variables d'environnement
console.log("🔍 Configuration DB:", {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS ? '***' : 'non défini'
});

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ALPHA',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'ExtinctDinosaur1987@',
  {
    host: process.env.DB_HOST || 'localhost',
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