import { comparePassword } from "../libs/bcrypt";
import { Users } from "../models/User";
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
