import { comparePassword, hashPassword } from "../libs/bcrypt";
import { Users } from "../models/Users";
import { HttpError } from "../utils/HttpError";

export async function loginUser(email: string, password: string) {
  const user = await getUser(email);
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Incorrect password");
  }

  return user;
}

export async function getUser(email: string) {
  return await Users.findOne({ where: { login: email } });
}

export async function registrationUser(email: string, password: string) {
  const passwordHash = await hashPassword(password);
  return await Users.create({ login: email, password: passwordHash });
}
