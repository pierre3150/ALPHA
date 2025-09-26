import express from "express";
import cors from "cors";
import "dotenv/config";
import sequelize from "./database/connection.js";
import authRoutes from "./routes/auth.js";
import { authenticateToken } from "./middleware/auth/authenticateToken.js";
import adminRoutes from "./routes/admin.js";
import keyRoutes from "./routes/keys.js";
import canauxRoutes from './routes/canaux.js';
import usersRoutes from './routes/users.js';
import messagesRoutes from "./routes/messages.js";


const app = express();
const PORT = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.error("❌ Erreur non gérée:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promesse rejetée sans catch:", reason);
});

// Middleware global
app.use(cors());
app.use(express.json());

// Routes d'authentification
app.use("/auth", authRoutes);

// Vérification du token côté serveur
app.post("/auth/verify-token", authenticateToken, (req, res) => {
    // Si le middleware passe, le token est valide
    res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
});

app.use("/admin", adminRoutes);

app.use("/keys", keyRoutes);

app.use('/canaux', canauxRoutes);
app.use('/users', usersRoutes);
app.use("/messages", messagesRoutes);

// Lancement de la connexion DB et du serveur
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Base de données connectée");

        await sequelize.sync(); // crée les tables si besoin
        console.log("✅ Synchronisation des tables OK");

        app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
    } catch (error) {
        console.error("❌ Echec de connexion DB:", error);
    }
})();
