// routes/keys.js
import express from "express";
import User from "../models/user.js";
import { authenticateToken } from "../middleware/auth/authenticateToken.js";

const router = express.Router();

// Enregistrer la clé publique
router.post("/public", authenticateToken, async (req, res) => {
  const { publicKey } = req.body;
  if (!publicKey) return res.status(400).json({ message: "Public key required" });

  await User.update({ public_key: publicKey }, { where: { id: req.user.id } });
  res.json({ message: "Public key saved" });
});

export default router;
