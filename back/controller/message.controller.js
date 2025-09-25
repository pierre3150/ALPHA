import  Message  from '../models/message.js';
import  argon2  from 'argon2';

const MessageController ={

    createMessage: async (req, res) => {
        try {
            const message = req.body;
            const cryptedWords = await argon2.hash(message.message);
            const target = message.idResistant;
            const sender = message.idUser;
            Message.create(cryptedWords, target, sender)
            res.status(200).json({ message: 'Message crypté et enregistré'});
        } catch {
            new Error('Message non crypté')
        }
    },

    getMessage: async (req, res) => {
        try {
            const user = req.body.user;
            const message = await Message.findAll({ 
                where: {
                    id_Target: user
                }
            })
            const uncryptedMessage = await argon2.verify(message)

            return res.status(200).json(uncryptedMessage);
        } catch {
            new Error('Message non crypté')
        }
    },

    deleteMessages: async (req,res) => {
        try {
            const user = req.body
            await Message.destroy({
                where: {
                    id_User: user.id
                }
            })

            return res.status(200).json();
        } catch {
            new Error('Message non crypté')
        }
    }
};

export default MessageController