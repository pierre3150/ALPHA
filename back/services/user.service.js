import User from "../models/user";
import argon2 from "argon2";


export const NewUser = async ({
    firstname,
    lastname,
    password,
    idResistant,
}) => {
    const existingUser = await User.findOne({where: {idResistant}});
    if (existingUser) {
        throw console.error('Id déjà utilisé');
    }

    const newUser = await User.create({
        firstname,
        lastname,
        idResistant,
        password: await argon2.hash(password)
    })

    return newUser;
};