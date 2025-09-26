import sequelize from "../database/connection.js";
import Message from './message.js';
import User from './user.js';

Message.belongsTo(User, {
    as: 'Sender', 
    foreignKey: 'senderId'
});

User.hasMany(Message, {
    as: 'SentMessages',
    foreignKey: 'senderId'
});

export {
    User,
    Message,
    sequelize
}