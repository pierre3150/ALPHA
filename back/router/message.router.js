import { Router } from "express";
import MessageController from "../controller/message.controller.js";
import { authenticateToken } from "../middleware/auth/authenticateToken.js";

const messageRouter = Router();


messageRouter.get(
    "/api/message",
    authenticateToken,
    MessageController.getMessage
);

messageRouter.post(
    "/api/message",
    // authenticateToken,
    MessageController.createMessage
);

messageRouter.delete(
    '/api/message',
    // authenticateToken,
    MessageController.deleteMessages
);

export default messageRouter;