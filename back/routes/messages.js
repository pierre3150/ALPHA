// routes/messages.js
import express from "express";
import Message from "../models/message.js";

const router = express.Router();

// GET /messages?canalId=1
router.get("/", async (req, res) => {
    const { canalId } = req.query;

    if (!canalId) {
        return res.status(400).json({ message: "canalId est requis." });
    }

    try {
        const messages = await Message.findAll({
            where: { canalId },
            order: [["createdAt", "ASC"]],
            attributes: ['id', 'canalId', 'senderId', 'content', 'encryptedMessage', 'encryptedForSender', 'createdAt', 'updatedAt']
        });

        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

// POST /messages
router.post("/", async (req, res) => {
    const { canalId, senderId, content, encryptedMessage, encryptedForSender } = req.body;

    if (!canalId || !senderId || (!content && !encryptedMessage)) {
        return res.status(400).json({ message: "canalId, senderId et (content ou encryptedMessage) sont requis." });
    }

    try {
        const messageData = { canalId, senderId };
        if (content) messageData.content = content;
        if (encryptedMessage) messageData.encryptedMessage = encryptedMessage;
        if (encryptedForSender) messageData.encryptedForSender = encryptedForSender;
        
        const message = await Message.create(messageData);
        res.json(message);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;
