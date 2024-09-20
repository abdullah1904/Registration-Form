import { Router } from "express";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";
import { requireAuth } from "../middleware/requireAuth";

const appRouter = Router();

appRouter.use("/auth",authRouter);
appRouter.use("/user",requireAuth,userRouter);

export {appRouter}