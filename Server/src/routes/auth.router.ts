import { Router } from "express";
import { Login, Signup } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup",Signup);
authRouter.post("/login",Login);

export {authRouter}