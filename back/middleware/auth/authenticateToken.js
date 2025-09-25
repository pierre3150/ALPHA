import jwt from "jsonwebtoken";

// Middleware pour vérifier le token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1]; // Récupère le token après Bearer

    if (!token) {
        return res.status(401).json({ message: "Accès interdit, token manquant" });
    }

    console.log("Token reçu: ", token);

    // Vérifie le token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Erreur de vérification du token ", err, token);
            return res.status(403).json({ message: "Token invalide ou expiré", error: err });
        }

        req.user = user; 
        next(); // ✅ Appel du next seulement si le token est valide
    });
};
