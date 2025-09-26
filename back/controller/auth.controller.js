import generateToken from "../utils/jwt.utils.js";
import bcrypt from 'bcryptjs';
import { User } from "../models/index.js";

const authController = {
    login: async (req, res) => {
    const { idResistant, password } = req.body;
    console.log("Login attempt for:", idResistant);
    try {
        const user = await User.findOne({ where: { username: idResistant } });
        if (!user)
        return res.status(401).json({ message: "Utilisateur non trouvé" });

        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword)
        return res.status(401).json({ message: "Mot de passe incorrect" });

        const token = generateToken(user);
        res.json({ 
            token, 
            username: user.username, 
            role: user.role, 
            id: user.id 
        });
    } catch (error) {
        console.error("Erreur lors de la connexion:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
},};

export default authController;