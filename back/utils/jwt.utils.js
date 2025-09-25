import jwt from "jsonwebtoken";

// Fonction de génération d'un token d'authentification
export default function generateToken(user) {
  const tokenData = {
    idUser: user.id,
    lastname: user.lastname,
  };

  return jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}