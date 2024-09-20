import { Router } from "express";
import { GetUser, UpdateUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get('/',GetUser);
userRouter.put('/',UpdateUser);

export {userRouter}