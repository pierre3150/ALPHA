// routes/users.js
import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET /users?username=xxx
router.get("/", async (req, res) => {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: "username requis" });

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
        res.json([user]); // en tableau pour compatibilité avec ton script
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;
