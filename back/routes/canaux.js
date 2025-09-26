// routes/canaux.js
import express from 'express';
import Canal from '../models/canal.js';
import User from '../models/user.js';
import Message from '../models/message.js';
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

// DELETE /canaux/:id - Supprimer un canal et tous ses messages
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // Pour vérifier que l'utilisateur a le droit de supprimer

    console.log(`[DELETE] /canaux/${id} - userId: ${userId}`);

    if (!userId) return res.status(400).json({ message: "userId requis pour supprimer le canal" });

    try {
        // D'abord, vérifier que l'utilisateur fait partie du canal
        const canal = await Canal.findOne({
            where: {
                id: id,
                [Op.or]: [
                    { userid1: userId },
                    { userid2: userId }
                ]
            }
        });

        if (!canal) {
            console.log(`Canal ${id} introuvable pour l'utilisateur ${userId}`);
            return res.status(404).json({ message: "Canal introuvable ou accès non autorisé" });
        }

        // Compter les messages à supprimer
        const messageCount = await Message.count({ where: { canalId: id } });
        console.log(`Suppression de ${messageCount} messages du canal ${id}`);

        // Supprimer tous les messages du canal
        await Message.destroy({
            where: { canalId: id }
        });

        // Supprimer le canal
        await Canal.destroy({
            where: { id: id }
        });

        console.log(`Canal ${id} et ${messageCount} messages supprimés avec succès`);
        res.json({ 
            message: "Canal et historique supprimés avec succès",
            canalId: id,
            messagesDeleted: messageCount
        });

    } catch (err) {
        console.error("Erreur lors de la suppression du canal:", err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression." });
    }
});

export default router;