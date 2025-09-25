import sequelize from "../database/connection.js";
import Message from './message.js';
import User from './user.js';

Message.belongsTo(User, {
    as: 'Sender', 
    foreignKey: 'id_User'
});

Message.belongsTo(User, {
    as: 'Target', 
    foreignKey: 'id_Target'
});

User.hasMany(Message, {
    as: 'SentMessages',
    foreignKey: 'id_User'
});

User.hasMany(Message, {
    as: 'ReceivedMessages', 
    foreignKey: 'id_Target'
});

export {
    User,
    sequelize
}