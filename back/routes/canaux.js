// routes/canaux.js
import express from 'express';
import Canal from '../models/canal.js';
import User from '../models/user.js';
import { Op } from 'sequelize';

const router = express.Router();

// POST /canaux/create
router.post('/create', async (req, res) => {
    const { userId1, userId2 } = req.body;

    if (!userId1 || !userId2) return res.status(400).json({ message: 'Tous les utilisateurs doivent être précisés.' });

    try {
        // Vérifie si le canal existe déjà
        const existing = await Canal.findOne({ 
            where: {
                userid1: userId1,
                userid2: userId2
            }
        });

        if (existing) return res.status(400).json({ message: 'Le canal existe déjà.' });

        const canal = await Canal.create({ userid1: userId1, userid2: userId2 });
        res.json(canal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
});

// GET /canaux?userId=...
router.get('/', async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId requis" });

    try {
        const canaux = await Canal.findAll({
            where: {
                [Op.or]: [
                    { userid1: userId },
                    { userid2: userId }
                ]
            }
        });
        res.json(canaux);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur." });
    }
});



export default router;