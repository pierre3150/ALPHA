import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// POST /auth/login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ message: "Utilisateur non trouvé" });

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

        // Génération du token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({ token, username: user.username, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

router.post("/save-public-key", async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token manquant" });

    try {
        // Vérification du token JWT
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = payload;

        const { public_key } = req.body;
        if (!public_key) return res.status(400).json({ message: "Clé publique manquante" });

        // Récupération de l'utilisateur
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // Ajout du champ public_key si pas déjà présent dans ton modèle User
        user.public_key = public_key;
        await user.save();

        res.json({ message: "Clé publique enregistrée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(403).json({ message: "Token invalide" });
    }
});

export default router;
