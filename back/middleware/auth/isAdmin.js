export const isAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Utilisateur non connecté" });
    if (req.user.role !== "admin") return res.status(403).json({ message: "Accès réservé aux admins" });
    next();
};