// scripts/create-admin.js
import "dotenv/config";
import bcrypt from "bcryptjs";
import sequelize from "../database/connection.js"; // ton fichier de connexion sequelize
import User from "../models/user.js";

async function run() {
  try {
    // connexion à la base
    await sequelize.authenticate();
    await sequelize.sync(); // en dev : crée la table si elle n'existe pas

    // valeurs par défaut ou passées en arguments
    const username = process.argv[2] || "admin";
    const password = process.argv[3] || "ChangeMe123!";
    const publicKey = process.argv[4] || null; // facultatif
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);

    // vérifier si déjà existant
    const exists = await User.findOne({ where: { username } });
    if (exists) {
      console.log(`⚠️ L'utilisateur "${username}" existe déjà.`);
      process.exit(1);
    }

    // hasher le mot de passe
    const hash = await bcrypt.hash(password, saltRounds);

    // création de l'utilisateur admin
    const admin = await User.create({
      username,
      passwordHash: hash,
      role: "admin",
      publicKey,
    });

    console.log(`✅ Admin créé :`);
    console.log(`   ID: ${admin.id}`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   (Mot de passe utilisé: ${password})`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de la création de l'admin :", err);
    process.exit(1);
  }
}

run();
