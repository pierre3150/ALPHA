import jwt from "jsonwebtoken";

// Fonction de génération d'un token d'authentification
export default function generateToken(user) {
  const tokenData = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  return jwt.sign(tokenData, process.env.JWT_SECRET || process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });
}