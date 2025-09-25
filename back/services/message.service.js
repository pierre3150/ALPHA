import Service from "../models/service";

export const NewMessage = async ({
    text,
    idResistant,
}) => {

    const newMessage = await Message.create({
        text,
        idResistant,
    })

    return newUser;
};