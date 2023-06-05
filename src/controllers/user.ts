import { Request, Response } from "express";
import { loginUser, registrationUser } from "../services/user";
import { errorResponse } from "../utils/errorResponse";
import { successResponse } from "../utils/successRespons";

export async function LoginController(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    successResponse(req, res, { user });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

export async function RegistrationController(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await registrationUser(email, password);
    successResponse(req, res, { user });
  } catch (error) {
    errorResponse(req, res, error);
  }
}
