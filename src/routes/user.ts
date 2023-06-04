import { Router } from "express";
import { LoginController } from "../controllers/user";

const userRouter = Router();

userRouter.get("/login", LoginController);

export default userRouter;
