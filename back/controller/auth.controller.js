import generateToken from "../utils/jwt.utils.js";
import  argon2  from 'argon2';
import { User } from "../models/index.js";

const authController = {
    login: async (req, res) => {
    const { idResistant, password } = req.body;
    try {
        const user = await User.findOne({ where: { idResistant } });
        if (!user)
        return res.status(401).json({ message: "Utilisateur non trouvé" });

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword)
        return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
},};

export default authController;