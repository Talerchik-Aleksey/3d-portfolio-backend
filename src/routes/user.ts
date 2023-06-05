import { Router } from "express";
import { LoginController, RegistrationController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", LoginController);
userRouter.post("/registration", RegistrationController);

export default userRouter;
