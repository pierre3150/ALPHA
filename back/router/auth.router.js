import { Router } from "express";
import "dotenv/config";
import authController from "../controller/auth.controller.js";
import { authenticateToken } from "../middleware/auth/authenticateToken.js";

const authRouter = Router();

authRouter.get("/main", authenticateToken);

authRouter.post("/login", authController.login);

export default authRouter;