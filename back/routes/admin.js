import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { authenticateToken } from "../middleware/auth/authenticateToken.js";
import { isAdmin } from "../middleware/auth/isAdmin.js";

const router = express.Router();

// POST /admin/create-user
router.post("/create-user", authenticateToken, isAdmin, async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) return res.status(400).json({ message: "Tous les champs sont requis" });

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) return res.status(409).json({ message: "Nom d'utilisateur déjà utilisé" });

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, passwordHash, role });

        res.status(201).json({ message: "Utilisateur créé avec succès", user: { id: newUser.id, username: newUser.username, role: newUser.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;