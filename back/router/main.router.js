import { Router } from "express"
import messageRouter from '../router/message.router.js'

const mainRouter = Router()

mainRouter.use(messageRouter);

export default mainRouter;