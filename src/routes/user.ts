import { Router } from "express";

const userRouter = Router();

userRouter.get("/login", loginController);

export default userRouter;
