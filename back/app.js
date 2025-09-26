import express from 'express';
import 'dotenv/config';
import cors from "cors";
import sequelize from "./database/connection.js";

import mainRouter from "./router/main.router.js";
import authRouter from './router/auth.router.js';
import { authenticateToken } from "./middleware/auth/authenticateToken.js";

// Import des routes manquantes
import canauxRoutes from './routes/canaux.js';
import usersRoutes from './routes/users.js';
import messagesRoutes from "./routes/messages.js";
import adminRoutes from "./routes/admin.js";
import keyRoutes from "./routes/keys.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Gestion des erreurs non capturées
process.on("uncaughtException", (err) => {
  console.error("❌ Erreur non gérée:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Promesse rejetée sans catch:", reason);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000",
  "http://10.60.12.114",
  "https://10.60.12.114",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Middleware de logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Route de base pour tester
app.get("/", (req, res) => {
    res.json({ message: "🚀 Serveur ALPHA backend actif", status: "OK", timestamp: new Date() });
});

// Routes
app.use('/auth', authRouter);
app.use('/api', mainRouter);

// Routes manquantes ajoutées
app.use('/canaux', canauxRoutes);
app.use('/users', usersRoutes);
app.use("/messages", messagesRoutes);
app.use("/admin", adminRoutes);
app.use("/keys", keyRoutes);

// Vérification du token côté serveur
app.post("/auth/verify-token", authenticateToken, (req, res) => {
    res.json({ id: req.user.id, username: req.user.username, role: req.user.role });
});

// Initialisation de la base de données et démarrage du serveur
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Base de données connectée");

        await sequelize.sync();
        console.log("✅ Synchronisation des tables OK");

        app.listen(PORT, '0.0.0.0', () => {
            const serverHost = process.env.SERVER_HOST || '10.60.12.114';
            console.log(`🚀 Serveur HTTP lancé sur http://0.0.0.0:${PORT}`);
            console.log(`🌐 Accessible via http://${serverHost}:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Echec de connexion DB:", error);
    }
})();
